import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { baseURL } from '../confi/apiDomain';
import DynamicModalBox from '../components/base/Modal/DynamicModalBox';
import '../styles/mor.css';

const RekycDetail = () => {
    const { id: supplierId } = useParams();
    const [searchParams] = useSearchParams();
    const rekycId = searchParams.get('rekyc_id');
    
    
    // Get token from URL query parameters (like approval-list page)
    const token = searchParams.get('token');
    console.log('Token from URL:', token);
   

    const [comments, setComments] = useState('');
    const [loading, setLoading] = useState(true);
    const [rekycData, setRekycData] = useState(null);
    const [sapLogs, setSapLogs] = useState([]);
    const [showSapModal, setShowSapModal] = useState(false);
    const [showReturnFiling, setShowReturnFiling] = useState(false);
    const [gstr1Details, setGstr1Details] = useState([]);
    const [gstr3bDetails, setGstr3bDetails] = useState([]);
    const [refreshingFiling, setRefreshingFiling] = useState(false);
    const [dropdowns, setDropdowns] = useState(null);
    const [editModal, setEditModal] = useState({
        show: false,
        request: null,
        newValue: '',
        dropdownKey: null
    });
    const [approvals, setApprovals] = useState({
        approved: [],
        rejected: []
    });

    // Fetch REKYC data
    useEffect(() => {
        const fetchRekycData = async () => {
            if (!supplierId || !rekycId) {
                console.error('Supplier ID or REKYC ID is missing');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                // Construct API URL with token if available
                const config = {};
                if (token) {
                    config.params = { token };
                }
                const response = await axios.get(
                    `${baseURL}/supplier_field_approvals.json?supplier_id=${supplierId}&rekyc_id=${rekycId}`,
                    config
                );
                console.log('REKYC Data:', response.data);
                setRekycData(response.data);
            } catch (error) {
                console.error('Error fetching REKYC data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRekycData();
        fetchDropdowns();
    }, [supplierId, rekycId, token]);

    // Fetch SAP Logs
    const fetchSapLogs = async () => {
        try {
            // Add token to request if available
            const config = {};
            if (token) {
                config.params = { token };
            }
            const response = await axios.get(
                `${baseURL}/supplier_field_approvals/sap_logs_api.json?supplier_id=${supplierId}&rekyc_id=${rekycId}`,
                config
            );
            console.log('SAP Logs:', response.data);
            setSapLogs(response.data || []);
        } catch (error) {
            console.error('Error fetching SAP logs:', error);
            setSapLogs([]); // Ensure logs are empty to show "No SAP logs available"
        } finally {
            setShowSapModal(true); // Always show modal even if API fails
        }
    };

    // Fetch dropdowns for edit modal
    const fetchDropdowns = async () => {
        try {
            const response = await axios.get(
                'https://vendors.lockated.com/supplier_field_approvals/dropdowns.json');
            console.log('Dropdowns:', response.data);
            if (response.data && response.data.data) {
                setDropdowns(response.data.data);
            } else {
                setDropdowns(response.data);
            }
        } catch (error) {
            console.error('Error fetching dropdowns:', error);
        }
    };

    // Map field names to dropdown keys
    const getDropdownKey = (fieldName) => {
        if (!fieldName) return null;
        const name = fieldName.toLowerCase().trim();
        
        // Map field names to API dropdown keys from the provided JSON
        const fieldMapping = {
            'type of organization': 'type_of_organization',
            'nature of business': 'nature_business',
            'type of business': 'nature_business',
            'type business': 'type_business',
            'vendor type': 'supplier_type',
            'type of vendor': 'supplier_type',
            'supplier type': 'supplier_type',
            'country': 'country',
            'term of payment': 'term_of_payment',
            'reconciliation account': 'reconciliation_account',
            'schema group': 'schema_group',
            'purchasing organization': 'purchasing_organization',
            'gst classification': 'gst_classification',
            'msme': 'msme_hardcoded'
        };
        
        return fieldMapping[name] || null;
    };

    // Refresh Return Filing Details
    const handleRefreshFilingDetails = async () => {
        const gstin = rekycData?.gstin || rekycData?.supplier_gstin;
        if (!gstin) {
            alert('GSTIN not found in REKYC details.');
            return;
        }

        try {
            setRefreshingFiling(true);
            const url = `${baseURL}/pms/suppliers/fetch_and_save_return_filing_status?gstin=${gstin}`;
            const config = {};
            if (token) {
                config.params = { token };
            }
            
            console.log("Fetching return filing status for GSTIN:", gstin);
            const response = await axios.get(url, config);
            const data = response.data;

            if (data && data.data) {
                const filingList = data.data;
                
                // Map the new API fields to what the UI expects
                const processedList = filingList.map(item => ({
                    ...item,
                    ret_period: item.ret_prd,
                    rtntyp: item.rtntype,
                    valid: item.is_valid
                }));

                const g1 = processedList.filter(f => f.rtntyp === 'GSTR1' || f.rtntyp === 'GSTR-1');
                const g3b = processedList.filter(f => f.rtntyp === 'GSTR3B' || f.rtntyp === 'GSTR-3B');
                
                setGstr1Details(g1);
                setGstr3bDetails(g3b);
                alert(data.message || "Return filing data refreshed successfully!");
            } else {
                alert('No return filing records found or error retrieving details.');
            }
        } catch (error) {
            console.error('Error fetching return filing details:', error);
            const errorMessage = error.response?.data?.message || 'An error occurred while fetching return filing details.';
            alert(errorMessage);
        } finally {
            setRefreshingFiling(false);
        }
    };

    // Auto-refresh filing details when modal opens
    useEffect(() => {
        if (showReturnFiling && (gstr1Details.length === 0 || gstr3bDetails.length === 0)) {
            handleRefreshFilingDetails();
        }
    }, [showReturnFiling]);

    // Helper function to safely get nested values
    const getValue = (path, defaultValue = '-') => {
        if (!rekycData) return defaultValue;
        const keys = path.split('.');
        let value = rekycData;
        for (const key of keys) {
            value = value?.[key];
            if (value === undefined || value === null) return defaultValue;
        }
        return value || defaultValue;
    };

    const getBasicInfoValue = (fieldName, defaultValue = '-') => {
        if (!rekycData?.sections) return defaultValue;
        const basicInfoSection = rekycData.sections.find(s => s.title === 'Basic Information');
        if (!basicInfoSection) return defaultValue;
        const item = basicInfoSection.items.find(i => 
            i.field_name?.toLowerCase().trim() === fieldName.toLowerCase().trim()
        );
        if (item === undefined || item === null) return defaultValue;
        
        if (item.new_value === true) return 'true';
        if (item.new_value === false) return 'false';
        
        return item.new_value || defaultValue;
    };

    const handleApproveAll = async () => {
        const allIds = [];
        if (rekycData?.sections) {
            rekycData.sections.forEach(section => {
                section.items.forEach(item => {
                    if (item.id) allIds.push(item.id.toString());
                });
            });
        }
        
        // Update local state
        setApprovals({ approved: allIds, rejected: [] });

        try {
            const config = token ? { params: { token } } : {};
            const response = await axios.patch(
                `${baseURL}/supplier_field_approvals/approve_all.json?supplier_id=${supplierId}&rekyc_id=${rekycId}`,
                {},
                config
            );
            if (response.status === 200 || response.status === 204) {
                alert('All fields approved successfully');
            }
        } catch (error) {
            console.error('Error in approve all:', error);
            alert('Failed to approve all fields');
        }
    };

    const handleRejectAll = async () => {
        const allIds = [];
        if (rekycData?.sections) {
            rekycData.sections.forEach(section => {
                section.items.forEach(item => {
                    if (item.id) allIds.push(item.id.toString());
                });
            });
        }
        
        // Update local state
        setApprovals({ approved: [], rejected: allIds });

        try {
            const config = token ? { params: { token } } : {};
            const response = await axios.patch(
                `${baseURL}/supplier_field_approvals/reject_all.json?supplier_id=${supplierId}&rekyc_id=${rekycId}`,
                {},
                config
            );
            if (response.status === 200 || response.status === 204) {
                alert('All fields rejected successfully');
            }
        } catch (error) {
            console.error('Error in reject all:', error);
            alert('Failed to reject all fields');
        }
    };

    const handleApprovalChange = (id, type) => {
        const idString = id.toString();
        if (type === 'approve') {
            setApprovals(prev => ({
                approved: prev.approved.includes(idString) 
                    ? prev.approved.filter(i => i !== idString)
                    : [...prev.approved, idString],
                rejected: prev.rejected.filter(i => i !== idString)
            }));
        } else {
            setApprovals(prev => ({
                approved: prev.approved.filter(i => i !== idString),
                rejected: prev.rejected.includes(idString)
                    ? prev.rejected.filter(i => i !== idString)
                    : [...prev.rejected, idString]
            }));
        }
    };

    const handleEditClick = (request) => {
        const dropdownKey = getDropdownKey(request.field_name);
        let val = request.new_value || '';

        // If it's a dropdown field, try to find the ID that corresponds to the current string value
        if (dropdownKey && dropdowns?.[dropdownKey]) {
            const match = dropdowns[dropdownKey].find(opt => {
                const label = (opt.name || opt.code || opt.purchase_org_name || '').toString();
                return label === val.toString();
            });
            if (match) {
                val = match.id.toString();
            }
        }

        setEditModal({
            show: true,
            request: request,
            newValue: val,
            dropdownKey: dropdownKey
        });
    };

    const handleSaveEdit = async () => {
        if (!editModal.request) return;

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            
            if (token) {
                config.params = { token };
            }

            const payload = {
                new_value: editModal.newValue
            };

            // Using the new API endpoint with supplier_id and rekyc_id as query parameters
            const response = await axios.patch(
                `${baseURL}/supplier_field_approvals/${editModal.request.id}/update_new_value_api.json?supplier_id=${supplierId}&rekyc_id=${rekycId}`,
                payload,
                config
            );

            if (response.status === 200 || response.status === 204) {
                alert('Value updated successfully');
                setEditModal({ show: false, request: null, newValue: '', dropdownKey: null });
                // Refresh data
                window.location.reload();
            }
        } catch (error) {
            console.error('Error updating value:', error);
            alert('Failed to update value');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!comments.trim()) {
            alert('Please enter comments');
            return;
        }

        try {
            // Add token to request if available
            const config = {};
            if (token) {
                config.params = { token };
            }

            const payload = {
                approvals: {
                    approved_ids: approvals.approved,
                    rejected_ids: approvals.rejected
                },
                status_log: {
                    comments: comments
                }
            };

            const response = await axios.post(
                `${baseURL}/supplier_field_approvals/submit_api.json?supplier_id=${supplierId}&rekyc_id=${rekycId}`,
                payload,
                config
            );

            if (response.status === 200 || response.status === 204) {
                alert('Approvals submitted successfully');
                // Optionally reload the page to show updated data
                // window.location.reload();
            }
        } catch (error) {
            console.error('Error submitting approvals:', error);
            alert('Failed to submit approvals');
        }
    };

    if (loading) {
        return (
            <div className="website-content d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Loading REKYC Details...</p>
                </div>
            </div>
        );
    }

    if (!rekycData) {
        return (
            <div className="website-content d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                <div className="text-center">
                    <h5>No REKYC data found</h5>
                    <p>Please check the supplier ID and REKYC ID parameters.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="website-content">
            <style>{`
                .rekyc-section-header {
                    color: #ff9800 !important;
                    display: flex;
                    align-items: center;
                    width: 100%;
                    margin-top: 25px;
                    margin-bottom: 15px;
                }
                .rekyc-section-header h2 {
                    color: #ff9800 !important;
                    margin-bottom: 0;
                    white-space: nowrap;
                    font-weight: 600;
                    font-size: 1.25rem;
                }
                .rekyc-section-header .dash-line {
                    flex-grow: 1;
                    margin-left: 15px;
                    border-bottom: 1.5px dashed #444;
                    height: 1px;
                }
                .rekyc-row {
                    background-color: #e0f1f7 !important;
                    margin-bottom: 6px;
                    border-radius: 2px;
                    padding: 6px 15px;
                    display: flex;
                    align-items: center;
                    min-height: 40px;
                    font-size: 13px;
                }
                .rekyc-row label {
                    font-weight: 500;
                    margin-bottom: 0;
                    color: #222;
                }
                .row-label-text {
                    color: #333;
                }
                .edit-btn-blue {
                    border: 1px solid #007bff;
                    color: #007bff;
                    background: #fff;
                    padding: 4px 12px;
                    font-size: 12px;
                    font-weight: 500;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .edit-btn-blue:hover {
                    background: #007bff;
                    color: #fff;
                }
                .edit-icon-btn {
                    border: none;
                    background: transparent;
                    padding: 0;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .edit-icon-btn:hover {
                    opacity: 0.7;
                }
                .header-labels {
                    font-weight: 600;
                    color: #444;
                    margin-bottom: 10px;
                    padding: 0 15px;
                }
                .header-labels h5 {
                    font-size: 13px;
                    margin: 0;
                    font-weight: 700;
                }
                .status-pending {
                    color: #666;
                }
                .text-blue {
                    color: #333 !important;
                }
                .checkbox-item label {
                    font-size: 12px;
                    margin-left: 4px;
                }
                
                .checkbox-group {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                
                .checkbox-item {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }
                
                .card-header3 .card-title {
                    color: #fff !important;
                    margin: 0;
                    font-size: 14px;
                }
                .attachment-link {
                    display: flex;
                    align-items: center;
                    color: #222 !important;
                    text-decoration: none;
                }
                .attachment-link:hover {
                    text-decoration: underline;
                }
                .details_page label {
                    font-size: 13px;
                    color: #333;
                    font-weight: 500;
                }
                .details_page label.text {
                    color: #de7008 !important;
                }
            `}</style>
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="supplier_id" value={supplierId} />
                <input type="hidden" name="rekyc_id" value={rekycId} />

                <div className="d-flex justify-content-end mb-3 mx-4 mt-4">
                    <button type="button" onClick={handleApproveAll} className="purple-btn1 btn-sm">
                        Approve All
                    </button>
                    <button type="button" onClick={handleRejectAll} className="purple-btn1 btn-sm">
                        Reject All
                    </button>
                    <button type="button" onClick={fetchSapLogs} className="purple-btn1 rounded-3">
                        <span>SAP Logs</span>
                    </button>
                </div>

                {/* Basic Information Card */}
                <div className="card mx-4 mb-4">
                    <div className="card-header3">
                        <h3 className="card-title">Basic Information</h3>
                    </div>
                    <div className="details_page">
                        <div className="row px-3">
                            <div className="col-lg-6 col-md-6 col-sm-12 row px-3">
                                <div className="col-6">
                                    <label>Vendor Tracking Id</label>
                                </div>
                                <div className="col-6">
                                    <label className="text">
                                        <span className="me-3"><span className="text-dark">:</span></span>
                                        {getBasicInfoValue('Vendor Tracking Id')}
                                    </label>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 row px-3">
                                <div className="col-6">
                                    <label>Vendor SAP Code</label>
                                </div>
                                <div className="col-6">
                                    <label className="text">
                                        <span className="me-3"><span className="text-dark">:</span></span>
                                        {getBasicInfoValue('Vendor SAP Code')}
                                    </label>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 row px-3">
                                <div className="col-6">
                                    <label>Vendor Organization Name</label>
                                </div>
                                <div className="col-6">
                                    <label className="text">
                                        <span className="me-3"><span className="text-dark">:</span></span>
                                        {getBasicInfoValue('Vendor Organization Name')}
                                    </label>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 row px-3">
                                <div className="col-6">
                                    <label>Vendor Department</label>
                                </div>
                                <div className="col-6">
                                    <label className="text">
                                        <span className="me-3"><span className="text-dark">:</span></span>
                                        {getBasicInfoValue('Vendor Department')}
                                    </label>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 row px-3">
                                <div className="col-6">
                                    <label>Type of Organization</label>
                                </div>
                                <div className="col-6">
                                    <label className="text">
                                        <span className="me-3"><span className="text-dark">:</span></span>
                                        {getBasicInfoValue('Type of Organization')}
                                    </label>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 row px-3">
                                <div className="col-6">
                                    <label>LLP No.</label>
                                </div>
                                <div className="col-6">
                                    <label className="text">
                                        <span className="me-3"><span className="text-dark">:</span></span>
                                        {getBasicInfoValue('LLP No.')}
                                    </label>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 row px-3">
                                <div className="col-6">
                                    <label>Nature of Business</label>
                                </div>
                                <div className="col-6">
                                    <label className="text">
                                        <span className="me-3"><span className="text-dark">:</span></span>
                                        {getBasicInfoValue('Nature of Business')}
                                    </label>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 row px-3">
                                <div className="col-6">
                                    <label>Vendor Type</label>
                                </div>
                                <div className="col-6">
                                    <label className="text">
                                        <span className="me-3"><span className="text-dark">:</span></span>
                                        {getBasicInfoValue('Vendor Type')}
                                    </label>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 row px-3">
                                <div className="col-6">
                                    <label>Type of Industry</label>
                                </div>
                                <div className="col-6">
                                    <label className="text">
                                        <span className="me-3"><span className="text-dark">:</span></span>
                                        {getBasicInfoValue('Type of Industry')}
                                    </label>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 row px-3">
                                <div className="col-6">
                                    <label>Full Name</label>
                                </div>
                                <div className="col-6">
                                    <label className="text">
                                        <span className="me-3"><span className="text-dark">:</span></span>
                                        {getBasicInfoValue('Full Name')}
                                    </label>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 row px-3">
                                <div className="col-6">
                                    <label>Email</label>
                                </div>
                                <div className="col-6">
                                    <label className="text">
                                        <span className="me-3"><span className="text-dark">:</span></span>
                                        {getBasicInfoValue('Email')}
                                    </label>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 row px-3">
                                <div className="col-6">
                                    <label>Mobile</label>
                                </div>
                                <div className="col-6">
                                    <label className="text">
                                        <span className="me-3"><span className="text-dark">:</span></span>
                                        {getBasicInfoValue('Mobile')}
                                    </label>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 row px-3">
                                <div className="col-6">
                                    <label>Key Market</label>
                                </div>
                                <div className="col-6">
                                    <label className="text">
                                        <span className="me-3"><span className="text-dark">:</span></span>
                                        {getBasicInfoValue('Key Market')}
                                    </label>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 row px-3">
                                <div className="col-6">
                                    <label>PAN Number</label>
                                </div>
                                <div className="col-6">
                                    <label className="text">
                                        <span className="me-3"><span className="text-dark">:</span></span>
                                        {getBasicInfoValue('PAN Number')}
                                    </label>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 row px-3">
                                <div className="col-6">
                                    <label>GSTIN No</label>
                                </div>
                                <div className="col-6">
                                    <label className="text">
                                        <span className="me-3"><span className="text-dark">:</span></span>
                                        {getBasicInfoValue('GSTIN No')}
                                    </label>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 row px-3">
                                <div className="col-6">
                                    <label>GSTIN Applicable</label>
                                </div>
                                <div className="col-6">
                                    <label className="text">
                                        <span className="me-3"><span className="text-dark">:</span></span>
                                        {getBasicInfoValue('GSTIN Applicable')}
                                    </label>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 row px-3">
                                <div className="col-6">
                                    <label>Date Of Incorporation</label>
                                </div>
                                <div className="col-6">
                                    <label className="text">
                                        <span className="me-3"><span className="text-dark">:</span></span>
                                        {getBasicInfoValue('Date Of Incorporation')}
                                    </label>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 row px-3">
                                <div className="col-6">
                                    <label>Changes Made</label>
                                </div>
                                <div className="col-6">
                                    <label className="text">
                                        <span className="me-3"><span className="text-dark">:</span></span>
                                        {getBasicInfoValue('Changes Made')}
                                    </label>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 row px-3">
                                <div className="col-6">
                                    <label>Last General Rekyc Present</label>
                                </div>
                                <div className="col-6">
                                    <label className="text">
                                        <span className="me-3"><span className="text-dark">:</span></span>
                                        {getBasicInfoValue('Last General Rekyc Present')}
                                    </label>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 row px-3">
                                <div className="col-6">
                                    <label>Last General Rekyc created</label>
                                </div>
                                <div className="col-6">
                                    <label className="text">
                                        <span className="me-3"><span className="text-dark">:</span></span>
                                        {getBasicInfoValue('Last General Rekyc Created')}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Approval Request Details Card */}
                <div className="card mx-4 mb-4">
                    <div className="card-header3">
                        <h3 className="card-title">Approval Request Details</h3>
                    </div>
                    <div className="card-body mt-0 pt-0 pb-1">
                        <div className="row header-labels mt-3 text-center">
                            <div className="col-2 text-start">
                                <h5>Field Name</h5>
                            </div>
                            <div className="col-2">
                                <h5>Old</h5>
                            </div>
                            <div className="col-2">
                                <h5>New</h5>
                            </div>
                            <div className="col-1">
                                <h5>Status</h5>
                            </div>
                            <div className="col-1">
                                <h5>Reviewed By</h5>
                            </div>
                            <div className="col-1">
                                <h5>Reviewed At</h5>
                            </div>
                            <div className="col-3">
                                <h5>Approve/Reject</h5>
                                <div className="checkbox-group mt-1 justify-content-center">
                                   
                                </div>
                            </div>
                        </div>

                        {/* Sections Mapping */}
                        {(() => {
                            const apiSections = rekycData?.sections || [];
                            
                            // Flatten all items from API and categorize them to match the image's structure
                            const allItems = [];
                            apiSections.forEach(s => {
                                s.items.forEach(item => {
                                    // Skip items with 'info' status - these are just displaying current values
                                    if (item.status !== 'info') {
                                        allItems.push({ ...item, originalSection: s.title });
                                    }
                                });
                            });

                            // Define groups with exact field name mappings
                            const groups = {
                                "Basic Information": {
                                    "pan attachment": true,
                                    "pan attachments": true,
                                    "type business": true,
                                    "type of organization": true,
                                    "type of work": true,
                                    "email": true,
                                    "mobile": true
                                },
                                "Additional Information": {
                                    "contact number": true,
                                    "ordering email": true,
                                    "billing account email": true,
                                    "website": true,
                                    "delivery lead period": true,
                                    "specify warranty period": true,
                                    "amc provided": true
                                },
                                "GSTIN Information": {
                                    "gstin applicable": true,
                                    "gst classification": true,
                                    "gst attachment": true,
                                    "gstin attachment": true
                                },
                                "Msme Information": {
                                    "msme": true,
                                    "valid from": true,
                                    "enterprise": true,
                                    "msme no": true,
                                    "valid till": true,
                                    "classification year": true,
                                    "major activity": true,
                                    "udyam registration date": true,
                                    "msme attachment": true
                                },
                                "E-Invoicing Information": {
                                    "einvoicing": true
                                },
                                "Addresses": {
                                    "office email": true,
                                    "office pin country": true,
                                    "office telephone number": true,
                                    "office mobile": true,
                                    "office city name": true,
                                    "office address line three": true,
                                    "office address line four": true,
                                    "office address line five": true
                                },
                                "Vendor Statutory Detail": {
                                    "shop act license": true,
                                    "esic number": true,
                                    "plan attachment": true,
                                    "shop act license number attachment": true,
                                    "esic number attachment": true
                                }
                            };

                            // Sections that should remain as tables/separate
                            const specialSections = ['Bank Details', 'Contact Person', 'Directors Information', 'Factory Warehouse', 'Branch Office', 'Major Customer'];

                            const renderedSections = [];
                            const usedItemIds = new Set(); // Track used items to avoid duplicates

                            // 1. Manually build sections based on field categories
                            // 1. Manually build sections based on field categories in desired order
                            const groupOrder = ["Basic Information", "Additional Information", "GSTIN Information", "Msme Information", "E-Invoicing Information"];
                            
                            groupOrder.forEach(groupName => {
                                const groupFields = groups[groupName];
                                    let items = allItems.filter(item => {
                                        const fieldNameLower = item.field_name?.toLowerCase().trim() || '';
                                        const originalSectionLower = item.originalSection?.toLowerCase() || '';
                                        
                                        // Match by field name or if it belongs to an MSME related section
                                        const isMatch = groupFields[fieldNameLower] || 
                                                       (groupName === "Msme Information" && (fieldNameLower.includes('msme') || originalSectionLower.includes('msme')));
                                        
                                        if (isMatch && !usedItemIds.has(item.id)) {
                                            usedItemIds.add(item.id);
                                            return true;
                                        }
                                        return false;
                                    });

                                    if (items.length > 0) {
                                        // Ensure MSME attachment is last in MSME information
                                        if (groupName === "Msme Information") {
                                            items = [
                                                ...items.filter(i => !i.field_name?.toLowerCase().includes('attachment') && !i.field_name?.toLowerCase().includes('certificate')),
                                                ...items.filter(i => i.field_name?.toLowerCase().includes('attachment') || i.field_name?.toLowerCase().includes('certificate'))
                                            ];
                                        }
                                        renderedSections.push({ title: groupName, items: items, isTable: false });
                                    }
                            });

                            // 2. Add Bank Details specifically after E-Invoicing
                            const bankSection = apiSections.find(s => s.title === 'Bank Details');
                            if (bankSection && bankSection.items && bankSection.items.length > 0) {
                                renderedSections.push({ title: 'Bank Details', items: bankSection.items, isTable: true });
                            }

                            // 3. Add other manual sections
                            ["Addresses", "Vendor Statutory Detail"].forEach(groupName => {
                                const groupFields = groups[groupName];
                                const items = allItems.filter(item => {
                                    const fieldNameLower = item.field_name?.toLowerCase().trim() || '';
                                    if (groupFields[fieldNameLower] && !usedItemIds.has(item.id)) {
                                        usedItemIds.add(item.id);
                                        return true;
                                    }
                                    return false;
                                });

                                if (items.length > 0) {
                                    renderedSections.push({ title: groupName, items: items, isTable: false });
                                }
                            });

                            // 4. Add other special sections (excluding Bank Details which was already added)
                            specialSections.filter(s => s !== 'Bank Details').forEach(sectionName => {
                                const section = apiSections.find(s => s.title === sectionName);
                                if (section && section.items && section.items.length > 0) {
                                    renderedSections.push({ title: sectionName, items: section.items, isTable: true });
                                }
                            });

                            // 5. Add any remaining sections
                            apiSections.forEach(s => {
                                const titleLower = s.title?.toLowerCase() || '';
                                const excludedTitles = ["basic information", "bank details", "addresses", "vendor statutory detail", "contact person", "directors information", "major customer", "factory warehouse", "branch office", "gstin information", "msme information", "additional information", "e-invoicing information"];
                                
                                if (!excludedTitles.includes(titleLower)) {
                                    // Check if this section was already handled by checking if items were already used
                                    const unusedItems = s.items.filter(item => !usedItemIds.has(item.id) && item.status !== 'info');
                                    if (unusedItems.length > 0) {
                                        renderedSections.push({ title: s.title, items: unusedItems, isTable: false });
                                    }
                                } else if (titleLower === 'addresses') {
                                    // Handle specialized Address items like "Communication" that are NOT simple rows
                                    const specialItems = s.items.filter(item => !usedItemIds.has(item.id) && item.status !== 'info');
                                    if (specialItems.length > 0) {
                                        const existing = renderedSections.find(rs => rs.title === 'Addresses');
                                        if (existing) {
                                            existing.items.push(...specialItems);
                                        } else {
                                            renderedSections.push({ title: 'Addresses', items: specialItems, isTable: false });
                                        }
                                    }
                                }
                            });

                            return renderedSections.map((section) => {
                                const sectionName = section.title;
                                const sectionRequests = section.items;
                                const isTableSection = section.isTable;

                                return (
                                    <div key={sectionName} className="mt-1">
                                        <div className="rekyc-section-header">
                                            <h2>{sectionName}</h2>
                                            <div className="dash-line"></div>
                                        </div>

                                        {sectionName === 'GSTIN Information' && (
                                            <div className="px-2 mb-2">
                                                <button className="purple-btn2 btn-sm mb-0" onClick={() => setShowReturnFiling(true)} type="button" style={{height: '30px', padding: '2px 10px'}}>
                                                    <span>Return Filing Details</span>
                                                </button>
                                            </div>
                                        )}

                                        {isTableSection ? (
                                            <div className="tbl-container table-responsive overflow-x-auto px-2">
                                                {sectionRequests.map((req, reqIdx) => {
                                                    const snapshot = req.record_snapshot || {};
                                                    const isBank = sectionName === 'Bank Details';
                                                    const isContact = sectionName === 'Contact Person';
                                                    const isDirector = sectionName === 'Directors Information';
                                                    const isFactory = sectionName === 'Factory Warehouse';
                                                    const isBranch = sectionName === 'Branch Office';
                                                    const isMajor = sectionName === 'Major Customer';

                                                    return (
                                                        <div key={req.id || reqIdx} className="mb-4">
                                                            {/* Blue Summary Header Row */}
                                                            <div className="row align-items-center mb-0 py-1 px-3 mx-0" style={{ backgroundColor: '#e0f1f7', minHeight: '40px', border: '1px solid #b3e5fc' }}>
                                                                <div className="col-4 text-start fw-bold" style={{ fontSize: '12px' }}>{req.field_name || sectionName}</div>
                                                                <div className="col-2 text-center" style={{ fontSize: '11px', color: '#555' }}>Added By {req.added_by || 'Vendor'}</div>
                                                                <div className="col-2 text-center" style={{ fontSize: '11px', color: '#555' }}>{req.status || 'pending'}</div>
                                                                <div className="col-1 text-center" style={{ fontSize: '11px', color: '#555' }}>N/A</div>
                                                                <div className="col-3 d-flex justify-content-end align-items-center">
                                                                    <div className="checkbox-group mb-0">
                                                                        <div className="checkbox-item me-3 d-flex align-items-center">
                                                                            <input 
                                                                                type="checkbox" 
                                                                                checked={approvals.approved.includes(req.id?.toString())}
                                                                                onChange={() => handleApprovalChange(req.id, 'approve')}
                                                                                disabled={!req.id}
                                                                            />
                                                                            <label className="ms-1 mb-0" style={{ fontSize: '11px', fontWeight: '500' }}>Approve</label>
                                                                        </div>
                                                                        <div className="checkbox-item d-flex align-items-center">
                                                                            <input 
                                                                                type="checkbox"
                                                                                checked={approvals.rejected.includes(req.id?.toString())}
                                                                                onChange={() => handleApprovalChange(req.id, 'reject')}
                                                                                disabled={!req.id}
                                                                            />
                                                                            <label className="ms-1 mb-0" style={{ fontSize: '11px', fontWeight: '500' }}>Reject</label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Table with Orange Headers */}
                                                            <table className="table table-bordered w-100 mb-0">
                                                                <thead className="table-light">
                                                                    <tr style={{ backgroundColor: '#de7008', color: '#fff' }}>
                                                                        {isBank && (
                                                                            <>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>Bank Name</th>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>Address</th>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>Country</th>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>State</th>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>City</th>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>PIN Code</th>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>Account Type</th>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>Account No.</th>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>Branch Name</th>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>Beneficiary Name</th>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>MICR No.</th>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>IFSC Code</th>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>Virtual Account</th>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>Company Name</th>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>Virtual Account Code</th>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>Remark</th>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>Attachment</th>
                                                                            </>
                                                                        )}
                                                                        {isContact && (
                                                                            <>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>Name Title</th>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>First Name</th>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>Last Name</th>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>Designation</th>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>Primary Email ID</th>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>Secondary Email ID</th>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>Primary Mobile No.</th>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>Secondary Mobile No.</th>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>Nationality</th>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>Gender</th>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>Attachment</th>
                                                                            </>
                                                                        )}
                                                                        {isDirector && (
                                                                            <>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>First Name</th>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>Last Name</th>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>Designation</th>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>Qualification</th>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>Experience</th>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>Email ID</th>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>Mobile Number</th>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>Attachment</th>
                                                                            </>
                                                                        )}
                                                                        {(isFactory || isBranch) && (
                                                                            <>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>Address</th>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>Country</th>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>State</th>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>City</th>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>PIN Code</th>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>Telephone Phone No.</th>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>Mobile Number</th>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>{isBranch ? 'Bank Details' : 'Attachment'}</th>
                                                                            </>
                                                                        )}
                                                                        {isMajor && (
                                                                            <>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>Company Name</th>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>Work Done</th>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>Contact Person</th>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>Designation</th>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>Country</th>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>Phone No.</th>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>Mobile No.</th>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>Year of Association</th>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>Service Provided From</th>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>Service Provided To</th>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>Stage Of Project</th>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>Major Competitors</th>
                                                                                <th style={{ backgroundColor: '#de7008', color: '#fff', fontSize: '11px', padding: '8px' }}>Attachment</th>
                                                                            </>
                                                                        )}
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        {isBank && (
                                                                            <>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.bank_name || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.address || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.country || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.state || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.city || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.pincode || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.account_type || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.account_number || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.branch || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.beneficiary_name || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.micr_number || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.ifsc || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.virtual_account || 'No'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.company_name || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.virtual_account_code || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.remark || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px', textAlign: 'center' }}>
                                                                                    {req.attachment_url ? (
                                                                                        <a href={`${baseURL}${req.attachment_url}`} target="_blank" rel="noreferrer" className="d-flex align-items-center justify-content-center" style={{ textDecoration: 'none' }}>
                                                                                            <span style={{ fontSize: '11px', color: '#de7008' }}>Download</span>
                                                                                            <span className="material-symbols-outlined fs-6 ms-1" style={{ color: '#000' }}>download</span>
                                                                                        </a>
                                                                                    ) : '-'}
                                                                                </td>
                                                                            </>
                                                                        )}
                                                                        {isContact && (
                                                                            <>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.name_title || snapshot.salutation || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.first_name || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.last_name || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.designation || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.primary_email || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.secondary_email || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.primary_mobile || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.secondary_mobile || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.nationality || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.gender || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px', textAlign: 'center' }}>
                                                                                    {snapshot.attachment?.download_url ? (
                                                                                        <a href={snapshot.attachment.download_url} target="_blank" rel="noreferrer" className="d-flex align-items-center justify-content-center" style={{ textDecoration: 'none' }}>
                                                                                            <span style={{ fontSize: '11px', color: '#de7008' }}>Download</span>
                                                                                            <span className="material-symbols-outlined fs-6 ms-1" style={{ color: '#000' }}>download</span>
                                                                                        </a>
                                                                                    ) : '-'}
                                                                                </td>
                                                                            </>
                                                                        )}
                                                                        {isDirector && (
                                                                            <>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.first_name || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.last_name || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.designation || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.qualification || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.experience || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.email || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.mobile || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px', textAlign: 'center' }}>
                                                                                    {snapshot.attachment?.download_url ? (
                                                                                        <a href={snapshot.attachment.download_url} target="_blank" rel="noreferrer" className="d-flex align-items-center justify-content-center" style={{ textDecoration: 'none' }}>
                                                                                            <span style={{ fontSize: '11px', color: '#de7008' }}>Download</span>
                                                                                            <span className="material-symbols-outlined fs-6 ms-1" style={{ color: '#000' }}>download</span>
                                                                                        </a>
                                                                                    ) : '-'}
                                                                                </td>
                                                                            </>
                                                                        )}
                                                                        {isFactory && (
                                                                            <>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.address || snapshot.factoryAddress || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.country || snapshot.factoryCountry || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.state || snapshot.factoryState || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.city || snapshot.city_name || snapshot.factoryCity || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.pin_code || snapshot.pincode || snapshot.factoryPinCode || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.tel_number || snapshot.telephone_no || snapshot.factoryTelephone || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.mobile || snapshot.mobile_number || snapshot.factoryContactNumber || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px', textAlign: 'center' }}>
                                                                                    {snapshot.attachment?.download_url || snapshot.factoryAttachment?.attachment_url ? (
                                                                                        <a href={snapshot.attachment?.download_url || `${baseURL}${snapshot.factoryAttachment?.attachment_url}`} target="_blank" rel="noreferrer" className="d-flex align-items-center justify-content-center" style={{ textDecoration: 'none' }}>
                                                                                            <span style={{ fontSize: '11px', color: '#de7008' }}>Download</span>
                                                                                            <span className="material-symbols-outlined fs-6 ms-1" style={{ color: '#000' }}>download</span>
                                                                                        </a>
                                                                                    ) : '-'}
                                                                                </td>
                                                                            </>
                                                                        )}
                                                                        {isBranch && (
                                                                            <>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.branchAddress || snapshot.address || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.branchCountry || snapshot.country || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.branchState || snapshot.state || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.branchCity || snapshot.city || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.branchPinCode || snapshot.pincode || snapshot.pin_code || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.branchTelephone || snapshot.telephone_no || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.branchContactNumber || snapshot.mobile_number || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.bank_details || '-'}</td>
                                                                            </>
                                                                        )}
                                                                        {isMajor && (
                                                                            <>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.company_name || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.work_done || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.contact_person || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.designation || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.country || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.phone || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.mobile || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.years_of_association || snapshot.year_of_association || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.service_provided_from || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.service_provided_to || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.stage_of_project || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px' }}>{snapshot.major_competitors || '-'}</td>
                                                                                <td style={{ fontSize: '11px', padding: '8px', textAlign: 'center' }}>
                                                                                    {snapshot.attachment?.download_url ? (
                                                                                        <a href={snapshot.attachment.download_url} target="_blank" rel="noreferrer" className="d-flex align-items-center justify-content-center" style={{ textDecoration: 'none' }}>
                                                                                            <span style={{ fontSize: '11px', color: '#de7008' }}>Download</span>
                                                                                            <span className="material-symbols-outlined fs-6 ms-1" style={{ color: '#000' }}>download</span>
                                                                                        </a>
                                                                                    ) : '-'}
                                                                                </td>
                                                                            </>
                                                                        )}
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        ) : (
                                            <div className="px-2">
                                                <div className="rekyc-row row align-items-center text-center fw-bold bg-light py-2 mb-2 sticky-top" style={{top: '55px', zIndex: 10, borderBottom: '2px solid #ddd'}}>
                                                    <div className="col-2 text-start">Field Name</div>
                                                    <div className="col-2">Old Value</div>
                                                    <div className="col-2">{sectionName === 'Attachments' ? 'Filename' : 'New Value'}</div>
                                                    <div className="col-1">Status</div>
                                                    <div className="col-1">Reviewed By</div>
                                                    <div className="col-1">Reviewed At</div>
                                                    <div className="col-3">Action</div>
                                                </div>
                                                {sectionRequests.map(req => (
                                                    <React.Fragment key={`${req.id}-${req.field_name}`}>
                                                        <div className="rekyc-row row align-items-center text-center">
                                                            <div className="col-2 text-start">
                                                                 <label>{req.field_name || req.record_type}</label>
                                                            </div>
                                                            <div className="col-2">
                                                                 <span className="text-blue">{req.old_value || (req.status === 'info' ? '' : 'nil')}</span>
                                                            </div>
                                                            <div className="col-2">
                                                                 <span className="d-flex align-items-center justify-content-center">
                                                                     {(req.field_name?.toLowerCase().includes('attachment') || req.record_type === 'Attachfile') ? (
                                                                         <div className="attachment-link d-flex align-items-center">
                                                                             <span className="text-truncate" style={{maxWidth: '150px', fontSize: '11px', color: '#f06421'}} title={req.record_snapshot?.file_name || req.new_value || 'Download'}>{req.record_snapshot?.file_name || 'Download'}</span>
                                                                             {(req.record_snapshot?.download_url || req.attachment_url) && (
                                                                                 <a className="ms-1" href={req.record_snapshot?.download_url || `${baseURL}${req.attachment_url}`} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                                                                                     <span className="material-symbols-outlined fs-6" style={{color: '#000'}}>download</span>
                                                                                 </a>
                                                                             )}
                                                                             {["Basic Information", "Additional Information", "GSTIN Information", "Msme Information"].includes(sectionName) && (
                                                                                 <button type="button" className="edit-icon-btn ms-2" onClick={() => handleEditClick(req)} title="Edit">
                                                                                     <span className="material-symbols-outlined" style={{fontSize: '18px', color: '#007bff'}}>edit</span>
                                                                                 </button>
                                                                             )}
                                                                         </div>
                                                                     ) : (
                                                                         <>
                                                                             <span>{req.new_value?.toString() || '-'}</span>
                                                                             {["Basic Information", "Additional Information", "GSTIN Information", "Msme Information"].includes(sectionName) && !req.field_name?.toLowerCase().includes('attachment') && req.record_type !== 'Attachfile' && (
                                                                                 <button type="button" className="edit-btn-blue ms-2" onClick={() => handleEditClick(req)}>
                                                                                     Edit
                                                                                 </button>
                                                                             )}
                                                                         </>
                                                                     )}
                                                                 </span>
                                                            </div>
                                                            <div className="col-1">
                                                                <span className="status-pending" style={{ textTransform: 'capitalize' }}>{req.status || 'Pending'}</span>
                                                            </div>
                                                            <div className="col-1">
                                                                <span>{req.reviewed_by || '-'}</span>
                                                            </div>
                                                            <div className="col-1">
                                                                <span>{req.reviewed_at || 'N/A'}</span>
                                                            </div>
                                                            <div className="col-3">
                                                                {req.status !== 'info' && (
                                                                    <div className="checkbox-group justify-content-center">
                                                                        <div className="checkbox-item me-2 d-flex align-items-center justify-content-center">
                                                                            <input 
                                                                                type="checkbox" 
                                                                                checked={approvals.approved.includes(req.id?.toString())}
                                                                                onChange={() => handleApprovalChange(req.id, 'approve')}
                                                                                disabled={!req.id}
                                                                            />
                                                                            <label>Approve</label>
                                                                        </div>
                                                                        <div className="checkbox-item d-flex align-items-center justify-content-center">
                                                                            <input 
                                                                                type="checkbox"
                                                                                checked={approvals.rejected.includes(req.id?.toString())}
                                                                                onChange={() => handleApprovalChange(req.id, 'reject')}
                                                                                disabled={!req.id}
                                                                            />
                                                                            <label>Reject</label>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        {/* Special Grid for Communication / Address details if it's a grid-style item */}
                                                        {req.record_type === 'Address' && req.new_address && (
                                                            <div className="p-3 mb-3" style={{ background: '#fff', border: '1px solid #e0f1f7', borderRadius: '4px' }}>
                                                                <div className="row">
                                                                    {[
                                                                        { label: 'Address', value: req.new_address.address },
                                                                        { label: 'Address Line 2', value: req.new_address.address_line_2 },
                                                                        { label: 'Address Line 3', value: req.new_address.address_line_3 },
                                                                        { label: 'Address Line 4', value: req.new_address.address_line_4 },
                                                                        { label: 'Address Line 5', value: req.new_address.address_line_5 },
                                                                        { label: 'Country', value: req.new_address.country },
                                                                        { label: 'State', value: req.new_address.state },
                                                                        { label: 'City', value: req.new_address.city },
                                                                        { label: 'Pin Code', value: req.new_address.pin_code },
                                                                        { label: 'Telephone Phone No.', value: req.new_address.telephone_no },
                                                                        { label: 'Mobile Number', value: req.new_address.mobile_number },
                                                                        { label: 'Email ID', value: req.new_address.email }
                                                                    ].map((field, idx) => (
                                                                        <div key={idx} className="col-lg-6 col-md-6 col-sm-12 row mb-1 px-3">
                                                                            <div className="col-5">
                                                                                <label style={{ color: '#de7008', fontWeight: '600', fontSize: '13px' }}>{field.label}</label>
                                                                            </div>
                                                                            <div className="col-7">
                                                                                <span style={{ fontSize: '13px' }}>
                                                                                    <span className="me-2">:</span>
                                                                                    {field.value || '-'}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            });
                        })()}
                    </div>

                    {/* Comments Section */}
                    <div className="row px-2">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>Comments</label>
                                <textarea 
                                    className="form-control" 
                                    rows="3" 
                                    value={comments}
                                    onChange={(e) => setComments(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Vendor Intimation Comments */}
                    <div className="row px-2">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>Vendor Intimation Comments by Initiator</label>
                                <textarea 
                                    className="form-control" 
                                    rows="3" 
                                    value={getValue('comments.vendor_comments')}
                                    disabled
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="d-flex justify-content-center mt-3 mb-3">
                        <button type="submit" className="purple-btn2 btn-sm" id="rekycSubmitButton">
                            Submit
                        </button>
                    </div>

                    {/* Current Approvers */}
                    <div className="text-center mt-2">
                        <span className="fw-bold">Current Approvers</span>
                        <i 
                            className="fa fa-info-circle ms-2 text-primary" 
                            data-bs-toggle="tooltip" 
                            data-bs-placement="top" 
                            title={getValue('current_approvers') || getValue('currentApprovers')}
                        />
                    </div>
                </div>

                {/* Audit Log Table */}
                <div className="card mx-4 mb-4">
                    <div className="card-header3">
                        <h3 className="card-title">Audit Log</h3>
                    </div>
                    <div className="card-body mt-0 pt-2">
                        <div className="tbl-container table-responsive">
                            <table className="table w-100 mb-0">
                                <thead>
                                    <tr>
                                        <th className="text-start">S.No.</th>
                                        <th className="text-start">Timestamp</th>
                                        <th className="text-start">User</th>
                                        <th className="text-start">Action</th>
                                        <th className="text-start">Field Name</th>
                                        <th className="text-start">Old Value</th>
                                        <th className="text-start">New Value</th>
                                        <th className="text-start">Status</th>
                                        <th className="text-start">Remarks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(rekycData?.audit_logs || rekycData?.auditLogs || []).map((log, index) => (
                                        <tr key={log.id}>
                                            <td className="text-start">{index + 1}</td>
                                            <td className="text-start">{log.timestamp || log.created_at}</td>
                                            <td className="text-start">{log.user || log.user_name}</td>
                                            <td className="text-start">
                                                <span className={`badge ${
                                                    log.action === 'Approved' ? 'bg-success' :
                                                    log.action === 'Reviewed' ? 'bg-info' :
                                                    log.action === 'Submitted' ? 'bg-primary' :
                                                    log.action === 'Requested Changes' ? 'bg-warning' :
                                                    'bg-secondary'
                                                }`}>
                                                    {log.action}
                                                </span>
                                            </td>
                                            <td className="text-start">{log.fieldName || log.field_name}</td>
                                            <td className="text-start">{log.oldValue || log.old_value}</td>
                                            <td className="text-start">{log.newValue || log.new_value}</td>
                                            <td className="text-start">
                                                <span className={`badge ${
                                                    log.status === 'Approved' ? 'bg-success' :
                                                    log.status === 'Pending' ? 'bg-warning' :
                                                    log.status === 'Initiated' ? 'bg-info' :
                                                    log.status === 'Submitted' ? 'bg-primary' :
                                                    'bg-secondary'
                                                }`}>
                                                    {log.status}
                                                </span>
                                            </td>
                                            <td className="text-start">{log.remarks || log.comment}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </form>

            {/* Edit New Value Modal */}
            <DynamicModalBox
                show={editModal.show}
                onHide={() => setEditModal({ show: false, request: null, newValue: '', dropdownKey: null })}
                title={`Edit Value for ${editModal.request?.field_name || ''}`}
                size="md"
                footerButtons={[
                    {
                        label: 'Cancel',
                        onClick: () => setEditModal({ show: false, request: null, newValue: '', dropdownKey: null }),
                        props: {
                            className: 'btn',
                            style: { backgroundColor: '#6c757d', color: '#fff', padding: '8px 20px', borderRadius: '4px' }
                        }
                    },
                    {
                        label: 'Save Changes',
                        onClick: handleSaveEdit,
                        props: {
                            className: 'btn',
                            style: { backgroundColor: '#007bff', color: '#fff', padding: '8px 20px', borderRadius: '4px' }
                        }
                    }
                ]}
            >
                <div className="mb-3">
                    <label className="form-label" style={{ fontWeight: '500', marginBottom: '8px' }}>
                        {editModal.dropdownKey ? 'Select' : 'Enter'} {editModal.request?.field_name}
                    </label>
                    {editModal.dropdownKey === 'msme_hardcoded' ? (
                        <select 
                            className="form-control"
                            value={editModal.newValue}
                            onChange={(e) => setEditModal(prev => ({ ...prev, newValue: e.target.value }))}
                        >
                            <option value="">Select MSME</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    ) : editModal.dropdownKey && dropdowns?.[editModal.dropdownKey] ? (
                        <select 
                            className="form-control"
                            value={editModal.newValue}
                            onChange={(e) => setEditModal(prev => ({ ...prev, newValue: e.target.value }))}
                        >
                            <option value="">Select {editModal.request?.field_name}</option>
                            {dropdowns[editModal.dropdownKey]
                                .filter(option => {
                                    if (editModal.dropdownKey === 'schema_group' || editModal.dropdownKey === 'gst_classification') {
                                        return option.code !== null && option.code !== undefined;
                                    } else if (editModal.dropdownKey === 'purchasing_organization') {
                                        return option.purchase_org_name !== null && option.purchase_org_name !== undefined;
                                    }
                                    return option.name !== null && option.name !== undefined;
                                })
                                .map((option, index) => {
                                    let optionLabel = option.name;
                                    if (editModal.dropdownKey === 'schema_group' || editModal.dropdownKey === 'gst_classification') {
                                        optionLabel = option.code;
                                    } else if (editModal.dropdownKey === 'purchasing_organization') {
                                        optionLabel = option.purchase_org_name;
                                    }
                                    
                                    return (
                                        <option key={index} value={option.id}>
                                            {optionLabel}
                                        </option>
                                    );
                                })}
                        </select>
                    ) : (
                        <input 
                            className="form-control" 
                            type="text" 
                            value={editModal.newValue} 
                            onChange={(e) => setEditModal(prev => ({ ...prev, newValue: e.target.value }))}
                            placeholder={`Enter ${editModal.request?.field_name}`}
                        />
                    )}
                </div>
            </DynamicModalBox>


            {/* Return Filing Details Modal */}
            <DynamicModalBox
                show={showReturnFiling}
                onHide={() => setShowReturnFiling(false)}
                size="lg"
                title={<span style={{ color: "#de7008" }}>Return Filing Details</span>}
            >
                <div className="row mt-2 px-2">
                    <div className="col-12">
                        <button 
                            type="button" 
                            className="btn btn-primary refresh-button" 
                            onClick={handleRefreshFilingDetails}
                            disabled={refreshingFiling}
                        >
                            {refreshingFiling ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                                    Refreshing...
                                </>
                            ) : "Refresh"}
                        </button>

                        <div className="mt-4">
                            <div className="mt-4 d-flex justify-content-between align-items-center">
                                <h5 className="fw-bold">GSTR1 Details</h5>
                            </div>
                            <div className="tbl-container me-2 mt-2">
                                <table className="w-100 table table-bordered table-hover" style={{ width: "100% !important" }}>
                                    <thead className="table-light">
                                        <tr>
                                            <th>GSTIN</th>
                                            <th>ARN</th>
                                            <th>Return Period</th>
                                            <th>Return Type</th>
                                            <th>Status</th>
                                            <th>Valid</th>
                                            <th>Method Of Filing</th>
                                            <th>Date Of Filing</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {gstr1Details.length > 0 ? (
                                            gstr1Details.map((item, idx) => (
                                                <tr key={idx}>
                                                    <td>{item.gstin || rekycData?.gstin || rekycData?.supplier_gstin || '-'}</td>
                                                    <td>{item.arn || "-"}</td>
                                                    <td>{item.ret_period || "-"}</td>
                                                    <td>{item.rtntyp || "-"}</td>
                                                    <td>{item.status || "-"}</td>
                                                    <td>{item.valid || "-"}</td>
                                                    <td>{item.mof || "-"}</td>
                                                    <td>{item.dof || "-"}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={8} className="text-center">No records found for GSTR1</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="mt-4">
                            <div className="mt-4 d-flex justify-content-between align-items-center">
                                <h5 className="fw-bold">GSTR3B Details</h5>
                            </div>
                            <div className="tbl-container me-2 mt-2">
                                <table className="w-100 table table-bordered table-hover" style={{ width: "100% !important" }}>
                                    <thead className="table-light">
                                        <tr>
                                            <th>GSTIN</th>
                                            <th>ARN</th>
                                            <th>Return Period</th>
                                            <th>Return Type</th>
                                            <th>Status</th>
                                            <th>Valid</th>
                                            <th>Method Of Filing</th>
                                            <th>Date Of Filing</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {gstr3bDetails.length > 0 ? (
                                            gstr3bDetails.map((item, idx) => (
                                                <tr key={idx}>
                                                    <td>{item.gstin || rekycData?.gstin || rekycData?.supplier_gstin || '-'}</td>
                                                    <td>{item.arn || "-"}</td>
                                                    <td>{item.ret_period || "-"}</td>
                                                    <td>{item.rtntyp || "-"}</td>
                                                    <td>{item.status || "-"}</td>
                                                    <td>{item.valid || "-"}</td>
                                                    <td>{item.mof || "-"}</td>
                                                    <td>{item.dof || "-"}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={8} className="text-center">No records found for GSTR3B</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </DynamicModalBox>


            {/* SAP Logs Modal */}
            {showSapModal && (
                <div className="modal fade show" id="sap_log" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-xl modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">SAP Logs</h5>
                                <button type="button" className="btn-close" onClick={() => setShowSapModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="tbl-container table-responsive">
                                    <table className="table w-100 mb-0">
                                        <thead>
                                            <tr>
                                                <th className="text-start">S.No.</th>
                                                <th className="text-start">Timestamp</th>
                                                <th className="text-start">Action</th>
                                                <th className="text-start">Status</th>
                                                <th className="text-start">Message</th>
                                                <th className="text-start">Response</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sapLogs && sapLogs.length > 0 ? (
                                                sapLogs.map((log, index) => (
                                                    <tr key={index}>
                                                        <td className="text-start">{index + 1}</td>
                                                        <td className="text-start">{log.timestamp || log.created_at || '-'}</td>
                                                        <td className="text-start">{log.action || '-'}</td>
                                                        <td className="text-start">
                                                            <span className={`badge ${log.status === 'success' ? 'bg-success' : 'bg-danger'}`}>
                                                                {log.status || '-'}
                                                            </span>
                                                        </td>
                                                        <td className="text-start">{log.message || '-'}</td>
                                                        <td className="text-start">
                                                            <small style={{ maxWidth: '300px', display: 'block', overflow: 'auto' }}>
                                                                {log.response || '-'}
                                                            </small>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="6" className="text-center py-4">
                                                        No SAP logs available
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowSapModal(false)}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Return Filing Details Modal */}
            {showReturnFiling && (
                <DynamicModalBox
                    show={showReturnFiling}
                    onHide={() => setShowReturnFiling(false)}
                    size="lg"
                    title={<span style={{ color: "#de7008" }}>Return Filing Details</span>}
                >
                    <div className="row mt-2 px-2">
                        <div className="col-12">
                            <button 
                                type="button" 
                                className="purple-btn2 btn-sm mb-3" 
                                onClick={handleRefreshFilingDetails}
                                disabled={refreshingFiling}
                            >
                                {refreshingFiling ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                                        Refreshing...
                                    </>
                                ) : "Refresh"}
                            </button>

                            <div className="mt-2">
                                <h5 className="fw-bold mb-2">GSTR1 Details</h5>
                                <div className="tbl-container table-responsive">
                                    <table className="table table-bordered table-hover w-100">
                                        <thead className="table-light">
                                            <tr>
                                                <th>GSTIN</th>
                                                <th>ARN</th>
                                                <th>Return Period</th>
                                                <th>Return Type</th>
                                                <th>Status</th>
                                                <th>Valid</th>
                                                <th>Method Of Filing</th>
                                                <th>Date Of Filing</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {gstr1Details.length > 0 ? (
                                                gstr1Details.map((item, idx) => (
                                                    <tr key={idx}>
                                                        <td>{item.gstin || rekycData?.gstin}</td>
                                                        <td>{item.arn || "-"}</td>
                                                        <td>{item.ret_period || "-"}</td>
                                                        <td>{item.rtntyp || "-"}</td>
                                                        <td>{item.status || "-"}</td>
                                                        <td>{item.valid || "-"}</td>
                                                        <td>{item.mof || "-"}</td>
                                                        <td>{item.dof || "-"}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={8} className="text-center">No records found for GSTR1</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="mt-4">
                                <h5 className="fw-bold mb-2">GSTR3B Details</h5>
                                <div className="tbl-container table-responsive">
                                    <table className="table table-bordered table-hover w-100">
                                        <thead className="table-light">
                                            <tr>
                                                <th>GSTIN</th>
                                                <th>ARN</th>
                                                <th>Return Period</th>
                                                <th>Return Type</th>
                                                <th>Status</th>
                                                <th>Valid</th>
                                                <th>Method Of Filing</th>
                                                <th>Date Of Filing</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {gstr3bDetails.length > 0 ? (
                                                gstr3bDetails.map((item, idx) => (
                                                    <tr key={idx}>
                                                        <td>{item.gstin || rekycData?.gstin}</td>
                                                        <td>{item.arn || "-"}</td>
                                                        <td>{item.ret_period || "-"}</td>
                                                        <td>{item.rtntyp || "-"}</td>
                                                        <td>{item.status || "-"}</td>
                                                        <td>{item.valid || "-"}</td>
                                                        <td>{item.mof || "-"}</td>
                                                        <td>{item.dof || "-"}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={8} className="text-center">No records found for GSTR3B</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </DynamicModalBox>
            )}
        </div>
    );
};

export default RekycDetail;

