import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { baseURL } from '../confi/apiDomain';
import '../styles/mor.css';

const RekycDetail = () => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const supplierId = searchParams.get('supplier_id') || 9071;
    const rekycId = searchParams.get('rekyc_id')|| 6436;
    
    // Get token from URL query parameters (like approval-list page)
    const token = searchParams.get('token');
    console.log('Token from URL:', token);
   

    const [comments, setComments] = useState('');
    const [loading, setLoading] = useState(true);
    const [rekycData, setRekycData] = useState(null);
    const [sapLogs, setSapLogs] = useState([]);
    const [showSapModal, setShowSapModal] = useState(false);
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
                `${baseURL}/supplier_field_approvals/sap_logs.json?supplier_id=${supplierId}&rekyc_id=${rekycId}`,
                config
            );
            console.log('SAP Logs:', response.data);
            setSapLogs(response.data);
            setShowSapModal(true);
        } catch (error) {
            console.error('Error fetching SAP logs:', error);
        }
    };

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

    const handleApproveAll = async () => {
        const approvalData = rekycData?.approval_requests || rekycData?.bankDetails || [];
        const allIds = approvalData.map(detail => detail.id);
        
        // Update local state
        setApprovals({ approved: allIds, rejected: [] });

        try {
            // Add token to request if available
            const config = {};
            if (token) {
                config.params = { token };
            }
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
        const approvalData = rekycData?.approval_requests || rekycData?.bankDetails || [];
        const allIds = approvalData.map(detail => detail.id);
        
        // Update local state
        setApprovals({ approved: [], rejected: allIds });

        try {
            // Add token to request if available
            const config = {};
            if (token) {
                config.params = { token };
            }
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
        if (type === 'approve') {
            setApprovals(prev => ({
                approved: prev.approved.includes(id) 
                    ? prev.approved.filter(i => i !== id)
                    : [...prev.approved, id],
                rejected: prev.rejected.filter(i => i !== id)
            }));
        } else {
            setApprovals(prev => ({
                approved: prev.approved.filter(i => i !== id),
                rejected: prev.rejected.includes(id)
                    ? prev.rejected.filter(i => i !== id)
                    : [...prev.rejected, id]
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting:', { approvals, comments });
        // Add API call here
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
                                        {getValue('supplier.supplier_code') || getValue('basic_info.vendorTrackingId')}
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
                                        {getValue('supplier.sap_code') || getValue('basic_info.vendorSapCode')}
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
                                        {getValue('supplier.name') || getValue('basic_info.vendorOrganizationName')}
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
                                        {getValue('supplier.department') || getValue('basic_info.vendorDepartment')}
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
                                        {getValue('supplier.organization_type') || getValue('basic_info.typeOfOrganization')}
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
                                        {getValue('supplier.llp_no') || getValue('basic_info.llpNo')}
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
                                        {getValue('supplier.nature_of_business') || getValue('basic_info.natureOfBusiness')}
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
                                        {getValue('supplier.vendor_type') || getValue('basic_info.vendorType')}
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
                                        {getValue('supplier.industry_type') || getValue('basic_info.typeOfIndustry')}
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
                                        {getValue('supplier.full_name') || getValue('basic_info.fullName')}
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
                                        {getValue('supplier.email') || getValue('basic_info.email')}
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
                                        {getValue('supplier.mobile') || getValue('basic_info.mobile')}
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
                                        {getValue('supplier.key_market') || getValue('basic_info.keyMarket')}
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
                                        {getValue('supplier.pan_number') || getValue('basic_info.panNumber')}
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
                                        {getValue('supplier.gstin') || getValue('basic_info.gstinNo')}
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
                                        {getValue('supplier.gstin_applicable') || getValue('basic_info.gstinApplicable')}
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
                                        {getValue('supplier.date_of_incorporation') || getValue('basic_info.dateOfIncorporation')}
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
                                        {getValue('changes_made', false).toString()}
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
                                        {getValue('last_general_rekyc_present', false).toString()}
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
                                        {getValue('last_general_rekyc_created')}
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
                        <div className="row">
                            <div className="col-2"></div>
                            <div className="col-2">
                                <h5>Old</h5>
                            </div>
                            <div className="col-2 new">
                                <h5>New</h5>
                            </div>
                            <div className="col-2 new">
                                <h5>Status</h5>
                            </div>
                            <div className="col-1 new">
                                <h5>Reviewed By</h5>
                            </div>
                            <div className="col-1 new">
                                <h5>Reviewed At</h5>
                            </div>
                            <div className="col-2 new">
                                <h5>Approve/Reject</h5>
                                <div className="checkbox-group justify-content-end">
                                    <div className="checkbox-item">
                                        <input 
                                            type="checkbox" 
                                            checked={rekycData?.approval_requests?.length > 0 && approvals.approved.length === rekycData.approval_requests.length}
                                            onChange={handleApproveAll}
                                        />
                                        <small>Approve All</small>
                                    </div>
                                    <div className="checkbox-item">
                                        <input 
                                            type="checkbox"
                                            checked={rekycData?.approval_requests?.length > 0 && approvals.rejected.length === rekycData.approval_requests.length}
                                            onChange={handleRejectAll}
                                        />
                                        <small>Reject All</small>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bank Detail Section */}
                        <div className="top-head d-flex">
                            <h2 className="nav-header mb-2">Bank Detail</h2>
                            <span className="border-bottom-last"></span>
                        </div>

                        <div className="tbl-container" style={{ overflowX: 'auto', overflowY: 'hidden', width: '100%', display: 'block', whiteSpace: 'nowrap' }}>
                            <table className="w-90" style={{ width: 'max-content' }}>
                                <tbody>
                                    {(rekycData?.approval_requests || []).map((detail) => (
                                        <React.Fragment key={detail.id}>
                                            <tr className="log-row">
                                                <td colSpan="5">
                                                    <div className="d-flex">
                                                        <div className="col-2">
                                                            <label className="mm">{detail.record_type || 'Bank Detail'}</label>
                                                        </div>
                                                        <div className="col-2 text-blue old">
                                                            <span>{detail.old_value || '-'}</span>
                                                        </div>
                                                        <div className="col-2 text-blue new">
                                                            <span>{detail.new_value || 'Added By Vendor'}</span>
                                                        </div>
                                                        <div className="col-2 text-blue new">
                                                            <span>{detail.status || 'pending'}</span>
                                                        </div>
                                                        <div className="col-1 text-blue new">
                                                            <span>{detail.reviewed_by || '-'}</span>
                                                        </div>
                                                        <div className="col-1 text-blue new">
                                                            <span>{detail.reviewed_at || 'N/A'}</span>
                                                        </div>
                                                        <div className="col-2 text-blue new">
                                                            <div className="checkbox-group justify-content-end">
                                                                <div className="checkbox-item">
                                                                    <input 
                                                                        type="checkbox" 
                                                                        checked={approvals.approved.includes(detail.id)}
                                                                        onChange={() => handleApprovalChange(detail.id, 'approve')}
                                                                        className="approve-checkbox"
                                                                    />
                                                                    <label>Approve</label>
                                                                </div>
                                                                <div className="checkbox-item">
                                                                    <input 
                                                                        type="checkbox"
                                                                        checked={approvals.rejected.includes(detail.id)}
                                                                        onChange={() => handleApprovalChange(detail.id, 'reject')}
                                                                        className="reject-checkbox"
                                                                    />
                                                                    <label>Reject</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            {detail.bank_details && (
                                                <tr>
                                                    <td colSpan="5">
                                                        <div className="tbl-container table-responsive overflow-x-auto">
                                                            <table className="table w-100 mb-0 text-nowrap" style={{ width: 'max-content !important' }}>
                                                                <thead>
                                                                    <tr>
                                                                        <th className="text-start">Bank Name</th>
                                                                        <th className="text-start">Address</th>
                                                                        <th className="text-start">Country</th>
                                                                        <th className="text-start">State</th>
                                                                        <th className="text-start">City</th>
                                                                        <th className="text-start">PIN Code</th>
                                                                        <th className="text-start">Account Type</th>
                                                                        <th className="text-start">Account No.</th>
                                                                        <th className="text-start">Branch Name</th>
                                                                        <th className="text-start">Beneficiary Name</th>
                                                                        <th className="text-start">MICR No.</th>
                                                                        <th className="text-start">IFSC Code</th>
                                                                        <th className="text-start">Remark</th>
                                                                        <th className="text-start">Attachment</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td className="text-start">{detail.bank_details.bank_name || '-'}</td>
                                                                        <td className="text-start">{detail.bank_details.address || '-'}</td>
                                                                        <td className="text-start">{detail.bank_details.country || '-'}</td>
                                                                        <td className="text-start">{detail.bank_details.state || '-'}</td>
                                                                        <td className="text-start">{detail.bank_details.city || '-'}</td>
                                                                        <td className="text-start">{detail.bank_details.pin_code || '-'}</td>
                                                                        <td className="text-start">{detail.bank_details.account_type || '-'}</td>
                                                                        <td className="text-start">{detail.bank_details.account_no || '-'}</td>
                                                                        <td className="text-start">{detail.bank_details.branch_name || '-'}</td>
                                                                        <td className="text-start">{detail.bank_details.beneficiary_name || '-'}</td>
                                                                        <td className="text-start">{detail.bank_details.micr_no || '-'}</td>
                                                                        <td className="text-start">{detail.bank_details.ifsc_code || '-'}</td>
                                                                        <td className="text-start">{detail.bank_details.remark || '-'}</td>
                                                                        <td>
                                                                            {detail.bank_details.attachment && (
                                                                                <a className="text-decoration-none" target="_blank" rel="noopener noreferrer" href={`${baseURL}${detail.bank_details.attachment}`}>
                                                                                    <span className="material-symbols-outlined mt-2">file_download</span>
                                                                                </a>
                                                                            )}
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
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
                                    value={getValue('initiator_remark') || getValue('initiatorRemark')}
                                    readOnly
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
        </div>
    );
};

export default RekycDetail;
