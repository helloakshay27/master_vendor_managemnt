// Utility function to map majorCustomers state to major_customers_attributes
const mapMajorCustomersToPayload = (majorCustomers) => {
    return majorCustomers.map((c) => ({
        // Ensure id is null when idPre is missing (explicit undefined/null check)
        id: (typeof c.idPre !== 'undefined' && c.idPre !== null) ? c.idPre : null,
        name: c.companyName || '',
        site_type: c.siteType || '',
        company_id: c.companyId || null,
        work_done: c.workDone || '',
        attachment: c.attachment || null,
        contact_person: c.contactPerson || '',
        designation_id: c.designation?.value || null,
        country_id: c.country?.value || null,
        phone: c.phone || '',
        mobile: c.mobile || '',
        years_of_association: c.yearOfAssociation || '',
        service_provided_from: c.serviceFrom || '',
        service_provided_to: c.serviceTo || '',
        turn_over: c.businessLast12Months || '',
        major_competitors: c.majorCompetitors || '',
        stage_of_project: c.stageOfProject || '',
        // accept both boolean true or string "true" used elsewhere in the code
        _destroy: (c._destroy === true || c._destroy === "true") ? true : false
    }));
};
// Utility: Map contactPersons state to contact_people_attributes
// Utility: Map owners state to directors_informations_attributes
const mapOwnersToPayload = (owners) => owners.map((owner) => ({
    id: (typeof owner.idPre !== 'undefined' && owner.idPre !== null) ? owner.idPre : null,
    attachment: [owner.attachment] || '',
    first_name: owner.firstName || '',
    last_name: owner.lastName || '',
    designation_id: owner.designation?.value || null,
    qualification: owner.qualification?.value || '',
    experience: owner.experience || '',
    email: owner.email || '',
    mobile: owner.mobile || '',
    // _destroy: false
    _destroy: (owner._destroy === true || owner._destroy === "true") ? true : false
}));
const mapContactPersonsToPayload = (contactPersons) => contactPersons.map((person) => ({
    id: (typeof person.idPre !== 'undefined' && person.idPre !== null) ? person.idPre : null,
    escalation_level: person.escalationLevel?.value || '',
    attachment: [person.attachment] || null,
    name_title_id: person.nameTitle?.value || null,
    first_name: person.firstName || '',
    last_name: person.lastName || '',
    middle_name: person.middleName || '',
    // centeral_posting_block: person.centeralPostingBlock || false,
    // reconciliation_account_id: person.reconciliationAccountId || null,
    // purchasing_block: person.purchasingBlock || false,
    // customer: person.customer || false,
    // payment_block: person.paymentBlock || false,
    // schema_group_id: person.schemaGroupId || null,
    designation_id: person.designation?.value || null,
    primary_email: person.primaryEmail || '',
    secondary_email: person.secondaryEmail || '',
    primary_mobile: person.primaryMobile || '',
    secondary_mobile: person.secondaryMobile || '',
    nationality_string: person.nationality?.label || '',
    // gender: person.gender?.label || '',
    birth_date: person.dob || '',
    // _destroy: false
    _destroy: (person._destroy === true || person._destroy === "true") ? true : false
}));
const mapBranchOfficesToPayload = (branchOffices) => branchOffices.map((office) => ({
    id: (typeof office.idPre !== 'undefined' && office.idPre !== null) ? office.idPre : null,
    // office.id ||
    gst_no: office.gst_no || '',
    gst_cert_file: office.gst_cert_file || '',
    address: office.address || '',
    country_id: office.country?.value || null,
    state_id: office.state?.value || null,
    city_name: office.city || '',
    pin_code: office.pincode || '',
    tel_number: office.telephone || '',
    mobile: office.mobile || '',
    // _destroy: false
    _destroy: (office._destroy === true || office._destroy === "true") ? true : false
}));


// Utility: Map registeredAddress state to office_address_attributes
const mapRegisteredAddressToPayload = (registeredAddress) => [{
    id: registeredAddress.id || null,
    address: registeredAddress.address1 || '',
    address_type: 'office',
    email: registeredAddress.billingEmail || '',
    mobile: registeredAddress.mobile || '',
    address_line_two: registeredAddress.address2 || '',
    address_line_three: registeredAddress.address3 || '',
    address_line_four: registeredAddress.address4 || '',
    address_line_five: registeredAddress.address5 || '',
    pms_country_id: registeredAddress.country?.value || null,
    pms_state_id: registeredAddress.state?.value || null,
    pms_city_id: null, // Map if city is an object with value, else null
    pms_location_id: null, // Map if location is available
    pin_code: registeredAddress.pincode || '',
    telephone_number: registeredAddress.telephone || '',
    fax_number: '', // Add if available in state
    city_name: registeredAddress.city || '',
    _destroy: false

}];

// Utility: Map communicationAddress state to communication_address_attributes
const mapCommunicationAddressToPayload = (communicationAddress, sameAsRegistered) => [{
    id: communicationAddress.idPre || null,
    address: communicationAddress.address1 || '',
    address_type: 'Communication',
    email: communicationAddress.orderingEmail || '',
    mobile: communicationAddress.mobile || '',
    address_line_two: communicationAddress.address2 || '',
    address_line_three: communicationAddress.address3 || '',
    address_line_four: communicationAddress.address4 || '',
    address_line_five: communicationAddress.address5 || '',
    pms_country_id: communicationAddress.country?.value || null,
    pms_state_id: communicationAddress.state?.value || null,
    pms_city_id: null, // Map if city is an object with value, else null
    pms_location_id: null, // Map if location is available
    pin_code: communicationAddress.pincode || '',
    telephone_number: communicationAddress.telephone || '',
    fax_number: '', // Add if available in state
    city_name: communicationAddress.city || '',
    communication_address_same_as_reg_add: sameAsRegistered ? 'on' : 'off',
    _destroy: false
}];


const mapWarehousesToPayload = (warehouses) => {
    return warehouses.map((w) => ({
        id: (typeof w.idPre !== 'undefined' && w.idPre !== null) ? w.idPre : null,
        address: w.address || '',
        country_id: w.country?.value || null,
        state_id: w.state?.value || null,
        city_name: w.city || w.city_name || null,
        pin_code: w.pincode || '',
        tel_number: w.telephone || '',
        mobile: w.mobile || '',
        contact_person: w.contactPerson || null,
        contact_person_email: w.contactPersonEmail || null,
        attachment: [w.attachment] || null,
        // _destroy: w._destroy === true ? true : false
        _destroy: (w._destroy === true || w._destroy === "true") ? true : false
    }));
};


import React, { useState, useEffect, useRef } from "react";
// import CollapsedCardKYC from "../../../components/base/Card/CollapsedCardKYC";
import CardBodyKYC from "../components/base/Card/CardBodyKYC";
import CardBodyMsme from "../components/base/Card/CardBodyMsme";
import axios from "axios";
import { SelectBox } from "../components";
import { useParams, useSearchParams } from "react-router-dom";
import SingleSelector from "../components/base/Select/SingleSelector";
import "../styles/mor.css";
import { error } from "jquery";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import CryptoJS from "crypto-js"; // Import crypto-js for encryption
import { baseURL } from "../confi/apiDomain";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import TooltipIcon from "../components/common/Icon/TooltipIcon";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import ReactTooltip from "react-t
import CollapsedCardKYC from "../components/base/Card/CollapsedCardKYC";
import { MultiSelector } from "../components";

const VendorRegistrationStepByStepForm = () => {
    // State for checklist responses
    const [checklistResponses, setChecklistResponses] = useState({});
    const [checklistConfig, setChecklistConfig] = useState([]);
    useEffect(() => {
        const fetchChecklistConfig = async () => {
            try {
                const response = await axios.get(`${baseURL}/pms/suppliers/${id}/checklist_configuration`);
                setChecklistConfig(response.data || []);
                // console.log("check list:", response.data)
            } catch (error) {
                setChecklistConfig([]);
            }
        };
        fetchChecklistConfig();
    }, []);

    // Qualification options for owners/contact persons
    const qualificationList = [
        'Bachelor of Science (B.Sc.)',
        'Bachelor of Commerce (B.Com.)',
        'Bachelor of Engineering (B.E.) / Bachelor of Technology (B.Tech.)',
        'Bachelor of Medicine, Bachelor of Surgery (MBBS)',
        'Bachelor of Dental Surgery (BDS)',
        'Bachelor of Computer Applications (BCA)',
        'Bachelor of Business Administration (BBA)',
        'Bachelor of Education (B.Ed.)',
        'Bachelor of Architecture (B.Arch.)',
        'Bachelor of Pharmacy (B.Pharm.)',
        'Bachelor of Laws (LL.B.)',
        'Postgraduate Degrees',
        'Master of Arts (M.A.)',
        'Master of Science (M.Sc.)',
        'Master of Commerce (M.Com.)',
        'Master of Engineering (M.E.) / Master of Technology (M.Tech.)',
        'Doctor of Medicine (M.D.)',
        'Master of Surgery (M.S.)',
        'Master of Dental Surgery (MDS)',
        'Master of Computer Applications (MCA)',
        'Master of Business Administration (MBA)',
        'Master of Education (M.Ed.)',
        'Master of Architecture (M.Arch.)',
        'Master of Pharmacy (M.Pharm.)',
        'Master of Laws (LL.M.)',
        'Doctoral Degrees',
        'Doctor of Philosophy (Ph.D.)',
        'Doctor of Science (D.Sc.)',
        'Doctor of Letters (D.Litt.)',
        'Professional Qualifications',
        'Chartered Accountant (CA)',
        'Company Secretary (CS)',
        'Cost and Management Accountant (CMA)',
        'Certified Financial Planner (CFP)',
        'Certified Management Accountant (CMA - US)',
        'Chartered Financial Analyst (CFA)',
        'Diploma in Engineering (Polytechnic)',
        'Diploma in Education (D.Ed.)',
        'Diploma in Pharmacy (D.Pharm.)',
        'Diploma in Nursing',
        'Industrial Training Institute (ITI) Certificates'
    ];
    const qualificationOptions = qualificationList.map(q => ({ label: q, value: q }));
    // Handler for response change
    const handleChecklistResponseChange = (subcatId, qId, field, value) => {
        setChecklistResponses(prev => ({
            ...prev,
            [subcatId]: {
                questions: (prev[subcatId]?.questions || []).map(q =>
                    q.id === qId ? { ...q, [field]: value } : q
                )
            }
        }));
    };

    // Handler for option change
    const handleChecklistOptionChange = (subcatId, qId, selectedOption) => {
        setChecklistResponses(prev => ({
            ...prev,
            [subcatId]: {
                questions: (prev[subcatId]?.questions || []).map(q =>
                    q.id === qId ? { ...q, selectedOption } : q
                )
            }
        }));
    };

    // console.log("check option ***:", checklistResponses)

    // Handler for file upload
    const handleChecklistFileChange = (subcatId, qId, file) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result.split(',')[1];
            const fileObj = {
                filename: file.name,
                content_type: file.type,
                content: base64String
            };
            setChecklistResponses(prev => ({
                ...prev,
                [subcatId]: {
                    questions: (prev[subcatId]?.questions || []).map(q =>
                        q.id === qId ? { ...q, files: [...(q.files || []), fileObj] } : q
                    )
                }
            }));
        };
        reader.readAsDataURL(file);
    };

    // Initialize checklistResponses when checklistConfig changes
    useEffect(() => {
        const initial = {};
        checklistConfig.forEach(cat => {
            cat.subcats.forEach(subcat => {
                initial[subcat.id] = {
                    questions: subcat.questions.map(q => {
                        // Pre-fill value/comments/selectedOption from API if present
                        const valueFromApi = (typeof q.answer !== 'undefined' && q.answer !== null) ? q.answer : '';
                        const commentsFromApi = (typeof q.answer_comments !== 'undefined' && q.answer_comments !== null) ? q.answer_comments : (typeof q.answer_comment !== 'undefined' ? q.answer_comment : '');
                        // If question has options and answer_option_id, try to pick the matching option object
                        let selectedOption = null;
                        try {
                            if (q.options && Array.isArray(q.options) && (typeof q.answer_option_id !== 'undefined' && q.answer_option_id !== null)) {
                                const match = q.options.find(opt => String(opt.value) === String(q.answer_option_id) || String(opt.id) === String(q.answer_option_id) || String(opt.value) === String(q.answer_option_id));
                                if (match) selectedOption = { label: match.name || match.label || String(match.value || match.id || ''), value: match.value || match.id || match.label || match.name };
                            }
                        } catch (e) {
                            selectedOption = null;
                        }

                        // Files: backend field may vary; try a few common keys on the question
                        const filesFromApiRaw = q.files || q.attachments || q.documents || q.question_attachments || [];
                        const filesFromApi = Array.isArray(filesFromApiRaw) ? filesFromApiRaw.slice() : [];

                        // Some APIs return a single answer_file property (string path) — include it as an attachment object so UI can show a download link
                        if (q.answer_file && (typeof q.answer_file === 'string' && q.answer_file.trim() !== '')) {
                            // Try to derive a sensible filename from the URL/path
                            let derivedName = q.answer_file_name || q.answer_filename || null;
                            try {
                                if (!derivedName) {
                                    const parts = q.answer_file.split('/');
                                    derivedName = decodeURIComponent((parts[parts.length - 1] || q.answer_file).split('?')[0]);
                                }
                            } catch (e) {
                                derivedName = q.answer_file;
                            }
                            filesFromApi.push({ document_name: derivedName, attachment_url: q.answer_file });
                        }

                        return ({
                            id: q.id,
                            value: valueFromApi || '',
                            comments: commentsFromApi || '',
                            selectedOption: selectedOption,
                            files: Array.isArray(filesFromApi) ? filesFromApi.map(f => ({ filename: f.document_name || f.filename || f.name || String(f), file_url: f.attachment_url || f.file_url || f.url || null })) : []
                        });
                    })
                };
            });
        });
        setChecklistResponses(initial);
    }, [checklistConfig]);

    // Mapping for API payload
    const checklistPayload = {};
    Object.entries(checklistResponses).forEach(([subcatId, data]) => {
        checklistPayload[subcatId] = {
            questions: data.questions.map(q => ({
                id: q.id,
                value: q.value,
                comments: q.comments,
                option_id: q.selectedOption?.value,
                files: q.files || []
            }))
        };
    });

    // console.log("checklist payload :", checklistPayload)
    // State for Questions section
    const [questions, setQuestions] = useState({
        expertise: '',
        expertiseAttachment: null,
        structure: ''
    });


    // console.log("que:", questions)
    // Handler for text changes
    const handleQuestionChange = (field, value) => {
        setQuestions(prev => ({ ...prev, [field]: value }));
    };

    // Handler for file change
    const handleQuestionFileChange = (file) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result.split(',')[1];
            const attachment = {
                filename: file.name,
                content: base64String,
                content_type: file.type,
            };
            setQuestions(prev => ({ ...prev, expertiseAttachment: attachment }));
        };
        reader.readAsDataURL(file);
    };

    // Handler for E-Invoice declaration file (convert File -> { filename, content, content_type })
    const handleEinvoiceDeclarationFileChange = (file) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result.split(',')[1];
            const attachment = {
                filename: file.name,
                content: base64String,
                content_type: file.type || 'application/pdf',
            };
            // Store in additionalDetails using existing updater
            updateAdditionalDetails('einvoiceDeclaration', attachment);
        };
        reader.readAsDataURL(file);
    };
    // Designation options for contact person (fetched from API dropdowns)
    const [designationOptions, setDesignationOptions] = useState([]);
    useEffect(() => {
        const fetchDesignationOptions = async () => {
            try {
                const response = await axios.get(`${baseURL}/pms/suppliers/dropdowns`);
                const options = (response.data?.designation || []).map(item => ({ label: item.name, value: item.value }));
                setDesignationOptions(options);
            } catch (error) {
                setDesignationOptions([]);
            }
        };
        fetchDesignationOptions();
    }, []);

    // Fetch name/title options from the same dropdown endpoint (keeps a sensible fallback)
    const [nameTitleOptions, setNameTitleOptions] = useState([]);

    useEffect(() => {
        const fetchNameTitleOptions = async () => {
            try {
                const response = await axios.get(`${baseURL}/pms/suppliers/dropdowns`);
                const options = (response.data?.name_titles || []).map(item => ({ label: item.name, value: item.value }));
                setNameTitleOptions(options);
            } catch (err) {
                // keep the default fallback
                setNameTitleOptions(prev => (prev && prev.length > 0 ? prev : [{ label: 'Select', value: '' }]));
            }
        };
        fetchNameTitleOptions();
    }, []);

    // console.log("name title options:", nameTitleOptions)
    // Annual Turnover state as array of objects
    const [annualTurnover, setAnnualTurnover] = useState([
        { year: '2024-2025', turnover: '', attachment: null, keyMarkets: '' },
        { year: '2023-2024', turnover: '', attachment: null, keyMarkets: '' },
        { year: '2022-2023', turnover: '', attachment: null, keyMarkets: '' },
    ]);

    // Handler for input change
    const handleAnnualTurnoverChange = (index, field, value) => {
        setAnnualTurnover(prev => prev.map((item, i) => i === index ? { ...item, [field]: value } : item));
    };

    // Handler for file change
    const handleAnnualTurnoverFileChange = (index, file) => {
        setAnnualTurnover(prev => prev.map((item, i) => i === index ? { ...item, attachment: file } : item));
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            // Get base64 string (remove prefix)
            const base64String = reader.result.split(',')[1];
            const attachment = {
                filename: file.name,
                content: base64String,
                content_type: file.type,
            };
            setAnnualTurnover(prev => prev.map((item, idx) => idx === index ? { ...item, attachment } : item));
        };
        reader.readAsDataURL(file);
    };

    // console.log("annual turn over:", annualTurnover)

    // Name Title options for contact person
    // const nameTitleOptions = [
    //     { label: 'Select', value: '' },
    //     { label: 'Mr', value: 'Mr' },
    //     { label: 'Ms', value: 'Ms' },
    //     { label: 'Mrs', value: 'Mrs' },
    //     { label: 'Dr', value: 'Dr' },
    //     { label: 'M/s', value: 'M/s' },
    //     { label: 'Company', value: 'Company' },
    // ];
    // Escalation Level options for contact person
    const escalationLevelOptions = [
        { label: 'Level 1', value: 'Level 1' },
        { label: 'Level 2', value: 'Level 2' },
        { label: 'Level 3', value: 'Level 3' },
        { label: 'Level 4', value: 'Level 4' },
        { label: 'Level 5', value: 'Level 5' },
    ];
    // Currency options for currency type selector
    const currencyOptions = [
        { label: 'Select Currency', value: '' },
        { label: 'AED', value: 'AED' },
        { label: 'AFN', value: 'AFN' },
        { label: 'ALL', value: 'ALL' },
        { label: 'AMD', value: 'AMD' },
        { label: 'ANG', value: 'ANG' },
        { label: 'AOA', value: 'AOA' },
        { label: 'ARS', value: 'ARS' },
        { label: 'AUD', value: 'AUD' },
        { label: 'AWG', value: 'AWG' },
        { label: 'AZN', value: 'AZN' },
        { label: 'BAM', value: 'BAM' },
        { label: 'BBD', value: 'BBD' },
        { label: 'BDT', value: 'BDT' },
        { label: 'BGN', value: 'BGN' },
        { label: 'BHD', value: 'BHD' },
        { label: 'BIF', value: 'BIF' },
        { label: 'BMD', value: 'BMD' },
        { label: 'BND', value: 'BND' },
        { label: 'BOB', value: 'BOB' },
        { label: 'BRL', value: 'BRL' },
        { label: 'BSD', value: 'BSD' },
        { label: 'BTN', value: 'BTN' },
        { label: 'BWP', value: 'BWP' },
        { label: 'BYN', value: 'BYN' },
        { label: 'BZD', value: 'BZD' },
        { label: 'CAD', value: 'CAD' },
        { label: 'CDF', value: 'CDF' },
        { label: 'CHF', value: 'CHF' },
        { label: 'CLP', value: 'CLP' },
        { label: 'CNY', value: 'CNY' },
        { label: 'COP', value: 'COP' },
        { label: 'CRC', value: 'CRC' },
        { label: 'CUP', value: 'CUP' },
        { label: 'CVE', value: 'CVE' },
        { label: 'CZK', value: 'CZK' },
        { label: 'DJF', value: 'DJF' },
        { label: 'DKK', value: 'DKK' },
        { label: 'DOP', value: 'DOP' },
        { label: 'DZD', value: 'DZD' },
        { label: 'EGP', value: 'EGP' },
        { label: 'ERN', value: 'ERN' },
        { label: 'ETB', value: 'ETB' },
        { label: 'EUR', value: 'EUR' },
        { label: 'FJD', value: 'FJD' },
        { label: 'FKP', value: 'FKP' },
        { label: 'GBP', value: 'GBP' },
        { label: 'GEL', value: 'GEL' },
        { label: 'GHS', value: 'GHS' },
        { label: 'GIP', value: 'GIP' },
        { label: 'GMD', value: 'GMD' },
        { label: 'GNF', value: 'GNF' },
        { label: 'GTQ', value: 'GTQ' },
        { label: 'GYD', value: 'GYD' },
        { label: 'HKD', value: 'HKD' },
        { label: 'HNL', value: 'HNL' },
        { label: 'HRK', value: 'HRK' },
        { label: 'HTG', value: 'HTG' },
        { label: 'HUF', value: 'HUF' },
        { label: 'IDR', value: 'IDR' },
        { label: 'ILS', value: 'ILS' },
        { label: 'INR', value: 'INR' },
        { label: 'IQD', value: 'IQD' },
        { label: 'IRR', value: 'IRR' },
        { label: 'ISK', value: 'ISK' },
        { label: 'JMD', value: 'JMD' },
        { label: 'JOD', value: 'JOD' },
        { label: 'JPY', value: 'JPY' },
        { label: 'KES', value: 'KES' },
        { label: 'KGS', value: 'KGS' },
        { label: 'KHR', value: 'KHR' },
        { label: 'KMF', value: 'KMF' },
        { label: 'KRW', value: 'KRW' },
        { label: 'KWD', value: 'KWD' },
        { label: 'KYD', value: 'KYD' },
        { label: 'KZT', value: 'KZT' },
        { label: 'LAK', value: 'LAK' },
        { label: 'LBP', value: 'LBP' },
        { label: 'LKR', value: 'LKR' },
        { label: 'LRD', value: 'LRD' },
        { label: 'LSL', value: 'LSL' },
        { label: 'LYD', value: 'LYD' },
        { label: 'MAD', value: 'MAD' },
        { label: 'MDL', value: 'MDL' },
        { label: 'MGA', value: 'MGA' },
        { label: 'MKD', value: 'MKD' },
        { label: 'MMK', value: 'MMK' },
        { label: 'MNT', value: 'MNT' },
        { label: 'MOP', value: 'MOP' },
        { label: 'MRU', value: 'MRU' },
        { label: 'MUR', value: 'MUR' },
        { label: 'MVR', value: 'MVR' },
        { label: 'MWK', value: 'MWK' },
        { label: 'MXN', value: 'MXN' },
        { label: 'MYR', value: 'MYR' },
        { label: 'MZN', value: 'MZN' },
        { label: 'NAD', value: 'NAD' },
        { label: 'NGN', value: 'NGN' },
        { label: 'NIO', value: 'NIO' },
        { label: 'NOK', value: 'NOK' },
        { label: 'NPR', value: 'NPR' },
        { label: 'NZD', value: 'NZD' },
        { label: 'OMR', value: 'OMR' },
        { label: 'PAB', value: 'PAB' },
        { label: 'PEN', value: 'PEN' },
        { label: 'PGK', value: 'PGK' },
        { label: 'PHP', value: 'PHP' },
        { label: 'PKR', value: 'PKR' },
        { label: 'PLN', value: 'PLN' },
        { label: 'PYG', value: 'PYG' },
        { label: 'QAR', value: 'QAR' },
        { label: 'RON', value: 'RON' },
        { label: 'RSD', value: 'RSD' },
        { label: 'RUB', value: 'RUB' },
        { label: 'RWF', value: 'RWF' },
        { label: 'SAR', value: 'SAR' },
        { label: 'SBD', value: 'SBD' },
        { label: 'SCR', value: 'SCR' },
        { label: 'SDG', value: 'SDG' },
        { label: 'SEK', value: 'SEK' },
        { label: 'SGD', value: 'SGD' },
        { label: 'SHP', value: 'SHP' },
        { label: 'SLL', value: 'SLL' },
        { label: 'SOS', value: 'SOS' },
        { label: 'SRD', value: 'SRD' },
        { label: 'SSP', value: 'SSP' },
        { label: 'STN', value: 'STN' },
        { label: 'SYP', value: 'SYP' },
        { label: 'SZL', value: 'SZL' },
        { label: 'THB', value: 'THB' },
        { label: 'TJS', value: 'TJS' },
        { label: 'TMT', value: 'TMT' },
        { label: 'TND', value: 'TND' },
        { label: 'TOP', value: 'TOP' },
        { label: 'TRY', value: 'TRY' },
        { label: 'TTD', value: 'TTD' },
        { label: 'TWD', value: 'TWD' },
        { label: 'TZS', value: 'TZS' },
        { label: 'UAH', value: 'UAH' },
        { label: 'UGX', value: 'UGX' },
        { label: 'USD', value: 'USD' },
        { label: 'UYU', value: 'UYU' },
        { label: 'UZS', value: 'UZS' },
        { label: 'VES', value: 'VES' },
        { label: 'VND', value: 'VND' },
        { label: 'VUV', value: 'VUV' },
        { label: 'WST', value: 'WST' },
        { label: 'XAF', value: 'XAF' },
        { label: 'XCD', value: 'XCD' },
        { label: 'XOF', value: 'XOF' },
        { label: 'XPF', value: 'XPF' },
        { label: 'YER', value: 'YER' },
        { label: 'ZAR', value: 'ZAR' },
        { label: 'ZMW', value: 'ZMW' },
        { label: 'ZWL', value: 'ZWL' },
    ];
    // Annual Turnover state (for preview and form)
    const [turnover, setTurnover] = useState({
        "2024-2025": { amount: '', attachment: '', markets: '' },
        "2023-2024": { amount: '', attachment: '', markets: '' },
        "2022-2023": { amount: '', attachment: '', markets: '' },
    });


    // Checklist configuration state

    const [natureOfBusinessOptions, setNatureOfBusinessOptions] = useState([]);
    const [vendorTypeOptions, setVendorTypeOptions] = useState([]);
    useEffect(() => {
        const fetchVendorTypeOptions = async () => {
            try {
                const response = await axios.get(`${baseURL}/pms/suppliers/dropdowns`);
                const options = (response.data?.vendor_types || []).map(item => ({ label: item.name, value: item.value }));
                setVendorTypeOptions(options);
            } catch (error) {
                setVendorTypeOptions([]);
            }
        };
        fetchVendorTypeOptions();
    }, []);
    useEffect(() => {
        const fetchNatureOfBusiness = async () => {
            try {
                const response = await axios.get(`${baseURL}/pms/suppliers/dropdowns`);
                const options = (response.data?.nature_of_businesses || []).map(item => ({ label: item.name, value: item.value }));
                setNatureOfBusinessOptions(options);
            } catch (error) {
                setNatureOfBusinessOptions([]);
            }
        };
        fetchNatureOfBusiness();
    }, []);


    const [schemaGroupOptions, setSchemaGroupOptions] = useState([]);
    useEffect(() => {
        const fetchSchemaGroupOptions = async () => {
            try {
                const response = await axios.get(`${baseURL}/pms/suppliers/dropdowns`);
                const options = (response.data?.schema_groups || []).map(item => ({ label: item.name, value: item.value }));
                setSchemaGroupOptions(options);
            } catch (error) {
                setSchemaGroupOptions([]);
            }
        };
        fetchSchemaGroupOptions();
    }, []);

    const [gstinClassificationOptions, setGstinClassificationOptions] = useState([]);
    useEffect(() => {
        const fetchGstinClassificationOptions = async () => {
            try {
                const response = await axios.get(`${baseURL}/pms/suppliers/dropdowns`);
                const options = (response.data?.gst_classifications || []).map(item => ({ label: item.name, value: item.value }));
                setGstinClassificationOptions(options);
            } catch (error) {
                setGstinClassificationOptions([]);
            }
        };
        fetchGstinClassificationOptions();
    }, []);
    // console.log("applicable:", gstinClassificationOptions)

    // console.log("nature of business:",natureOfBusinessOptions)

    const navigate = useNavigate(); // Initialize navigate
    const fileInputRef = useRef(null);

    const { id } = useParams();
    // console.log("id:", id);
    const [supplierData, setSupplierData] = useState({});
    const [eInvoicingApplicable, setEInvoicingApplicable] = useState("");
    const [searchParams] = useSearchParams(); // Access query parameters
    const rekyc_id = searchParams.get("rekyc_id");
    const [rekycId, setRekycId] = useState(null);
    const [rekycType, setRekycType] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [contactNumber, setContactNumber] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [organizationName, setOrganizationName] = useState(""); // Pre-fill this from API on load
    const [statutoryDetails, setStatutoryDetails] = useState(null);
    const [rekycStatus, setRekycStatus] = useState(null);

    const [statutoryInputs, setStatutoryInputs] = useState({});
    const [statutoryErrors, setStatutoryErrors] = useState({});


    // ***********************************

    const [basicInfo, setBasicInfo] = useState({
        vendorOrganizationName: "",
        organizationType: "",
        cin: "",
        cinAttachment: null,
        cinAttachmentObj: null, // { filename, content, content_type, file_url }
        llp: "",
        llpAttachment: null,
        llpAttachmentObj: null, // { filename, content, content_type, file_url }
        natureOfBusiness: "",
        vendorType: "",
        industryType: "",
        typeOfWork: "",
        fullName: "",
        email: "",
        mobile: "",
        keyMarket: "",
        panNo: "",
        panAttachment: null,
        panAttachmentObj: null, // { filename, content, content_type, file_url }
        schemaGroup: "",
        dateOfIncorporation: "",
        gstinApplicable: "",
        gstinClassification: "",
        gstinNo: "",
        gstinAttachment: null,
        gstinAttachmentObj: null, // { filename, content, content_type, file_url }
        gstinDeclaration: null,
        gstinDeclarationObj: null, // { filename, content, content_type, file_url }
    });

    const updateBasicInfo = (field, value) => {
        setBasicInfo(prev => ({ ...prev, [field]: value }));
    };

    // Date handler for basicInfo date fields to prevent future dates
    const handleBasicInfoDateChange = (field, value) => {
        updateBasicInfo(field, value);

        const selected = value ? new Date(value) : null;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        setBasicInfoErrors(prev => {
            const copy = prev ? { ...prev } : {};
            if (selected && selected > today) {
                copy[field] = 'Date of Incorporation cannot be a future date.';
            } else {
                if (copy[field]) delete copy[field];
            }
            return copy;
        });
    };

    // console.log("basic info:", basicInfo)

    const gstinApplicableOptions = [
        { label: 'Yes', value: 'Yes' },
        { label: 'No', value: 'No' }
    ];
    const [gstinApplicable, setGstinApplicable] = useState('');
    // When GSTIN Applicable is 'No', auto-select 'Not Registered' for gstinClassification and disable the selector
    useEffect(() => {
        try {
            const raw = basicInfo.gstinApplicable;
            const isNo = raw === 'No' || raw === 0 || raw === '0' || (raw && raw.value === 'No') || (typeof raw === 'string' && raw.toLowerCase() === 'no');
            if (isNo) {
                const notReg = (gstinClassificationOptions || []).find(opt => String(opt.value) === String(6) || String(opt.label).toLowerCase() === 'not registered') || { label: 'Not Registered', value: 6 };
                if (!basicInfo.gstinClassification || String(basicInfo.gstinClassification.value) !== String(notReg.value)) {
                    setBasicInfo(prev => ({ ...prev, gstinClassification: notReg }));
                }
            } else {
                // if previously set to Not Registered but now GSTIN is applicable, clear it
                if (basicInfo.gstinClassification && String(basicInfo.gstinClassification.value) === String(6)) {
                    setBasicInfo(prev => ({ ...prev, gstinClassification: null }));
                }
            }
        } catch (e) {
            // silent
        }
    }, [basicInfo.gstinApplicable, gstinClassificationOptions]);
    const [emailOtp, setEmailOtp] = useState("");
    const [mobileOtp, setMobileOtp] = useState("");
    const [otpTimer, setOtpTimer] = useState(0); // seconds remaining for OTP resend

    const formatTimer = (s) => {
        const mm = Math.floor(s / 60);
        const ss = s % 60;
        return `${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
    };


    // Handler for Get OTP button
    const handleGetOtp = async () => {
        if (otpTimer > 0) return; // already waiting
        try {
            const response = await axios.post(`${baseURL}/pms/suppliers/${id}/generate_otp_api`);
            toast.success("OTP has been sent to your registered mobile number and email.");
            console.log("response otp:", response);
            // start 60s resend timer
            setOtpTimer(60);
        } catch (error) {
            toast.error('Failed to send OTP.');
        }
    };

    // Countdown effect for OTP timer
    useEffect(() => {
        if (otpTimer <= 0) return;
        const id = setInterval(() => {
            setOtpTimer(prev => {
                if (prev <= 1) {
                    clearInterval(id);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(id);
    }, [otpTimer]);

    // console.log("mail otp:", emailOtp)
    // console.log("mobile otp:", mobileOtp)
    // State to store supplier_id after OTP verification
    const [supplierId, setSupplierId] = useState(null);

    const handleOtpSubmit = async () => {
        if (!emailOtp && !mobileOtp) {
            toast.error("Please enter at least one OTP to proceed.");
            return;
        }
        // OTP must be 5 digits
        const otpRegex = /^\d{5}$/;
        if (emailOtp && !otpRegex.test(emailOtp)) {
            toast.error("Email OTP must be exactly 5 digits.");
            return;
        }
        if (mobileOtp && !otpRegex.test(mobileOtp)) {
            toast.error("Mobile OTP must be exactly 5 digits.");
            return;
        }

        setCompleted((arr) => {
            const copy = [...arr];
            copy[currentStep] = true;
            return copy;
        });
        // setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
        try {
            const response = await axios.post(
                `${baseURL}/pms/suppliers/${id}/verify_otp_api`,
                {
                    email_otp: emailOtp || null,
                    mobile_otp: mobileOtp || null,
                    rekyc_id: null
                },
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );

            // console.log("responce otp  verification:", response)
            if (response.status === 200 && response.data && response.data.message === "OTP verified successfully") {
                if (response.data.supplier_id) {
                    setSupplierId(response.data.supplier_id);
                }
                setCompleted((arr) => {
                    const copy = [...arr];
                    copy[currentStep] = true;
                    return copy;
                });
                setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
            } else {
                toast.error('OTP verification failed.');
            }

        } catch (error) {
            toast.error('OTP verification failed.');
        }
    };

    const [supplierShowData, setSupplierShowData] = useState(null);
    const [bankDetailsList, setBankDetailsList] = useState([]);
    // Show one empty bank detail card open initially
    useEffect(() => {
        if (bankDetailsList.length === 0) {
            setBankDetailsList([
                {
                    id: Date.now(),
                    bank_name: null,
                    address: null,
                    country_id: null,
                    state_id: null,
                    city_name: null,
                    pincode: null,
                    account_type: "",
                    account_number: null,
                    confirm_account_number: null,
                    branch_name: null,
                    micr_number: null,
                    ifsc_code: null,
                    benficary_name: null,
                    remark: null,
                    _destroy: "false",
                    isNew: true,
                    open: true,
                },
            ]);
        }
    }, [bankDetailsList.length]);
    useEffect(() => {
        const fetchSupplierShowData = async () => {
            try {
                const response = await axios.get(`${baseURL}/pms/suppliers/${id}/supplier_show.json`);
                setSupplierShowData(response.data);

                setBankDetailsList(response.data?.bank_details || [])
                // console.log("supplier show data:", response.data.bank_details)
                setStatutoryDetails(response.data?.statutory_details)

            } catch (error) {
                console.error('Error fetching supplier show data:', error);
            }
        };
        fetchSupplierShowData();
    }, []);
    // Supplier declaration questions fetched from API
    // console.log("bank details list:",bankDetailsList)
    const [supplierDeclarations, setSupplierDeclarations] = useState([]);

    useEffect(() => {
        if (supplierShowData?.supplier_declaration) {
            // clone to local state so we can edit selected_option and explanation
            setSupplierDeclarations(supplierShowData.supplier_declaration.map(d => ({ ...d })));
        }
    }, [supplierShowData]);

    // Reconcile address country/state values with canonical option objects
    // This runs when option lists change so selects display labels even if options load after supplierShowData mapping

    // Reconcile fallback GSTIN classification (or other selector fallbacks) with canonical option objects
    // This ensures the SingleSelector shows the option label (not a raw id) once options load asynchronously.
    useEffect(() => {
        try {
            if (!gstinClassificationOptions || gstinClassificationOptions.length === 0) return;
            const current = basicInfo.gstinClassification;
            if (!current) return;
            const currentVal = (typeof current === 'object' ? current.value : current);
            const match = (gstinClassificationOptions || []).find(opt => String(opt.value) === String(currentVal));
            // If we found a canonical option and it's not the same reference/label, update state
            if (match && (match !== current)) {
                setBasicInfo(prev => ({ ...prev, gstinClassification: match }));
            }
        } catch (e) {
            // silent
        }
    }, [gstinClassificationOptions, basicInfo.gstinClassification]);

    // General reconciliation: replace primitive ids in basicInfo with canonical option objects
    // once the corresponding options arrays load. This prevents selectors from rendering raw ids.


    const handleDeclarationOptionChange = (questionId, option) => {
        setSupplierDeclarations(prev => prev.map(d => d.question_id === questionId ? { ...d, selected_option: option.name, selected_option_id: option.value } : d));
        // clear declaration-level error when user answers a question
        setErrors(errPrev => {
            const copy = { ...errPrev };
            if (copy.declaration) delete copy.declaration;
            if (copy.declarationQuestions) {
                const dq = { ...copy.declarationQuestions };
                if (dq[questionId]) delete dq[questionId];
                // if no more per-question errors, remove the object
                if (Object.keys(dq).length === 0) delete copy.declarationQuestions;
                else copy.declarationQuestions = dq;
            }
            return copy;
        });
    };

    const handleDeclarationExplanationChange = (questionId, value) => {
        setSupplierDeclarations(prev => prev.map(d => d.question_id === questionId ? { ...d, explanation: value } : d));
        // clear declaration-level error when user types explanation
        setErrors(errPrev => {
            const copy = { ...errPrev };
            if (copy.declaration) delete copy.declaration;
            if (copy.declarationQuestions) {
                const dq = { ...copy.declarationQuestions };
                if (dq[questionId]) delete dq[questionId];
                if (Object.keys(dq).length === 0) delete copy.declarationQuestions;
                else copy.declarationQuestions = dq;
            }
            return copy;
        });
    };
    // console.log("statutory dedeatils***:", panAttachmentObj)


    // Map supplierShowData to basicInfo when supplierShowData changes
    useEffect(() => {
        if (!supplierShowData) return;
        // try to pick a matching option object for organizationType so SingleSelector shows it as selected
        const orgOption = (organizationTypeOptions || []).find(opt => String(opt.value) === String(supplierShowData.type_of_organization_id))
            || (supplierShowData.type_of_organization_id ? { value: supplierShowData.type_of_organization_id, label: supplierShowData.type_of_organization_name || String(supplierShowData.type_of_organization_id) } : null);

        // try to pick a matching option object for vendorType so SingleSelector shows it as selected
        const vendorOption = (vendorTypeOptions || []).find(opt => String(opt.value) === String(supplierShowData.supplier_type_id))
            || (supplierShowData.supplier_type_id ? { value: supplierShowData.supplier_type_id, label: supplierShowData.supplier_type_name || String(supplierShowData.supplier_type_id) } : null);

        // try to pick a matching option object for industryType so SingleSelector shows it as selected
        const industryOption = (industryTypeOptions || []).find(opt => String(opt.value) === String(supplierShowData.type_business_id))
            || (supplierShowData.type_business_id ? { value: supplierShowData.type_business_id, label: supplierShowData.type_business_name || String(supplierShowData.type_business_id) } : null);

        // Build PAN attachment object (if backend provides it)
        const panAttachmentRaw = Array.isArray(supplierShowData.pan_attachments) && supplierShowData.pan_attachments.length > 0 ? supplierShowData.pan_attachments[0] : null;
        const panAttachmentObj = panAttachmentRaw ? {
            filename: panAttachmentRaw.document_name || panAttachmentRaw.filename || null,
            // try common fields for a server-side path/url
            file_url: panAttachmentRaw.attachment_url ? `${baseURL}${panAttachmentRaw.attachment_url}` : (panAttachmentRaw.file_url || panAttachmentRaw.url || panAttachmentRaw.attachment_url || null)
        } : null;

        // Build GSTIN attachment object (if backend provides it) so UI can show existing file like PAN
        const gstAttachmentRaw = Array.isArray(supplierShowData.gstin_attachments) && supplierShowData.gstin_attachments.length > 0 ? supplierShowData.gstin_attachments[0] : null;
        // console.log("gst attachment raw:", gstAttachmentRaw)
        const gstinAttachmentObj = gstAttachmentRaw ? {
            filename: gstAttachmentRaw.document_name || gstAttachmentRaw.filename || null,
            file_url: gstAttachmentRaw.attachment_url ? `${baseURL}${gstAttachmentRaw.attachment_url}` : (gstAttachmentRaw.file_url || gstAttachmentRaw.url || gstAttachmentRaw.attachment_url || null)
        } : null;

        // Build CIN attachment object (try common possible keys) so UI can show existing CIN file
        const cinRaw1 = Array.isArray(supplierShowData.cin_number_attachments) && supplierShowData.cin_number_attachments.length > 0 ? supplierShowData.cin_number_attachments[0] : null;
        const cinRaw2 = Array.isArray(supplierShowData.cin_attachments) && supplierShowData.cin_attachments.length > 0 ? supplierShowData.cin_attachments[0] : null;
        const cinAttachmentRaw = cinRaw1 || cinRaw2 || null;
        const cinAttachmentObj = cinAttachmentRaw ? {
            filename: cinAttachmentRaw.document_name || cinAttachmentRaw.filename || null,
            file_url: cinAttachmentRaw.attachment_url ? `${baseURL}${cinAttachmentRaw.attachment_url}` : (cinAttachmentRaw.file_url || cinAttachmentRaw.url || cinAttachmentRaw.attachment_url || null)
        } : null;

        // Build LLP attachment object (try a few common keys)
        const llpRaw1 = Array.isArray(supplierShowData.llp_attachments) && supplierShowData.llp_attachments.length > 0 ? supplierShowData.llp_attachments[0] : null;
        const llpRaw2 = Array.isArray(supplierShowData.llp_number_attachments) && supplierShowData.llp_number_attachments.length > 0 ? supplierShowData.llp_number_attachments[0] : null;
        const llpAttachmentRaw = llpRaw1 || llpRaw2 || null;
        const llpAttachmentObj = llpAttachmentRaw ? {
            filename: llpAttachmentRaw.document_name || llpAttachmentRaw.filename || null,
            file_url: llpAttachmentRaw.attachment_url ? `${baseURL}${llpAttachmentRaw.attachment_url}` : (llpAttachmentRaw.file_url || llpAttachmentRaw.url || llpAttachmentRaw.attachment_url || null)
        } : null;

        // Normalize GSTIN applicable into the selector option shape (handles '0'/'1', boolean, 'Yes'/'No')
        const gstRaw = supplierShowData.gstin_applicable;
        // console.log("row gstin:", gstRaw)
        let gstinOption = null;
        if (gstRaw === true || String(gstRaw) === "1" || String(gstRaw).toLowerCase() === 'yes') {
            gstinOption = { label: 'Yes', value: 'Yes' };
        } else if (gstRaw === false || String(gstRaw) === "0" || String(gstRaw).toLowerCase() === 'no') {
            gstinOption = { label: 'No', value: 'No' };
        } else if (typeof gstRaw === 'string' && gstRaw) {
            // try to match existing options by value or label
            gstinOption = (gstinApplicableOptions || []).find(opt => String(opt.value) === gstRaw || String(opt.label).toLowerCase() === gstRaw.toLowerCase()) || null;
        }

        // Try to pick GSTIN Classification option object so SingleSelector shows it as selected
        const gstClassRaw = supplierShowData.gst_classification_id;
        const gstinClassOption = (gstinClassificationOptions || []).find(opt => String(opt.value) === String(gstClassRaw))
            || (gstClassRaw ? { value: gstClassRaw, label: supplierShowData.gst_classification_name || String(gstClassRaw) } : null);

        // Try to pick Nature of Business option object for preselection
        const natureRaw = supplierShowData.nature_of_business_id;
        const natureOption = (natureOfBusinessOptions || []).find(opt => String(opt.value) === String(natureRaw))
            || (natureRaw ? { value: natureRaw, label: supplierShowData.nature_of_business_name || String(natureRaw) } : null);

        // Try to pick Schema Group option object for preselection
        const schemaGroupRaw = supplierShowData.schema_group_id;
        const schemaGroupOption = (schemaGroupOptions || []).find(opt => String(opt.value) === String(schemaGroupRaw))
            || (schemaGroupRaw ? { value: schemaGroupRaw, label: supplierShowData.schema_group_name || String(schemaGroupRaw) } : null);

        setBasicInfo(prev => ({
            ...prev,
            vendorOrganizationName: supplierShowData.organization_name || "",
            organizationType: orgOption,
            vendorType: vendorOption,
            industryType: industryOption,
            panAttachmentObj: panAttachmentObj,
            gstinApplicable: gstinOption,
            typeOfWork: supplierShowData.type_of_work || "",
            keyMarket: supplierShowData.key_market || "",
            cin: supplierShowData.cin_number || "",
            panNo: supplierShowData.pan_number || "",
            fullName: supplierShowData.full_name || "",
            email: supplierShowData.email || "",
            mobile: supplierShowData.mobile || "",
            dateOfIncorporation: supplierShowData.date_of_incorporation || "",
            schemaGroup: schemaGroupOption,
            gstinNo: supplierShowData.gstin || "",
            // gstinApplicable: supplierShowData.gstin_applicable || "",
            // Add more mappings as needed
            llp: supplierShowData.llp_number || "",
            natureOfBusiness: natureOption,
            gstinClassification: gstinClassOption,
            // Attach existing GSTIN attachment for UI display
            gstinAttachmentObj: gstinAttachmentObj,
            // Attach existing CIN and LLP attachments for UI display
            cinAttachmentObj: cinAttachmentObj,
            llpAttachmentObj: llpAttachmentObj,
            // Attachments: just set filenames for now (handle upload separately)
            // panAttachment: supplierShowData.pan_attachments?.[0]?.document_name || null,
            // gstinAttachment: supplierShowData.gstin_attachments?.[0]?.document_name || null,
            cinAttachment: cinAttachmentRaw?.document_name || cinAttachmentRaw?.filename || null,
            llpAttachment: llpAttachmentRaw?.document_name || llpAttachmentRaw?.filename || null,
            // gstinDeclaration: supplierShowData.gstin_declaration_attachments?.[0]?.document_name || null,
            // ...other fields as needed
        }));

        // Map questions (expertise, structure) from supplierShowData if provided
        try {
            setQuestions(prev => ({
                ...prev,
                expertise: supplierShowData.que1 || supplierShowData.que_1 || supplierShowData.expertise || prev.expertise || '',
                structure: supplierShowData.que2 || supplierShowData.que_2 || supplierShowData.structure || prev.structure || ''
            }));
        } catch (e) {
            // ignore if supplierShowData doesn't contain these keys
        }
        // Map a few additionalDetails fields from supplierShowData so they appear preselected
        try {
            const amcRaw = supplierShowData.amc_provided;
            let amcOption = null;
            if (amcRaw === true || String(amcRaw) === '1' || String(amcRaw).toLowerCase() === 'yes') {
                amcOption = { label: 'Yes', value: 'Yes' };
            } else if (amcRaw === false || String(amcRaw) === '0' || String(amcRaw).toLowerCase() === 'no') {
                amcOption = { label: 'No', value: 'No' };
            }

            // MSME/Udyam applicable mapping (supplierShowData may have 'msme' or similar)
            const msmeRaw = supplierShowData.msme || supplierShowData.msme_applicable || supplierShowData.msmeUdyamApplicable;
            let msmeOption = null;
            if (msmeRaw === true || String(msmeRaw) === '1' || String(msmeRaw).toLowerCase() === 'yes') {
                msmeOption = { label: 'Yes', value: 'Yes' };
            } else if (msmeRaw === false || String(msmeRaw) === '0' || String(msmeRaw).toLowerCase() === 'no') {
                msmeOption = { label: 'No', value: 'No' };
            }

            // Enterprise / MSME type mapping (if supplier provides an id or name)
            const enterpriseRaw = supplierShowData.enterprise;
            const enterpriseOption = (typeof enterpriseRaw !== 'undefined' && enterpriseRaw !== null)
                ? ((optionsEnterPrise || []).find(opt => String(opt.value) === String(enterpriseRaw)) || (enterpriseRaw ? { value: enterpriseRaw, label: supplierShowData.enterprise_name || String(enterpriseRaw) } : null))
                : null;

            // Build MSME attachment object (if provided by backend) so UI can show existing file
            const msmeAttachmentRaw = Array.isArray(supplierShowData.msme_attachments) && supplierShowData.msme_attachments.length > 0 ? supplierShowData.msme_attachments[0] : null;
            const msmeAttachmentObj = msmeAttachmentRaw ? {
                filename: msmeAttachmentRaw.document_name || msmeAttachmentRaw.filename || null,
                file_url: msmeAttachmentRaw.attachment_url ? `${baseURL}${msmeAttachmentRaw.attachment_url}` : (msmeAttachmentRaw.file_url || msmeAttachmentRaw.url || msmeAttachmentRaw.attachment_url || null)
            } : null;

            // Build MSME declaration attachment if present
            const msmeDeclRaw = Array.isArray(supplierShowData.msme_declaration_attachments) && supplierShowData.msme_declaration_attachments.length > 0 ? supplierShowData.msme_declaration_attachments[0] : null;
            const msmeDeclarationObj = msmeDeclRaw ? {
                filename: msmeDeclRaw.document_name || msmeDeclRaw.filename || null,
                file_url: msmeDeclRaw.attachment_url ? `${baseURL}${msmeDeclRaw.attachment_url}` : (msmeDeclRaw.file_url || msmeDeclRaw.url || msmeDeclRaw.attachment_url || null)
            } : null;

            // Build E-Invoice declaration attachment (if provided by backend) so UI can show existing file
            const einvoiceRaw1 = Array.isArray(supplierShowData.einvoicing_attachments) && supplierShowData.einvoicing_attachments.length > 0 ? supplierShowData.einvoicing_attachments[0] : (Array.isArray(supplierShowData.einvoice_attachments) && supplierShowData.einvoice_attachments.length > 0 ? supplierShowData.einvoice_attachments[0] : null);
            const einvoiceDeclarationObj = einvoiceRaw1 ? {
                filename: einvoiceRaw1.document_name || einvoiceRaw1.filename || null,
                file_url: einvoiceRaw1.attachment_url ? `${baseURL}${einvoiceRaw1.attachment_url}` : (einvoiceRaw1.file_url || einvoiceRaw1.url || einvoiceRaw1.attachment_url || null)
            } : null;

            // Einvoicing mapping (backend may use 'einvoicing' or 'einvoice')
            const einvoiceRaw = supplierShowData.einvoicing || supplierShowData.einvoice || supplierShowData.einvoicing_applicable;
            let einvoiceOption = null;
            if (einvoiceRaw === true || String(einvoiceRaw) === '1' || String(einvoiceRaw).toLowerCase() === 'yes') {
                einvoiceOption = { label: 'Yes', value: 'Yes' };
            } else if (einvoiceRaw === false || String(einvoiceRaw) === '0' || String(einvoiceRaw).toLowerCase() === 'no') {
                einvoiceOption = { label: 'No', value: 'No' };
            }

            // Map classification year and major activity into option objects when possible
            const classRaw = supplierShowData.classification_year || supplierShowData.classificationYear;
            let classificationOption = null;
            if (typeof classRaw !== 'undefined' && classRaw !== null && classRaw !== '') {
                classificationOption = (optionsClassificationYear || []).find(opt => String(opt.value) === String(classRaw) || String(opt.label).toLowerCase() === String(classRaw).toLowerCase()) || (typeof classRaw === 'string' ? { value: classRaw, label: String(classRaw) } : classRaw);
            }

            const majorRaw = supplierShowData.major_activity || supplierShowData.majorActivity;
            let majorOption = null;
            if (typeof majorRaw !== 'undefined' && majorRaw !== null && majorRaw !== '') {
                majorOption = (optionsMajorActivity || []).find(opt => String(opt.value) === String(majorRaw) || String(opt.label).toLowerCase() === String(majorRaw).toLowerCase()) || (typeof majorRaw === 'string' ? { value: majorRaw, label: String(majorRaw) } : majorRaw);
            }

            setAdditionalDetails(prev => ({
                ...prev,
                deliveryLeadPeriod: supplierShowData.delivery_lead_period || prev.deliveryLeadPeriod || "",
                warrantyPeriod: supplierShowData.specify_warranty_period || prev.warrantyPeriod || "",
                amcProvided: amcOption !== null ? amcOption : prev.amcProvided,
                website: supplierShowData.website || prev.website || "",
                // MSME fields
                msmeUdyamApplicable: msmeOption !== null ? msmeOption : prev.msmeUdyamApplicable,
                msmeNo: supplierShowData.msme_no || prev.msmeNo || "",
                validFrom: supplierShowData.valid_from || prev.validFrom || "",
                validTill: supplierShowData.valid_till || prev.validTill || "",
                msmeEnterpriseType: enterpriseOption || prev.msmeEnterpriseType,
                // Classification year and major activity (preselect if API provides values)
                classificationYear: classificationOption || prev.classificationYear || null,
                majorActivity: majorOption || prev.majorActivity || null,
                // Attach MSME files for UI (existing server file shown via file_url)
                msmeAttachmentObj: msmeAttachmentObj || prev.msmeAttachmentObj,
                msmeDeclarationObj: msmeDeclarationObj || prev.msmeDeclarationObj,
                // Preselect e-invoice declaration from supplier data (server file)
                einvoiceDeclaration: einvoiceDeclarationObj || prev.einvoiceDeclaration,
                // Einvoicing option
                einvoice: einvoiceOption !== null ? einvoiceOption : prev.einvoice,
            }));
        } catch (e) {
            // ignore mapping errors
        }
        // Map office (registered) and communication addresses from API to local address states
        try {
            const office = supplierShowData.office_address || supplierShowData.officeAddress || supplierShowData.registered_address || supplierShowData.office;
            if (office) {
                // support multiple possible id keys from backend (pms_country_id, country_id, etc.)
                const officeCountryId = office.pms_country_id || office.country_id || office.countryId || null;
                const officeCountry = officeCountryId ? ((countryOptions || []).find(opt => String(opt.value) === String(officeCountryId)) || { value: officeCountryId, label: office.country_name || office.country || '' }) : null;

                // support multiple possible state id keys and search both state lists (registered/comm) as a fallback
                const officeStateId = office.pms_state_id || office.state_id || office.stateId || null;
                const officeState = officeStateId ? (
                    (stateOptions || []).find(opt => String(opt.value) === String(officeStateId))
                    || (commStateOptions || []).find(opt => String(opt.value) === String(officeStateId))
                    || { value: officeStateId, label: office.state_name || office.state || '' }
                ) : null;
                setRegisteredAddress(prev => ({
                    ...prev,
                    id: office.id,
                    address1: office.address || office.address_line_two || office.address_line_one || prev.address1 || '',
                    address2: office.address_line_two || office.address_line_three || prev.address2 || '',
                    address3: office.address_line_three || office.address_line_four || prev.address3 || '',
                    address4: office.address_line_four || office.address_line_five || prev.address4 || '',
                    address5: office.address_line_five || prev.address5 || '',
                    country: officeCountry,
                    state: officeState,
                    city: office.city_name || office.city || prev.city || '',
                    pincode: office.pin_code || office.pin_code || office.pinCode || prev.pincode || '',
                    telephone: office.telephone_number || office.tel_number || prev.telephone || '',
                    mobile: office.mobile || prev.mobile || '',
                    orderingEmail: office.email || prev.orderingEmail || '',
                    billingEmail: office.email || prev.billingEmail || '',
                }));
            }

            const comm = supplierShowData.communication_address || supplierShowData.communicationAddress || supplierShowData.communication;
            if (comm) {
                // support multiple possible id keys from backend for country/state
                const commCountryId = comm.pms_country_id || comm.country_id || comm.countryId || null;
                const commCountry = commCountryId ? ((countryOptions || []).find(opt => String(opt.value) === String(commCountryId)) || { value: commCountryId, label: comm.country_name || comm.country || '' }) : null;

                const commStateId = comm.pms_state_id || comm.state_id || comm.stateId || null;
                const commState = commStateId ? (
                    (commStateOptions || []).find(opt => String(opt.value) === String(commStateId))
                    || (stateOptions || []).find(opt => String(opt.value) === String(commStateId))
                    || { value: commStateId, label: comm.state_name || comm.state || '' }
                ) : null;
                setCommunicationAddress(prev => ({
                    ...prev,
                    id: comm.id,
                    idPre: comm.id,
                    address1: comm.address || comm.address_line_two || prev.address1 || '',
                    address2: comm.address_line_two || comm.address_line_three || prev.address2 || '',
                    address3: comm.address_line_three || comm.address_line_four || prev.address3 || '',
                    address4: comm.address_line_four || comm.address_line_five || prev.address4 || '',
                    address5: comm.address_line_five || prev.address5 || '',
                    country: commCountry,
                    state: commState,
                    city: comm.city_name || comm.city || prev.city || '',
                    pincode: comm.pin_code || comm.pinCode || prev.pincode || '',
                    telephone: comm.telephone_number || comm.telephone_number || prev.telephone || '',
                    mobile: comm.mobile || prev.mobile || '',
                    orderingEmail: comm.email || prev.orderingEmail || '',
                }));
            }
        } catch (err) {
            // ignore address mapping errors
        }
        // Map branch offices from API to local branchOffices state
        if (Array.isArray(supplierShowData.branch_offices) && supplierShowData.branch_offices.length > 0) {
            const mappedBranches = supplierShowData.branch_offices.map(b => ({
                idPre: b.id,
                id: b.id || Date.now() + Math.random(),
                address: b.address || "",
                // Prefer to pick the canonical option object from countryOptions/stateOptions by id so selectors show labels
                country: b.country_id ? ((countryOptions || []).find(opt => String(opt.value) === String(b.country_id)) || { value: b.country_id, label: b.country_name || String(b.country_id) }) : null,
                state: b.state_id ? ((stateOptions || []).find(opt => String(opt.value) === String(b.state_id)) || { value: b.state_id, label: b.state_name || String(b.state_id) }) : null,
                city: b.city_name || b.city || "",
                pincode: b.pin_code || b.pincode || null,
                telephone: b.tel_number || b.telephone || "",
                mobile: b.mobile || "",
                isNew: false,
            }));

            setBranchOffices(mappedBranches);
        }
        // Map directors_informations (from API) to local owners state
        if (Array.isArray(supplierShowData.directors_informations) && supplierShowData.directors_informations.length > 0) {
            const mappedOwners = supplierShowData.directors_informations.map(d => {
                // Normalize designation into option object so SingleSelector shows label
                const designation = (typeof d.designation_id !== 'undefined' && d.designation_id !== null)
                    ? ((designationOptions || []).find(opt => String(opt.value) === String(d.designation_id))
                        || { value: d.designation_id, label: d.designation_name || String(d.designation_id) })
                    : null;

                // Normalize qualification into option object when possible
                const qualification = d.qualification && String(d.qualification).trim() !== ''
                    ? ((qualificationOptions || []).find(opt => String(opt.value) === String(d.qualification) || String(opt.label) === String(d.qualification))
                        || { value: d.qualification, label: d.qualification })
                    : null;
                // Normalize attachment value (backend may provide a string path or an object)
                // let attachmentVal = null;
                // const rawAtt = d.attachment || d.attachment_url || d.file_url || d.document_path || d.document || null;
                // if (rawAtt) {
                //     if (typeof rawAtt === 'string') {
                //         attachmentVal = rawAtt;
                //     } else if (rawAtt.document_name || rawAtt.filename || rawAtt.file_url || rawAtt.url) {
                //         attachmentVal = rawAtt.document_name || rawAtt.filename || rawAtt.file_url || rawAtt.url;
                //     }
                // }

                return ({
                    idPre: d.id,
                    id: d.id || Date.now() + Math.random(),
                    firstName: d.first_name || "",
                    lastName: d.last_name || "",
                    designation: designation,
                    qualification: qualification,
                    experience: d.experience || "",
                    email: d.email || "",
                    mobile: d.mobile || "",
                    attachment: d.attachment || null,
                    isNew: false,
                });
            });

            setOwners(mappedOwners);
        }
        // Map major_customers from API to local majorCustomers state
        if (Array.isArray(supplierShowData.major_customers) && supplierShowData.major_customers.length > 0) {
            const mappedCustomers = supplierShowData.major_customers.map(c => {
                const countryOption = countryOptions.find(opt => Number(opt.value) === Number(c.country_id)) || countryOptions.find(opt => opt.value === c.country_id) || (c.country_id ? { value: c.country_id, label: '' } : null);
                return ({
                    idPre: c.id,
                    id: c.id || null,
                    // Map site type from API if present so the radio shows correctly ('working'|'previous')
                    siteType: c.site_type || c.siteType || '',
                    stageOfProject: c.stage_of_project || "",
                    companyName: c.name || c.company_name || '',
                    companyId: c.company_id || null,
                    workDone: c.work_done || '',
                    contactPerson: c.contact_person || '',
                    designation: c.designation_id ? (designationOptions.find(opt => opt.value === c.designation_id) || { value: c.designation_id, label: '' }) : null,
                    country: countryOption,
                    phone: c.phone || c.phone_number || '',
                    mobile: c.mobile || '',
                    yearOfAssociation: c.years_of_association || '',
                    serviceFrom: c.service_provided_from || c.serviceFrom || '',
                    serviceTo: c.service_provided_to || c.serviceTo || '',
                    businessLast12Months: c.turn_over || c.turnover || '',
                    stageOfProject: c.stage_of_project || c.stageOfProject || '',
                    majorCompetitors: c.major_competitors || '',
                    attachment: c.attachment || null,
                    isNew: false,
                });
            });

            setMajorCustomers(mappedCustomers);
        }

        // Map factory_warehouses from API to local warehouses state
        if (Array.isArray(supplierShowData.factory_warehouses) && supplierShowData.factory_warehouses.length > 0) {
            const mappedWarehouses = supplierShowData.factory_warehouses.map(w => {
                const countryOpt = w.country_id ? ((countryOptions || []).find(opt => String(opt.value) === String(w.country_id)) || { value: w.country_id, label: w.country_name || String(w.country_id) }) : null;
                const stateOpt = w.state_id ? ((stateOptions || []).find(opt => String(opt.value) === String(w.state_id)) || { value: w.state_id, label: w.state_name || String(w.state_id) }) : null;

                // // Normalize attachment value (backend may provide a string path or an object)
                // let attachmentVal = null;
                // const rawAtt = w.attachment || w.attachment_url || w.file_url || w.document_path || w.document || null;
                // if (rawAtt) {
                //     if (typeof rawAtt === 'string') {
                //         attachmentVal = rawAtt;
                //     } else if (rawAtt.document_name || rawAtt.filename || rawAtt.file_url || rawAtt.url) {
                //         attachmentVal = rawAtt.document_name || rawAtt.filename || rawAtt.file_url || rawAtt.url;
                //     }
                // }

                // console.log("mapped warehouse", attachmentVal)
                return {
                    idPre: w.id,
                    id: w.id || Date.now() + Math.random(),
                    address: w.address || '',
                    country: countryOpt,
                    state: stateOpt,
                    city: w.city_name || w.city || '',
                    pincode: w.pin_code || w.pincode || '',
                    telephone: w.tel_number || w.telephone || '',
                    mobile: w.mobile || '',
                    contactPerson: w.contact_person || '',
                    contactPersonEmail: w.contact_person_email || '',
                    attachment: w.attachment,
                    isNew: false,
                };
            });

            setWarehouses(mappedWarehouses);
        }

        // Map contact_people from API to local contactPersons state
        if (Array.isArray(supplierShowData.contact_people) && supplierShowData.contact_people.length > 0) {
            const mappedContacts = supplierShowData.contact_people.map(cp => {
                // Escalation level: try to match canonical option by value or label
                const escalation = (escalationLevelOptions || []).find(opt => String(opt.value) === String(cp.escalation_level) || String(opt.label) === String(cp.escalation_level))
                    || (cp.escalation_level ? { label: cp.escalation_level, value: cp.escalation_level } : null);

                // Name title: try to match by id or label; fallback to provided id/string
                const nameTitle = (nameTitleOptions || []).find(opt => String(opt.value) === String(cp.name_title_id) || String(opt.label) === String(cp.name_title))
                    || (typeof cp.name_title_id !== 'undefined' && cp.name_title_id !== null ? { value: cp.name_title_id, label: cp.name_title || String(cp.name_title_id) } : (cp.name_title ? { value: cp.name_title, label: cp.name_title } : null));

                // Designation: match against fetched designationOptions if available
                const designation = (designationOptions || []).find(opt => String(opt.value) === String(cp.designation_id))
                    || (cp.designation_id ? { value: cp.designation_id, label: cp.designation_name || String(cp.designation_id) } : null);

                const nationality = cp.nationality_string ? { label: cp.nationality_string, value: cp.nationality_string } : null;
                // Normalize attachment value (backend may provide a string path or an object)
                // let attachmentVal = null;
                // const rawAtt = cp.attachment || cp.attachment_url || cp.file_url || cp.document_path || cp.document || null;
                // if (rawAtt) {
                //     if (typeof rawAtt === 'string') {
                //         attachmentVal = rawAtt;
                //     } else if (rawAtt.document_name || rawAtt.filename || rawAtt.file_url || rawAtt.url) {
                //         attachmentVal = rawAtt.document_name || rawAtt.filename || rawAtt.file_url || rawAtt.url;
                //     }
                // }

                return {
                    idPre: cp.id,
                    id: cp.id || Date.now() + Math.random(),
                    escalationLevel: escalation,
                    nameTitle: nameTitle,
                    firstName: cp.first_name || '',
                    middleName: cp.middle_name || '',
                    lastName: cp.last_name || '',
                    designation: designation,
                    primaryEmail: cp.primary_email || '',
                    secondaryEmail: cp.secondary_email || '',
                    primaryMobile: cp.primary_mobile || '',
                    secondaryMobile: cp.secondary_mobile || '',
                    nationality: nationality,
                    dob: cp.birth_date || cp.dob || '',
                    attachment: cp.attachment || null,
                    isNew: false,
                };
            });

            setContactPersons(mappedContacts);
        }
        // Map annual_turnovers from API to local annualTurnover state (normalize and pick best per year)
        if (Array.isArray(supplierShowData.annual_turnovers) && supplierShowData.annual_turnovers.length > 0) {
            const mappedTurnovers = supplierShowData.annual_turnovers.map(a => {
                // const rawAtt = a.attachment || a.attachment_url || a.file_url || a.document_path || a.document || null;
                // let attachmentVal = null;
                // if (rawAtt) {
                //     if (typeof rawAtt === 'string') {
                //         // backend returned a string path
                //         attachmentVal = rawAtt;
                //     } else if (rawAtt.document_name || rawAtt.filename || rawAtt.file_url || rawAtt.url) {
                //         attachmentVal = {
                //             filename: rawAtt.document_name || rawAtt.filename || rawAtt.name || null,
                //             file_url: rawAtt.attachment_url ? `${baseURL}${rawAtt.attachment_url}` : (rawAtt.file_url || rawAtt.url || rawAtt.attachment_url || null)
                //         };
                //     }
                // }

                return {
                    idPre: a.id,
                    id: a.id || Date.now() + Math.random(),
                    year: a.financial_year || a.financial_year_display || String(a.financial_year) || '',
                    turnover: a.turnover || a.turnover_value || null,
                    keyMarkets: a.key_markets || a.key_market || a.keyMarkets || '',
                    attachment: a.attachment || null,
                    isNew: false,
                };
            });

            const extractYearNumber = (yr) => {
                if (!yr) return 0;
                try {
                    const s = String(yr);
                    const matches = s.match(/(\d{4})/g);
                    if (matches && matches.length > 0) {
                        return Math.max(...matches.map(m => parseInt(m, 10)));
                    }
                    const n = parseInt(s, 10);
                    return isNaN(n) ? 0 : n;
                } catch (e) {
                    return 0;
                }
            };

            // Group by year number and pick the best record per year (prefer non-null turnover)
            const groups = {};
            mappedTurnovers.forEach(rec => {
                const y = extractYearNumber(rec.year) || 0;
                if (!groups[y]) groups[y] = [];
                groups[y].push(rec);
            });

            const bestPerYear = Object.keys(groups).map(k => {
                const list = groups[k];
                let chosen = list.find(x => x.turnover !== undefined && x.turnover !== null && String(x.turnover).trim() !== '');
                if (!chosen) {
                    chosen = list.slice().sort((a, b) => Number(b.idPre || b.id || 0) - Number(a.idPre || a.id || 0))[0];
                }
                return { yearNum: Number(k), record: chosen };
            }).sort((a, b) => b.yearNum - a.yearNum);

            const topThree = bestPerYear.slice(0, 3).map(x => x.record);

            const currentYear = new Date().getFullYear();
            const rows = [];
            for (let i = 0; i < 3; i++) {
                const rec = topThree[i];
                if (rec) {
                    const ynum = extractYearNumber(rec.year) || (currentYear - i);
                    const yearLabel = String(rec.year) && String(rec.year).includes('-') ? String(rec.year) : `${ynum}-${ynum + 1}`;
                    rows.push({ ...rec, year: yearLabel });
                } else {
                    const ynum = currentYear - i;
                    rows.push({ year: `${ynum}-${ynum + 1}`, turnover: '', attachment: null, keyMarkets: '' });
                }
            }

            setAnnualTurnover(rows);
        }
    }, [supplierShowData]);





    // Additional Vendor Details state (all fields in one object)
    const [additionalDetails, setAdditionalDetails] = useState({
        deliveryLeadPeriod: "",
        warrantyPeriod: "",
        amcProvided: null,
        website: "",
        currencyType: { label: 'INR', value: 'INR' },
        msmeUdyamApplicable: null,
        einvoice: null,
        einvoiceDeclaration: null,
        msmeNo: "",
        classificationYear: null,
        majorActivity: null,
        validFrom: "",
        validTill: "",
        msmeEnterpriseType: null,
        msmeAttachmentObj: null,
        msmeDeclarationObj: null,
    });

    // Helper to update additional details fields
    const updateAdditionalDetails = (field, value) => {
        // If classificationYear is chosen, auto-fill validFrom and validTill
        if (field === 'classificationYear') {
            // value may be an object { label, value } or a string like '2021-22'
            const yearValue = value && typeof value === 'object' ? value.value : value;
            if (yearValue && typeof yearValue === 'string') {
                // Expect format like '2021-22' or '2023-24'
                const parts = yearValue.split('-');
                if (parts.length === 2) {
                    const startYear = parseInt(parts[0], 10);
                    const endYearPart = parts[1];
                    // Handle '21' or '2022' style; prefer 4-digit startYear already parsed
                    const validFrom = `${startYear}-04-01`;
                    // If end part is 2-digit, convert to full year
                    let endYear = parts[1].length === 2 ? (startYear >= 2000 ? startYear + parseInt(endYearPart, 10) - (startYear % 100) : startYear + parseInt(endYearPart, 10)) : parseInt(endYearPart, 10);
                    if (isNaN(endYear)) {
                        // fallback: next year
                        endYear = startYear + 1;
                    }
                    const validTill = `${endYear}-03-31`;
                    setAdditionalDetails(prev => ({ ...prev, classificationYear: value, validFrom, validTill }));
                    return;
                }
            }
            // fallback
            setAdditionalDetails(prev => ({ ...prev, classificationYear: value }));
            return;
        }

        setAdditionalDetails(prev => ({ ...prev, [field]: value }));
    };

    // console.log("additional details:", additionalDetails)


    const [organizationTypeOptions, setOrganizationTypeOptions] = useState([]);
    useEffect(() => {
        const fetchOrganizationTypes = async () => {
            try {
                const response = await axios.get(`${baseURL}/pms/suppliers/type_of_organization_list`);
                const options = (response.data?.type_of_organizations || []).map(item => ({ label: item.name, value: item.value }));
                setOrganizationTypeOptions(options);
            } catch (error) {
                console.error('Error fetching organization types:', error);
            }
        };
        fetchOrganizationTypes();
    }, []);

    const [industryTypeOptions, setIndustryTypeOptions] = useState([]);
    useEffect(() => {
        const fetchIndustryTypes = async () => {
            try {
                const response = await axios.get(`${baseURL}/pms/suppliers/type_of_industry_list`);
                const options = (response.data?.type_of_industry || []).map(item => ({ label: item.name, value: item.value }));
                setIndustryTypeOptions(options);
            } catch (error) {
                console.error('Error fetching industry types:', error);
            }
        };
        fetchIndustryTypes();
    }, []);

    // Validation state for basic info
    const [basicInfoErrors, setBasicInfoErrors] = useState({});

    // List of required fields for step 1 (Basic Information)
    const requiredBasicInfoFields = [
        'vendorOrganizationName',
        'organizationType',
        'natureOfBusiness',
        'vendorType',
        'industryType',
        'typeOfWork',
        'fullName',
        'email',
        'mobile',
        'keyMarket',
        'panNo',
        // 'panAttachment',
        'schemaGroup',
        // 'dateOfIncorporation',
        // Add more as needed
    ];

    // Validation function for step 1

    // console.log("pan att:",basicInfo.panAttachment)
    // console.log("gst att:",basicInfo.gstinAttachment)

    // ...existing code...




    // ...existing code...

    const validateBasicInfo = () => {
        // Validate basic info fields
        const errors = {};

        if (isSectionVisible('Basic Details')) {
            requiredBasicInfoFields.forEach(field => {
                if (!basicInfo[field] || (typeof basicInfo[field] === 'object' && !basicInfo[field]?.value && !basicInfo[field]?.label)) {
                    errors[field] = 'This field is required.';
                }
            });

            // GSTIN Applicable validation (required)
            if (!basicInfo.gstinApplicable || (typeof basicInfo.gstinApplicable === 'object' && !basicInfo.gstinApplicable.value && !basicInfo.gstinApplicable.label)) {
                errors.gstinApplicable = 'This field is required.';
            }

            // Conditional GSTIN fields validation
            const gstinApplicableLabel = basicInfo.gstinApplicable?.label || basicInfo.gstinApplicable;
            if (gstinApplicableLabel === 'Yes') {
                if (!basicInfo.gstinNo) {
                    errors.gstinNo = 'This field is required.';
                } else {
                    // GSTIN format: 15 chars, e.g. 22AAAAA0000A1Z5
                    const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
                    if (!gstinRegex.test(basicInfo.gstinNo)) {
                        errors.gstinNo = 'Invalid GSTIN format. Example: 22AAAAA0000A1Z5';
                    }
                }
                if (!basicInfo.gstinAttachmentObj) {
                    errors.gstinAttachment = 'This field is required.';
                }
            } else if (gstinApplicableLabel === 'No') {
                if (!basicInfo.gstinDeclarationObj) {
                    errors.gstinDeclaration = 'This field is required.';
                }
            }

            // Special case: if organizationType is Public/Private Limited, CIN and attachment required
            const orgType = basicInfo.organizationType?.label || basicInfo.organizationType;
            if (orgType === 'Public Limited' || orgType === 'Private Limited') {
                if (!basicInfo.cin) {
                    errors.cin = 'This field is required';
                } else {
                    // CIN must be 21 alphanumeric characters
                    const cinValue = basicInfo.cin.trim();
                    if (!/^[A-Za-z0-9]{21}$/.test(cinValue)) {
                        errors.cin = 'CIN must be 21 alphanumeric characters.';
                    }
                }
                if (!basicInfo.cinAttachmentObj) errors.cinAttachment = 'This field is required';
            }

            // Special case: if organizationType is Limited Liability Partnership (LLP), LLP No. and attachment required
            if (orgType === 'Limited Liability Partnership (LLP)') {
                if (!basicInfo.llp) {
                    errors.llp = 'This field is required.';
                } else {
                    // LLP must be in the format AAR-1165
                    const llpValue = basicInfo.llp.trim();
                    if (!/^[A-Z]{3}-\d{4}$/.test(llpValue)) {
                        errors.llp = 'LLP must be in the format AAR-1165.';
                    }
                }
                if (!basicInfo.llpAttachmentObj) errors.llpAttachment = 'This field is required.';
            }

            // Date of Incorporation should not be a future date (if provided)
            if (basicInfo.dateOfIncorporation) {
                const sel = new Date(basicInfo.dateOfIncorporation);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                if (sel > today) {
                    errors.dateOfIncorporation = 'Date of Incorporation cannot be a future date.';
                }
            }

            // console.log("errors***************:", errors)
            setBasicInfoErrors(errors);
        }


        const additionalErrors = {};
        if (isSectionVisible('additional vendor details')) {
            // --- Additional Vendor Details validation (for * fields) ---

            // Currency Type required
            if (!additionalDetails.currencyType || (typeof additionalDetails.currencyType === 'object' && !additionalDetails.currencyType.value && !additionalDetails.currencyType.label)) {
                additionalErrors.currencyType = 'This field is required.';
            }

            // MSME/Udyam Number Applicable required
            if (!additionalDetails.msmeUdyamApplicable || (typeof additionalDetails.msmeUdyamApplicable === 'object' && !additionalDetails.msmeUdyamApplicable.value && !additionalDetails.msmeUdyamApplicable.label)) {
                additionalErrors.msmeUdyamApplicable = 'This field is required.';
            }

            // If MSME/Udyam is Yes, validate all required fields
            if (additionalDetails.msmeUdyamApplicable?.value === 'Yes') {
                if (!additionalDetails.msmeNo) additionalErrors.msmeNo = 'This field is required.';
                if (!additionalDetails.classificationYear || (typeof additionalDetails.classificationYear === 'object' && !additionalDetails.classificationYear.value && !additionalDetails.classificationYear.label)) {
                    additionalErrors.classificationYear = 'This field is required.';
                }
                if (!additionalDetails.majorActivity || (typeof additionalDetails.majorActivity === 'object' && !additionalDetails.majorActivity.value && !additionalDetails.majorActivity.label)) {
                    additionalErrors.majorActivity = 'This field is required.';
                }
                if (!additionalDetails.validFrom) additionalErrors.validFrom = 'This field is required.';
                if (!additionalDetails.validTill) additionalErrors.validTill = 'This field is required.';
                if (!additionalDetails.msmeEnterpriseType || (typeof additionalDetails.msmeEnterpriseType === 'object' && !additionalDetails.msmeEnterpriseType.value && !additionalDetails.msmeEnterpriseType.label)) {
                    additionalErrors.msmeEnterpriseType = 'This field is required.';
                }
                if (!additionalDetails.msmeAttachmentObj) additionalErrors.msmeAttachments = 'This field is required.';
            }
            // If MSME/Udyam is No, declaration required
            if (additionalDetails.msmeUdyamApplicable?.value === 'No') {
                if (!additionalDetails.msmeDeclarationObj) additionalErrors.msmeDeclaration = 'This field is required.';
            }

            // E-invoicing Applicable required if GSTIN Applicable is Yes
            if (basicInfo.gstinApplicable?.label === 'Yes') {
                if (!additionalDetails.einvoice || (typeof additionalDetails.einvoice === 'object' && !additionalDetails.einvoice.value && !additionalDetails.einvoice.label)) {
                    additionalErrors.einvoice = 'This field is required.';
                }
            }
            // If E-invoicing is No, declaration required
            if (additionalDetails.einvoice?.value === 'No') {
                if (!additionalDetails.einvoiceDeclaration) additionalErrors.einvoiceDeclaration = 'This field is required.';
            }

            // console.log("additional errors:", additionalErrors)
            setErrors(additionalErrors);
        }
        // Return false if either section has errors
        return Object.keys(errors).length === 0 && Object.keys(additionalErrors).length === 0;
    };



    // Country options for address selectors
    const [countryOptions, setCountryOptions] = useState([]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get(`${baseURL}/pms/suppliers/pms_country_list`);
                // Normalize available id fields into option.value so matching with supplier payloads works
                const options = (response.data.pms_country || []).map(country => ({
                    label: country.name || country.label || '',
                    // prefer explicit ids if present, fall back to other common keys
                    value: country.id ?? country.value ?? country.country_id ?? country.pms_country_id ?? country.code ?? ''
                }));
                setCountryOptions(options);
            } catch (error) {
                console.error('Error fetching country list:', error);
            }
        };
        fetchCountries();
    }, []);




    // Address state and handlers
    const [registeredAddress, setRegisteredAddress] = useState({
        address1: "",
        address2: "",
        address3: "",
        address4: "",
        address5: "",
        country: null,
        state: null,
        city: "",
        pincode: "",
        telephone: "",
        mobile: "",
        orderingEmail: "",
        billingEmail: "",
    });

    const [communicationAddress, setCommunicationAddress] = useState({
        address1: "",
        address2: "",
        address3: "",
        address4: "",
        address5: "",
        country: null,
        state: null,
        city: "",
        pincode: "",
        telephone: "",
        mobile: "",
        // email: "",
        orderingEmail: "",
        communication_address_same_as_reg_add: "",
    });

    // console.log("reg add :",registeredAddress)
    // console.log("comm add:", communicationAddress)


    // State options for address selectors
    const [stateOptions, setStateOptions] = useState([]);

    useEffect(() => {
        if (!registeredAddress.country || !registeredAddress.country.value) {
            setStateOptions([]);
            return;
        }
        const fetchStates = async () => {
            try {
                const response = await axios.get(`${baseURL}/pms/suppliers/pms_state_list`, {
                    params: { country_id: registeredAddress.country.value }
                });
                // Normalize state id fields into option.value
                const options = (response.data.pms_state || []).map(state => ({
                    label: state.name || state.label || '',
                    value: state.id ?? state.value ?? state.state_id ?? state.pms_state_id ?? ''
                }));
                setStateOptions(options);
            } catch (error) {
                console.error('Error fetching state list:', error);
            }
        };
        fetchStates();
    }, [registeredAddress.country]);

    // State options for communication address
    const [commStateOptions, setCommStateOptions] = useState([]);

    useEffect(() => {
        if (!communicationAddress.country || !communicationAddress.country.value) {
            setCommStateOptions([]);
            return;
        }
        const fetchStates = async () => {
            try {
                const response = await axios.get(`${baseURL}/pms/suppliers/pms_state_list`, {
                    params: { country_id: communicationAddress.country.value }
                });
                const options = (response.data.pms_state || []).map(state => ({
                    label: state.name || state.label || '',
                    value: state.id ?? state.value ?? state.state_id ?? state.pms_state_id ?? ''
                }));
                setCommStateOptions(options);
            } catch (error) {
                console.error('Error fetching state list (communication):', error);
            }
        };
        fetchStates();
    }, [communicationAddress.country]);


    // console.log("basic info after api com add:", communicationAddress)
    const [sameAsRegistered, setSameAsRegistered] = useState(false);

    const handleRegisteredAddressChange = (field, value) => {
        setRegisteredAddress(prev => ({ ...prev, [field]: value }));
    };

    const handleCommunicationAddressChange = (field, value) => {
        setCommunicationAddress(prev => ({ ...prev, [field]: value }));
    };

    const handleSameAsRegisteredAddress = (e) => {
        const checked = e.target.checked;
        setSameAsRegistered(checked);
        if (checked) {
            setCommunicationAddress({ ...registeredAddress });
        }
    };



    // --- Step 2 Validation: Registered & Communication Address ---
    const [addressErrors, setAddressErrors] = useState({ registered: {}, communication: {} });

    const validateStep2 = () => {

        const regErrs = {};
        const commErrs = {};

        if (isSectionVisible('reg. office')) {
            const regFields = [
                { key: 'address1', label: 'Address' },
                { key: 'country', label: 'Country' },
                { key: 'state', label: 'State' },
                { key: 'city', label: 'City' },
                { key: 'pincode', label: 'Pin Code' },
                { key: 'mobile', label: 'Mobile Number' },
                { key: 'orderingEmail', label: 'Ordering Email ID' },
                { key: 'billingEmail', label: 'Billing Email ID' },
            ];


            // Regex for pin code and email
            const pinCodeRegex = /^[1-9][0-9]{5}$/;
            const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

            regFields?.forEach(f => {
                const val = registeredAddress[f.key];
                if (!val || (typeof val === 'object' && (!val.value && !val.label))) {
                    regErrs[f.key] = `${f.label} is required.`;
                } else {
                    // Pin code format validation
                    if (f.key === 'pincode' && val) {
                        if (!pinCodeRegex.test(val)) {
                            regErrs[f.key] = 'Pin Code must be a 6-digit number starting with 1-9.';
                        }
                    }
                    // Email format validation for orderingEmail and billingEmail
                    if ((f.key === 'orderingEmail' || f.key === 'billingEmail') && val) {
                        if (!emailRegex.test(val)) {
                            regErrs[f.key] = 'Please enter a valid email address.';
                        }
                    }
                }
            });
        }

        if (isSectionVisible('communication address')) {
            const commFields = [
                { key: 'address1', label: 'Address' },
                { key: 'country', label: 'Country' },
                { key: 'state', label: 'State' },
                { key: 'city', label: 'City' },
                { key: 'pincode', label: 'Pin Code' },
                { key: 'mobile', label: 'Mobile Number' },
                { key: 'orderingEmail', label: 'Email ID' },
                // { key: 'billingEmail', label: 'Billing Email ID' },
            ];


            // Regex for pin code and email
            const pinCodeRegex = /^[1-9][0-9]{5}$/;
            const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;



            commFields?.forEach(f => {
                const val = communicationAddress[f.key];
                if (!val || (typeof val === 'object' && (!val.value && !val.label))) {
                    commErrs[f.key] = `${f.label} is required.`;
                } else {
                    // Pin code format validation
                    if (f.key === 'pincode' && val) {
                        if (!pinCodeRegex.test(val)) {
                            commErrs[f.key] = 'Pin Code must be a 6-digit number starting with 1-9.';
                        }
                    }
                    // Email format validation for orderingEmail and billingEmail
                    if ((f.key === 'orderingEmail' || f.key === 'billingEmail') && val) {
                        if (!emailRegex.test(val)) {
                            commErrs[f.key] = 'Please enter a valid email address.';
                        }
                    }
                }
            });

        }
        // const regErrs = {};
        // const commErrs = {};

        // Regex for pin code and email
        // const pinCodeRegex = /^[1-9][0-9]{5}$/;
        // const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

        // regFields?.forEach(f => {
        //     const val = registeredAddress[f.key];
        //     if (!val || (typeof val === 'object' && (!val.value && !val.label))) {
        //         regErrs[f.key] = `${f.label} is required.`;
        //     } else {
        //         // Pin code format validation
        //         if (f.key === 'pincode' && val) {
        //             if (!pinCodeRegex.test(val)) {
        //                 regErrs[f.key] = 'Pin Code must be a 6-digit number starting with 1-9.';
        //             }
        //         }
        //         // Email format validation for orderingEmail and billingEmail
        //         if ((f.key === 'orderingEmail' || f.key === 'billingEmail') && val) {
        //             if (!emailRegex.test(val)) {
        //                 regErrs[f.key] = 'Please enter a valid email address.';
        //             }
        //         }
        //     }
        // });
        // commFields?.forEach(f => {
        //     const val = communicationAddress[f.key];
        //     if (!val || (typeof val === 'object' && (!val.value && !val.label))) {
        //         commErrs[f.key] = `${f.label} is required.`;
        //     } else {
        //         // Pin code format validation
        //         if (f.key === 'pincode' && val) {
        //             if (!pinCodeRegex.test(val)) {
        //                 commErrs[f.key] = 'Pin Code must be a 6-digit number starting with 1-9.';
        //             }
        //         }
        //         // Email format validation for orderingEmail and billingEmail
        //         if ((f.key === 'orderingEmail' || f.key === 'billingEmail') && val) {
        //             if (!emailRegex.test(val)) {
        //                 commErrs[f.key] = 'Please enter a valid email address.';
        //             }
        //         }
        //     }
        // });
        setAddressErrors({ registered: regErrs, communication: commErrs });
        // console.log("error1:",regErrs)
        //  console.log("error2:", commErrs)
        return Object.keys(regErrs).length === 0 && Object.keys(commErrs).length === 0;
    };


    const [virtualAccount, setVirtualAccount] = useState("");
    const [selectedCompany, setSelectedCompany] = useState(null);
    // Company options fetched from API
    const [companyOptions, setCompanyOptions] = useState([]);
    useEffect(() => {
        const fetchCompanyOptions = async () => {
            try {
                const response = await axios.get(`${baseURL}/pms/suppliers/pms_company_list`);
                if (Array.isArray(response.data)) {
                    setCompanyOptions(response.data.pms_company.map(company => ({
                        label: company.company_name || company.name || company.label || "",
                        value: company.id || company.value || company.company_id || ""
                    })));
                } else if (Array.isArray(response.data?.pms_company)) {
                    setCompanyOptions(response.data.pms_company.map(company => ({
                        label: company.company_name || company.name || company.label || "",
                        value: company.id || company.value || company.company_id || ""
                    })));
                } else {
                    setCompanyOptions([]);
                }
            } catch (error) {
                setCompanyOptions([]);
                // Optionally log error
            }
        };
        fetchCompanyOptions();
    }, []);

    // --- Step 3 Validation: Bank Details ---
    const [bankErrors, setBankErrors] = useState({});

    const validateStep3 = () => {
        if (isSectionVisible("bank detail")) {
            let validationErrors = {};
            // if (isRekycTypeEmpty || isBankRekyc) {
            let hasNewBankDetails = false;

            bankDetailsList.forEach((bankDetail) => {
                // Only validate if it's a new entry
                if (bankDetail.isNew) {
                    hasNewBankDetails = true;

                    if (!bankDetail.bank_name) {
                        validationErrors.bank_name = "Bank Name is required.";
                    }
                    if (!bankDetail.address) {
                        validationErrors.address = "Address is required.";
                    }
                    if (!bankDetail.country_id) {
                        validationErrors.country_id = "Country is required.";
                    }
                    if (!bankDetail.state_id) {
                        validationErrors.state_id = "State is required.";
                    }
                    if (!bankDetail.city_name) {
                        validationErrors.city_name = "City is required.";
                    }

                    // For pincode, only validate if it's a new entry and there's no input error
                    if (!bankDetail.pincode || isNaN(bankDetail.pincode)) {
                        if (!inputErrors[bankDetail.id]?.pincode) {
                            validationErrors.pincode = "Valid Pin Code is required.";
                        }
                    }

                    if (!bankDetail.account_type || bankDetail.account_type === "") {
                        validationErrors.account_type = "Account Type is required.";
                    }
                    if (!bankDetail.account_number) {
                        validationErrors.account_number = "Account Number is required.";
                    }
                    if (!bankDetail.confirm_account_number) {
                        validationErrors.confirm_account_number = "Confirm Account Number is required.";
                    } else if (
                        bankDetail.account_number !== bankDetail.confirm_account_number
                    ) {
                        validationErrors.confirm_account_number = "Account numbers must match";
                    }

                    if (!bankDetail.branch_name) {
                        validationErrors.branch_name = "Branch Name is required.";
                    }
                    if (!bankDetail.micr_number) {
                        validationErrors.micr_number = "MICR Number is required.";
                    }

                    // For IFSC code, only validate if it's a new entry and there's no input error
                    if (!bankDetail.ifsc_code) {
                        if (!inputErrors[bankDetail.id]?.ifsc) {
                            validationErrors.ifsc_code = "IFSC Code is required.";
                        }
                    } else {
                        // Validate IFSC format: 11 chars, 4 letters, a '0', then 6 alphanumeric
                        const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
                        const ifscValue = String(bankDetail.ifsc_code || '').trim().toUpperCase();
                        if (!ifscRegex.test(ifscValue)) {
                            validationErrors.ifsc_code = "Invalid IFSC code. eg.: ABCD0123456";
                        }
                    }

                    if (!bankDetail.benficary_name) {
                        validationErrors.benficary_name = "Beneficiary Name is required.";
                    }

                    if (!bankAttachments[bankDetail.id]) {
                        validationErrors.cancelled_cheque = "Cancelled Cheque / Bank Copy is required.";
                    }
                }
            });

            // If there are no new bank details, don't show validation errors
            if (!hasNewBankDetails) {
                validationErrors = {};
            }
            // }
            setBankErrors(validationErrors);
            return Object.keys(validationErrors).length === 0;
        }
    };


    const [branchOffices, setBranchOffices] = useState([]);

    // Reconcile branchOffices country/state with canonical option objects when option lists load
    useEffect(() => {
        try {
            if (!branchOffices || branchOffices.length === 0) return;
            const updated = branchOffices.map(b => {
                let changed = false;
                let country = b.country;
                let state = b.state;

                const currentCountryVal = (country && typeof country === 'object') ? country.value : country;
                if (typeof currentCountryVal !== 'undefined' && currentCountryVal !== null) {
                    const matchCountry = (countryOptions || []).find(opt => String(opt.value) === String(currentCountryVal));
                    if (matchCountry && matchCountry !== country) {
                        country = matchCountry;
                        changed = true;
                    }
                }

                const currentStateVal = (state && typeof state === 'object') ? state.value : state;
                if (typeof currentStateVal !== 'undefined' && currentStateVal !== null) {
                    const matchState = (stateOptions || []).find(opt => String(opt.value) === String(currentStateVal));
                    if (matchState && matchState !== state) {
                        state = matchState;
                        changed = true;
                    }
                }

                return changed ? { ...b, country, state } : b;
            });

            // Only update when something actually changed to avoid re-renders
            const anyChange = updated.some((u, i) => u !== branchOffices[i]);
            if (anyChange) setBranchOffices(updated);
        } catch (e) {
            // silent
        }
    }, [countryOptions, stateOptions, branchOffices]);

    const addBranchOffice = () => {
        setBranchOffices(prev => ([
            ...prev,
            {
                id: Date.now() + Math.random(),
                address: '',
                country: null,
                state: null,
                city: '',
                pincode: '',
                telephone: '',
                mobile: ''
            }
        ]));
    };

    const handleBranchChange = (idx, field, value) => {
        // If country changes or is cleared, reset the associated state field
        if (field === 'country') {
            setBranchOffices(prev => prev.map((b, i) => i === idx ? { ...b, country: value, state: null } : b));
            return;
        }

        setBranchOffices(prev => prev.map((b, i) => i === idx ? { ...b, [field]: value } : b));
    };

    // const deleteBranchOffice = (id) => {
    //     // setBranchOffices(prev => prev.length === 1 ? prev : prev.filter(branch => branch.id !== id));
    //     setBranchOffices(prev => prev.length === 0 ? prev : prev.filter(branch => branch.id !== id));
    // };

    const deleteBranchOffice = (id) => {
        setBranchOffices((prev) => {
            const item = prev.find((c) => c.id === id);
            if (!item) return prev;

            if (item.isNew) {
                return prev.filter((c) => c.id !== id);
            }

            // mark existing item for deletion using boolean true (backend mapper accepts both boolean or string)
            return prev.map((c) => (c.id === id ? { ...c, _destroy: true } : c));
        });
    };

    const [contactPersons, setContactPersons] = useState([

    ]);
    const addContactPerson = () => {
        setContactPersons((prev) => [
            ...prev,
            {
                id: Date.now() + Math.random(),
                escalationLevel: null,
                nameTitle: null,
                firstName: "",
                lastName: "",
                designation: null,
                primaryEmail: "",
                secondaryEmail: "",
                primaryMobile: "",
                secondaryMobile: "",
                nationality: null,
                gender: null,
                dob: "",
                attachment: null,
            },
        ]);
    };

    const handleContactPersonChange = (idx, field, value) => {
        // For mobile fields, allow digits only and cap to 10 characters
        if (field === 'primaryMobile' || field === 'secondaryMobile') {
            const digitsOnly = String(value || '').replace(/\D/g, '').slice(0, 10);
            setContactPersons((prev) => prev.map((p, i) => (i === idx ? { ...p, [field]: digitsOnly } : p)));
            // clear related validation error for this field if present
            setContactPersonErrors(prev => prev.map((err, i) => i === idx ? ({ ...err, [field]: undefined }) : err));
            return;
        }

        // Date of Birth: do not allow future dates
        if (field === 'dob') {
            if (!value) {
                // allow clearing the date
                setContactPersons((prev) => prev.map((p, i) => (i === idx ? { ...p, dob: '' } : p)));
                setContactPersonErrors(prev => prev.map((err, i) => i === idx ? ({ ...err, dob: undefined }) : err));
                return;
            }

            const selected = new Date(value);
            const today = new Date();
            selected.setHours(0, 0, 0, 0);
            today.setHours(0, 0, 0, 0);
            if (selected > today) {
                // Do not set the future date; show validation error for this contact person
                setContactPersonErrors(prev => prev.map((err, i) => i === idx ? ({ ...err, dob: 'Date of Birth cannot be in the future.' }) : err));
                return;
            }

            // valid dob — set value and clear any dob error
            setContactPersons((prev) => prev.map((p, i) => (i === idx ? { ...p, dob: value } : p)));
            setContactPersonErrors(prev => prev.map((err, i) => i === idx ? ({ ...err, dob: undefined }) : err));
            return;
        }

        // Special handling for file attachments: convert File -> { filename, content, content_type }
        if (field === 'attachment') {
            // Clear attachment
            if (!value) {
                setContactPersons(prev => prev.map((p, i) => (i === idx ? { ...p, attachment: null } : p)));
                setContactPersonErrors(prev => prev.map((err, i) => i === idx ? ({ ...err, attachment: undefined }) : err));
                return;
            }

            // If a File was provided, convert to base64 content object expected by backend
            if (value instanceof File) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64String = reader.result.split(',')[1];
                    const attachment = {
                        filename: value.name,
                        content: base64String,
                        content_type: value.type || 'application/octet-stream'
                    };
                    setContactPersons(prev => prev.map((p, i) => (i === idx ? { ...p, attachment } : p)));
                };
                reader.readAsDataURL(value);
                // clear any attachment validation error immediately
                setContactPersonErrors(prev => prev.map((err, i) => i === idx ? ({ ...err, attachment: undefined }) : err));
                return;
            }

            // If an object/URL was passed (server-provided), store it directly
            setContactPersons(prev => prev.map((p, i) => (i === idx ? { ...p, attachment: value } : p)));
            setContactPersonErrors(prev => prev.map((err, i) => i === idx ? ({ ...err, attachment: undefined }) : err));
            return;
        }

        setContactPersons((prev) =>
            prev.map((p, i) => (i === idx ? { ...p, [field]: value } : p))
        );
        // clear field-level validation error on change
        setContactPersonErrors(prev => prev.map((err, i) => i === idx ? ({ ...err, [field]: undefined }) : err));
    };

    // const deleteContactPerson = (id) => {
    //     setContactPersons((prev) =>
    //         prev.length === 0 ? prev : prev.filter((person) => person.id !== id)
    //     );
    // };
    const deleteContactPerson = (id) => {
        setContactPersons((prev) => {
            const item = prev.find((c) => c.id === id);
            if (!item) return prev;

            if (item.isNew) {
                return prev.filter((c) => c.id !== id);
            }

            // mark existing item for deletion using boolean true (backend mapper accepts both boolean or string)
            return prev.map((c) => (c.id === id ? { ...c, _destroy: true } : c));
        });
    };


    // Owners / Directors Information dynamic section state and handlers
    const [owners, setOwners] = useState([

    ]);

    const addOwner = () => {
        setOwners(prev => ([
            ...prev,
            {
                id: Date.now() + Math.random(),
                firstName: '',
                lastName: '',
                designation: null,
                qualification: null,
                experience: '',
                email: '',
                mobile: '',
                attachment: null
            }
        ]));
    };

    const handleOwnerChange = (idx, field, value) => {
        // Special handling for attachment field: convert File -> { filename, content, content_type }
        if (field === 'attachment') {
            // Clear attachment
            if (!value) {
                setOwners(prev => prev.map((o, i) => i === idx ? { ...o, attachment: null } : o));
                // clear any owner attachment validation error if present
                try { setOwnerErrors(prev => prev.map((err, i) => i === idx ? ({ ...err, attachment: undefined }) : err)); } catch (e) { }
                return;
            }

            // If it's a File object, read as base64 and store required shape
            if (value instanceof File) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64String = reader.result.split(',')[1];
                    const attachment = {
                        filename: value.name,
                        content: base64String,
                        content_type: value.type || 'application/octet-stream'
                    };
                    setOwners(prev => prev.map((o, i) => i === idx ? { ...o, attachment } : o));
                };
                reader.readAsDataURL(value);
                // clear any owner attachment validation error immediately
                try { setOwnerErrors(prev => prev.map((err, i) => i === idx ? ({ ...err, attachment: undefined }) : err)); } catch (e) { }
                return;
            }

            // If non-File value (server-provided object or URL string), store directly
            setOwners(prev => prev.map((o, i) => i === idx ? { ...o, attachment: value } : o));
            try { setOwnerErrors(prev => prev.map((err, i) => i === idx ? ({ ...err, attachment: undefined }) : err)); } catch (e) { }
            return;
        }

        setOwners(prev => prev.map((o, i) => i === idx ? { ...o, [field]: value } : o));
    };

    // const deleteOwner = (id) => {
    //     setOwners(prev => prev.length === 0 ? prev : prev.filter(o => o.id !== id));
    // };
    const deleteOwner = (id) => {
        setOwners((prev) => {
            const item = prev.find((c) => c.id === id);
            if (!item) return prev;

            if (item.isNew) {
                return prev.filter((c) => c.id !== id);
            }

            // mark existing item for deletion using boolean true (backend mapper accepts both boolean or string)
            return prev.map((c) => (c.id === id ? { ...c, _destroy: true } : c));
        });
    };
    // Factory Warehouse Details dynamic section state and handlers
    const [warehouses, setWarehouses] = useState([

    ]);

    // Reconcile warehouses country/state with canonical option objects when option lists load
    useEffect(() => {
        try {
            if (!warehouses || warehouses.length === 0) return;
            const updated = warehouses.map(w => {
                let changed = false;
                let country = w.country;
                let state = w.state;

                const currentCountryVal = (country && typeof country === 'object') ? country.value : country;
                if (typeof currentCountryVal !== 'undefined' && currentCountryVal !== null) {
                    const matchCountry = (countryOptions || []).find(opt => String(opt.value) === String(currentCountryVal));
                    if (matchCountry && matchCountry !== country) {
                        country = matchCountry;
                        changed = true;
                    }
                }

                const currentStateVal = (state && typeof state === 'object') ? state.value : state;
                if (typeof currentStateVal !== 'undefined' && currentStateVal !== null) {
                    const matchState = (stateOptions || []).find(opt => String(opt.value) === String(currentStateVal))
                        || (commStateOptions || []).find(opt => String(opt.value) === String(currentStateVal));
                    if (matchState && matchState !== state) {
                        state = matchState;
                        changed = true;
                    }
                }

                return changed ? { ...w, country, state } : w;
            });

            const anyChange = updated.some((u, i) => u !== warehouses[i]);
            if (anyChange) setWarehouses(updated);
        } catch (e) {
            // silent
        }
    }, [countryOptions, stateOptions, commStateOptions, warehouses]);

    const addWarehouse = () => {
        setWarehouses(prev => ([
            ...prev,
            {
                id: Date.now() + Math.random(),
                address: '',
                country: null,
                state: null,
                city: '',
                telephone: '',
                mobile: '',
                attachment: null
            }
        ]));
    };

    const handleWarehouseChange = (idx, field, value) => {
        // If country changes, clear the dependent state field so selection stays consistent
        if (field === 'country') {
            setWarehouses(prev => prev.map((w, i) => i === idx ? { ...w, country: value, state: null } : w))
            // also clear any existing state-level validation error for this warehouse if present
            setWarehouseErrors(prev => prev.map((err, i) => i === idx ? ({ ...err, state: undefined }) : err))
            return
        }

        // If attachment field is being set and value is a File, convert to required object shape
        if (field === 'attachment') {
            // Clearing attachment
            if (!value) {
                setWarehouses(prev => prev.map((w, i) => i === idx ? { ...w, attachment: null } : w));
                return;
            }

            // If a File object is provided, read it as base64 and store { filename, content, content_type }
            if (typeof File !== 'undefined' && value instanceof File) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    try {
                        const base64String = reader.result.split(',')[1];
                        const attachmentObj = {
                            filename: value.name,
                            content: base64String,
                            content_type: value.type || 'application/octet-stream'
                        };
                        setWarehouses(prev => prev.map((w, i) => i === idx ? { ...w, attachment: attachmentObj } : w));
                    } catch (e) {
                        // fallback: store raw file name
                        setWarehouses(prev => prev.map((w, i) => i === idx ? { ...w, attachment: { filename: value.name } } : w));
                    }
                };
                reader.readAsDataURL(value);
                return;
            }

            // If value is a server-side attachment object or string, store it as-is so UI can render
            setWarehouses(prev => prev.map((w, i) => i === idx ? { ...w, attachment: value } : w));
            return;
        }

        setWarehouses(prev => prev.map((w, i) => i === idx ? { ...w, [field]: value } : w))
    }

    // const deleteWarehouse = (id) => {
    //     setWarehouses(prev => prev.length === 0 ? prev : prev.filter(w => w.id !== id));
    // };
    const deleteWarehouse = (id) => {
        setWarehouses((prev) => {
            const item = prev.find((c) => c.id === id);
            if (!item) return prev;

            if (item.isNew) {
                return prev.filter((c) => c.id !== id);
            }

            // mark existing item for deletion using boolean true (backend mapper accepts both boolean or string)
            return prev.map((c) => (c.id === id ? { ...c, _destroy: true } : c));
        });
    };

    const [majorCustomers, setMajorCustomers] = useState([

    ]);

    const addMajorCustomer = () => {
        setMajorCustomers(prev => ([
            ...prev,
            {
                id: Date.now() + Math.random(),
                companyName: '',
                workDone: '',
                contactPerson: '',
                designation: null,
                country: null,
                phone: '',
                mobile: '',
                yearOfAssociation: '',
                businessLast12Months: '',
                serviceFrom: '',
                serviceTo: '',
                stageOfProject: '',
                majorCompetitors: '',
                attachment: null
            }
        ]));
    };

    const handleMajorCustomerChange = (idx, field, value) => {
        setMajorCustomers(prev => prev.map((c, i) => i === idx ? { ...c, [field]: value } : c));
    };

    // Date-specific handler for Major Customer serviceFrom/serviceTo to prevent future dates
    const handleMajorCustomerDateChange = (idx, field, value) => {
        // Update the value first
        handleMajorCustomerChange(idx, field, value);

        // Validate against future date
        const selected = value ? new Date(value) : null;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        setMajorCustomerErrors(prev => {
            const copy = Array.isArray(prev) ? [...prev] : [];
            // ensure object exists
            copy[idx] = copy[idx] ? { ...copy[idx] } : {};

            if (selected && selected > today) {
                copy[idx][field] = (field === 'serviceFrom') ? 'Service From cannot be a future date.' : 'Service To cannot be a future date.';
            } else {
                // clear the specific error
                if (copy[idx] && copy[idx][field]) delete copy[idx][field];
            }

            return copy;
        });
    };

    const deleteMajorCustomer = (id) => {
        setMajorCustomers((prev) => {
            const item = prev.find((c) => c.id === id);
            if (!item) return prev;

            if (item.isNew) {
                return prev.filter((c) => c.id !== id);
            }

            // mark existing item for deletion using boolean true (backend mapper accepts both boolean or string)
            return prev.map((c) => (c.id === id ? { ...c, _destroy: true } : c));
        });
    };
    // Supervisory Manpower & Resources Details dynamic section state and handlers
    const [supervisoryManpower, setSupervisoryManpower] = useState([

    ]);

    const addSupervisoryManpower = () => {
        setSupervisoryManpower(prev => ([
            ...prev,
            {
                id: Date.now() + Math.random(),
                details: '',
                totalNumbers: '',
                remark: '',
                attachment: null
            }
        ]));
    };

    const handleSupervisoryManpowerChange = (idx, field, value) => {
        setSupervisoryManpower(prev => prev.map((s, i) => i === idx ? { ...s, [field]: value } : s));
    };

    const deleteSupervisoryManpower = (id) => {
        setSupervisoryManpower(prev => prev.length === 0 ? prev : prev.filter(s => s.id !== id));
    };
    // Sister Concern / Group Company dynamic section state and handlers
    const [groupCompanies, setGroupCompanies] = useState([

    ]);

    const addGroupCompany = () => {
        setGroupCompanies(prev => ([
            ...prev,
            {
                id: Date.now() + Math.random(),
                name: '',
                natureOfBusiness: null,
                pan: '',
                gstin: ''
            }
        ]));
    };

    const handleGroupCompanyChange = (idx, field, value) => {
        setGroupCompanies(prev => prev.map((c, i) => i === idx ? { ...c, [field]: value } : c));
    };

    const deleteGroupCompany = (id) => {
        setGroupCompanies(prev => prev.length === 0 ? prev : prev.filter(c => c.id !== id));
    };
    // Related Employee dynamic section state and handlers
    const [relatedEmployees, setRelatedEmployees] = useState([

    ]);

    const addRelatedEmployee = () => {
        setRelatedEmployees(prev => ([
            ...prev,
            {
                id: Date.now() + Math.random(),
                firstName: '',
                lastName: '',
                email: '',
                mobile: '',
                designation: null,
                department: null,
                relationship: null,
                currentlyWorking: '',
                attachment: null
            }
        ]));
    };

    const handleRelatedEmployeeChange = (idx, field, value) => {
        setRelatedEmployees(prev => prev.map((e, i) => i === idx ? { ...e, [field]: value } : e));
    };

    const deleteRelatedEmployee = (id) => {
        setRelatedEmployees(prev => prev.length === 0 ? prev : prev.filter(e => e.id !== id));
    };

    // Current Working Sites dynamic section state and handlers
    const [workingSites, setWorkingSites] = useState([

    ]);

    const addWorkingSite = () => {
        setWorkingSites(prev => ([
            ...prev,
            {
                id: Date.now() + Math.random(),
                builderName: '',
                briefDetails: '',
                area: '',
                manpower: '',
                stageOfProject: '',
                likelyCompletion: '',
                attachment: null
            }
        ]));
    };

    const handleWorkingSiteChange = (idx, field, value) => {
        setWorkingSites(prev => prev.map((s, i) => i === idx ? { ...s, [field]: value } : s));
    };

    const deleteWorkingSite = (id) => {
        setWorkingSites(prev => prev.length === 0 ? prev : prev.filter(s => s.id !== id));
    };

    // Organization type and CIN fields
    const [organizationType, setOrganizationType] = useState("");
    const [cin, setCin] = useState("");
    const [cinAttachment, setCinAttachment] = useState(null);


    // --- Step 4 Validation: Branch Offices, Contact Persons, Warehouses ---
    const [branchErrors, setBranchErrors] = useState([]);
    const [contactPersonErrors, setContactPersonErrors] = useState([]);
    const [warehouseErrors, setWarehouseErrors] = useState([]);
    const [turnoverErrors, setTurnoverErrors] = useState({});
    // --- Step 4 (cont): Owners, Related Employees, Group Companies, Supervisory Manpower, Major Customers, Working Sites ---
    const [ownerErrors, setOwnerErrors] = useState([]);
    const [relatedEmployeeErrors, setRelatedEmployeeErrors] = useState([]);
    const [groupCompanyErrors, setGroupCompanyErrors] = useState([]);
    const [supervisoryManpowerErrors, setSupervisoryManpowerErrors] = useState([]);
    const [majorCustomerErrors, setMajorCustomerErrors] = useState([]);
    const [workingSiteErrors, setWorkingSiteErrors] = useState([]);

    // const validateStep4 = () => {
    //     // Email regex for warehouse contact person validation
    //     const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    //     // Branch Offices
    //     const branchErrs = branchOffices.map(branch => {
    //         const err = {};
    //         if (!branch.address) err.address = 'Address is required.';
    //         if (!branch.country) err.country = 'Country is required.';
    //         if (!branch.state) err.state = 'State is required.';
    //         if (!branch.city) err.city = 'City is required.';
    //         if (!branch.pincode) err.pincode = 'Pin Code is required.';
    //         return err;
    //     });
    //     setBranchErrors(branchErrs);
    //     console.log("branchErrs:", branchErrs)
    //     // Contact Persons
    //     const contactErrs = contactPersons.map(person => {
    //         const err = {};
    //         if (!person.escalationLevel) err.escalationLevel = 'Escalation Level is required.';
    //         if (!person.nameTitle) err.nameTitle = 'Name Title is required.';
    //         if (!person.firstName) err.firstName = 'First Name is required.';
    //         if (!person.lastName) err.lastName = 'Last Name is required.';
    //         if (!person.designation) err.designation = 'Designation is required.';
    //         // Primary email: required + format
    //         if (!person.primaryEmail) {
    //             err.primaryEmail = 'Primary Email is required.';
    //         } else if (person.primaryEmail && !emailRegex.test(person.primaryEmail)) {
    //             err.primaryEmail = 'Please enter a valid email address. eg.: abc@gmail.com';
    //         }
    //         // Primary mobile: required + 10 digits
    //         if (!person.primaryMobile) {
    //             err.primaryMobile = 'Primary Mobile is required.';
    //         } else if (!/^\d{10}$/.test(person.primaryMobile)) {
    //             err.primaryMobile = 'Primary Mobile must be a 10-digit number.';
    //         }
    //         // Secondary mobile: optional, but if present must be 10 digits
    //         if (person.secondaryMobile && !/^\d{10}$/.test(person.secondaryMobile)) {
    //             err.secondaryMobile = 'Secondary Mobile must be a 10-digit number.';
    //         }
    //         // Secondary email: optional, validate format if present
    //         if (person.secondaryEmail && !emailRegex.test(person.secondaryEmail)) {
    //             err.secondaryEmail = 'Please enter a valid email address. eg.: abc@gmail.com';
    //         }
    //         return err;
    //     });
    //     setContactPersonErrors(contactErrs);
    //     console.log("contactErrs:", contactErrs)

    //     // Warehouses
    //     const warehouseErrs = warehouses.map(warehouse => {
    //         const err = {};
    //         if (!warehouse.address) err.address = 'Address is required.';
    //         if (!warehouse.mobile) {
    //             err.mobile = 'Contact Number is required.';
    //         } else if (!/^\d{10}$/.test(warehouse.mobile)) {
    //             err.mobile = 'Contact Number must be a 10-digit number.';
    //         }
    //         if (!warehouse.contactPerson) err.contactPerson = 'Contact Person is required.';
    //         if (!warehouse.contactPersonEmail) {
    //             err.contactPersonEmail = 'Contact Person Email is required.';
    //         } else if (warehouse.contactPersonEmail && !emailRegex.test(warehouse.contactPersonEmail)) {
    //             err.contactPersonEmail = 'Please enter a valid email address. eg.: abc@gmail.com';
    //         }
    //         if (!warehouse.country) err.country = 'Country is required.';
    //         if (!warehouse.state) err.state = 'State is required.';
    //         if (!warehouse.city) err.city = 'City is required.';
    //         return err;
    //     });
    //     setWarehouseErrors(warehouseErrs);
    //     console.log("warehouseErrs:", warehouseErrs)
    //     // Owners
    //     const ownerErrs = owners.map(owner => {
    //         const err = {};
    //         if (!owner.firstName) err.firstName = 'First Name is required.';
    //         if (!owner.lastName) err.lastName = 'Last Name is required.';
    //         if (!owner.designation) err.designation = 'Designation is required.';
    //         // Email required + format validation
    //         if (!owner.email) {
    //             err.email = 'Email is required.';
    //         } else if (owner.email && !emailRegex.test(owner.email)) {
    //             err.email = 'Please enter a valid email address. eg.: abc@gmail.com';
    //         }
    //         // Mobile required + 10 digits
    //         if (!owner.mobile) {
    //             err.mobile = 'Mobile Number is required.';
    //         } else if (!/^\d{10}$/.test(owner.mobile)) {
    //             err.mobile = 'Mobile Number must be a 10-digit number.';
    //         }
    //         return err;
    //     });
    //     setOwnerErrors(ownerErrs);
    //     console.log("ownerErrs:", ownerErrs)

    //     // Annual Turnover: if amount is provided, attachment is required
    //     const turnoverErrs = {};
    //     (annualTurnover || []).forEach(entry => {
    //         const fy = entry.year;
    //         const amountProvided = entry.turnover !== undefined && entry.turnover !== null && String(entry.turnover) !== '';
    //         if (amountProvided) {
    //             if (!entry.attachment) {
    //                 turnoverErrs[fy] = { attachment: 'Attachment is required for the declared turnover.' };
    //             }
    //         }
    //     });
    //     setTurnoverErrors(turnoverErrs);

    //     // Major Customers client references
    //     const custErrs = majorCustomers.map(cust => {
    //         const err = {};
    //         if (!cust.companyName) err.companyName = 'Client Name is required.';
    //         if (!cust.workDone) err.workDone = 'Product On Service Provided is required.';
    //         if (!cust.contactPerson) err.contactPerson = 'Contact Person is required.';
    //         // if (!cust.designation) err.designation = 'Designation is required.';
    //         if (!cust.country) err.country = 'Country is required.';
    //         if (!cust.mobile) err.mobile = 'Contact No. is required.';
    //         // if (!cust.yearOfAssociation) err.yearOfAssociation = 'Year of Association is required.';
    //         if (!cust.businessLast12Months) err.businessLast12Months = 'WO/PO Amount in Last Last 12 month is required.';
    //         if (!cust.siteType) err.siteType = 'Site Type is required.';
    //         if (!cust.serviceFrom) {
    //             err.serviceFrom = 'Service Provided From is required.';
    //         } else {
    //             // disallow future dates
    //             const sel = new Date(cust.serviceFrom);
    //             const today = new Date();
    //             today.setHours(0, 0, 0, 0);
    //             if (sel > today) {
    //                 err.serviceFrom = 'Service Provided From cannot be a future date.';
    //             }
    //         }
    //         // Only require serviceTo if siteType is 'previous'
    //         if (cust.siteType === 'previous') {
    //             if (!cust.serviceTo) {
    //                 err.serviceTo = 'Service Provided To is required.';
    //             } else {
    //                 const selTo = new Date(cust.serviceTo);
    //                 const today = new Date();
    //                 today.setHours(0, 0, 0, 0);
    //                 if (selTo > today) {
    //                     err.serviceTo = 'Service Provided To cannot be a future date.';
    //                 }
    //             }
    //         }
    //         return err;
    //     });
    //     setMajorCustomerErrors(custErrs);

    //     console.log("custErrs:", custErrs)

    //     // Return true if all error objects are empty
    //     const allBranchesValid = branchErrs.every(e => Object.keys(e).length === 0);
    //     const allContactsValid = contactErrs.every(e => Object.keys(e).length === 0);
    //     const allWarehousesValid = warehouseErrs.every(e => Object.keys(e).length === 0);
    //     // Combine all validations
    //     // ...existing checks...
    //     const allOwnersValid = ownerErrs.every(e => Object.keys(e).length === 0);

    //     const allCustValid = custErrs.every(e => Object.keys(e).length === 0);
    //     const allTurnoverValid = Object.keys(turnoverErrs).length === 0;


    //     return allBranchesValid && allContactsValid && allWarehousesValid && allOwnersValid
    //         // && allRelEmpValid && allGroupValid && allSupValid 
    //         && allCustValid
    //         && allTurnoverValid
    //     // && allSiteValid;

    // };



    const validateStep4 = () => {
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;



        // ---------- branch office ----------
        let branchErrs = [];
        if (isSectionVisible("branch office")) {
            branchErrs = branchOffices.map(branch => {
                const err = {};
                if (!branch.address) err.address = 'Address is required.';
                if (!branch.country) err.country = 'Country is required.';
                if (!branch.state) err.state = 'State is required.';
                if (!branch.city) err.city = 'City is required.';
                if (!branch.pincode) err.pincode = 'Pin Code is required.';
                return err;
            });
            setBranchErrors(branchErrs);
            console.log("branchErrs:", branchErrs);
        }

        // ---------- factory / warehouse details ----------
        let warehouseErrs = [];
        if (isSectionVisible("factory / warehouse details")) {
            warehouseErrs = warehouses.map(warehouse => {
                const err = {};
                if (!warehouse.address) err.address = 'Address is required.';
                if (!warehouse.mobile) {
                    err.mobile = 'Contact Number is required.';
                } else if (!/^\d{10}$/.test(warehouse.mobile)) {
                    err.mobile = 'Contact Number must be a 10-digit number.';
                }
                if (!warehouse.contactPerson) err.contactPerson = 'Contact Person is required.';
                if (!warehouse.contactPersonEmail) {
                    err.contactPersonEmail = 'Contact Person Email is required.';
                } else if (!emailRegex.test(warehouse.contactPersonEmail)) {
                    err.contactPersonEmail = 'Please enter a valid email address. eg.: abc@gmail.com';
                }
                if (!warehouse.country) err.country = 'Country is required.';
                if (!warehouse.state) err.state = 'State is required.';
                if (!warehouse.city) err.city = 'City is required.';
                return err;
            });
            setWarehouseErrors(warehouseErrs);
            console.log("warehouseErrs:", warehouseErrs);
        }

        // ---------- contact person ----------
        let contactErrs = [];
        if (isSectionVisible("contact person")) {
            contactErrs = contactPersons.map(person => {
                const err = {};
                if (!person.escalationLevel) err.escalationLevel = 'Escalation Level is required.';
                if (!person.nameTitle) err.nameTitle = 'Name Title is required.';
                if (!person.firstName) err.firstName = 'First Name is required.';
                if (!person.lastName) err.lastName = 'Last Name is required.';
                if (!person.designation) err.designation = 'Designation is required.';

                if (!person.primaryEmail) {
                    err.primaryEmail = 'Primary Email is required.';
                } else if (!emailRegex.test(person.primaryEmail)) {
                    err.primaryEmail = 'Please enter a valid email address. eg.: abc@gmail.com';
                }

                if (!person.primaryMobile) {
                    err.primaryMobile = 'Primary Mobile is required.';
                } else if (!/^\d{10}$/.test(person.primaryMobile)) {
                    err.primaryMobile = 'Primary Mobile must be a 10-digit number.';
                }

                if (person.secondaryMobile && !/^\d{10}$/.test(person.secondaryMobile)) {
                    err.secondaryMobile = 'Secondary Mobile must be a 10-digit number.';
                }

                if (person.secondaryEmail && !emailRegex.test(person.secondaryEmail)) {
                    err.secondaryEmail = 'Please enter a valid email address. eg.: abc@gmail.com';
                }

                return err;
            });
            setContactPersonErrors(contactErrs);
            console.log("contactErrs:", contactErrs);
        }

        // ---------- owners / directors information ----------
        let ownerErrs = [];
        if (isSectionVisible("owners / directors information")) {
            ownerErrs = owners.map(owner => {
                const err = {};
                if (!owner.firstName) err.firstName = 'First Name is required.';
                if (!owner.lastName) err.lastName = 'Last Name is required.';
                if (!owner.designation) err.designation = 'Designation is required.';

                if (!owner.email) {
                    err.email = 'Email is required.';
                } else if (!emailRegex.test(owner.email)) {
                    err.email = 'Please enter a valid email address. eg.: abc@gmail.com';
                }

                if (!owner.mobile) {
                    err.mobile = 'Mobile Number is required.';
                } else if (!/^\d{10}$/.test(owner.mobile)) {
                    err.mobile = 'Mobile Number must be a 10-digit number.';
                }

                return err;
            });
            setOwnerErrors(ownerErrs);
            console.log("ownerErrs:", ownerErrs);
        }

        // ---------- annual turnover ----------
        let turnoverErrs = {};
        if (isSectionVisible("annual turnover")) {
            (annualTurnover || []).forEach(entry => {
                const fy = entry.year;
                const amountProvided = entry.turnover !== undefined && entry.turnover !== null && String(entry.turnover) !== '';
                if (amountProvided && !entry.attachment) {
                    turnoverErrs[fy] = { attachment: 'Attachment is required for the declared turnover.' };
                }
            });
            setTurnoverErrors(turnoverErrs);
        }

        // ---------- major customers served by you ----------
        let custErrs = [];
        if (isSectionVisible("major customers served by you")) {
            custErrs = majorCustomers.map(cust => {
                const err = {};
                if (!cust.companyName) err.companyName = 'Client Name is required.';
                if (!cust.workDone) err.workDone = 'Product / Service Provided is required.';
                if (!cust.contactPerson) err.contactPerson = 'Contact Person is required.';
                if (!cust.country) err.country = 'Country is required.';
                if (!cust.mobile) err.mobile = 'Contact No. is required.';
                if (!cust.businessLast12Months) err.businessLast12Months = 'WO/PO Amount in Last 12 Months is required.';
                if (!cust.siteType) err.siteType = 'Site Type is required.';

                if (!cust.serviceFrom) {
                    err.serviceFrom = 'Service Provided From is required.';
                } else {
                    const sel = new Date(cust.serviceFrom);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    if (sel > today) err.serviceFrom = 'Service Provided From cannot be a future date.';
                }

                if (cust.siteType === 'previous') {
                    if (!cust.serviceTo) {
                        err.serviceTo = 'Service Provided To is required.';
                    } else {
                        const selTo = new Date(cust.serviceTo);
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        if (selTo > today) err.serviceTo = 'Service Provided To cannot be a future date.';
                    }
                }
                return err;
            });
            setMajorCustomerErrors(custErrs);
            console.log("custErrs:", custErrs);
        }

        // ---------- FINAL VALIDATION ----------
        const allBranchesValid = branchErrs.every(e => Object.keys(e).length === 0);
        const allContactsValid = contactErrs.every(e => Object.keys(e).length === 0);
        const allWarehousesValid = warehouseErrs.every(e => Object.keys(e).length === 0);
        const allOwnersValid = ownerErrs.every(e => Object.keys(e).length === 0);
        const allCustValid = custErrs.every(e => Object.keys(e).length === 0);
        const allTurnoverValid = Object.keys(turnoverErrs).length === 0;

        return (
            (!isSectionVisible("branch office") || allBranchesValid) &&
            (!isSectionVisible("factory / warehouse details") || allWarehousesValid) &&
            (!isSectionVisible("contact person") || allContactsValid) &&
            (!isSectionVisible("owners / directors information") || allOwnersValid) &&
            (!isSectionVisible("major customers served by you") || allCustValid) &&
            (!isSectionVisible("annual turnover") || allTurnoverValid)
        );
    };



    // *****************************************


    const handleFileChange = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result.split(",")[1];
            const attachment = {
                filename: file.name,
                content: base64String,
                content_type: file.type,
            };

            // Replace previous attachment with the new one (store only the latest file)
            setMsmeAttachments([attachment]);

            console.log("Updated MSME Attachments:", [attachment]); // Debugging log
        };
        reader.readAsDataURL(file);
    };

    // For handling MSME attachments (storing encrypted files)
    const handleFileChange2 = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result.split(",")[1];
            const attachment = {
                filename: file.name,
                content: base64String,
                content_type: file.type,
            };
            setEinvoicingAttachments([...einvoicingAttachments, attachment]);
        };
        reader.readAsDataURL(file);
    };

    const handleFileChangegst = (event) => {
        const files = event.target.files;
        if (!files.length) return;

        const file = files[files.length - 1]; // Get the latest selected file

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result.split(",")[1];
            const newAttachment = {
                filename: file.name,
                content: base64String,
                content_type: file.type,
            };

            // Replace existing attachments with the new file
            setGstinAttachments([newAttachment]);
        };

        reader.readAsDataURL(file);
    };

    const [msmeUdyamApplicable, setMsmeUdyamApplicable] = useState("");
    const [msmeEnterpriseType, setMsmeEnterpriseType] = useState("");

    // Handle change in select box
    const handleEInvoicingChange = (event) => {
        const newValue = event.target.value;
        setEInvoicingApplicable(newValue);
    };
    // Handle change in "MSME/Udyam Number Applicable" dropdown
    const handleMsmeUdyamChange = (event) => {
        const newValue = event.target.value;
        setMsmeUdyamApplicable(newValue);
    };

    // Handle changes for MSME Enterprise Type
    const handleMsmeEnterpriseChange = (event) => {
        const newValue = event.target.value;
        setMsmeEnterpriseType(newValue);
    };

    // console.log("msme type", msmeEnterpriseType);
    // api details

    const [gstClassification, setGstClassification] = useState("");
    const [gstApplicable, setGstApplicable] = useState("");
    const [gstinNumber, setGstinNumber] = useState("");
    const [gstinAttachments, setGstinAttachments] = useState([]);
    const [gstOptions, setGstOptions] = useState([]);
    // const [bankDetailsList, setBankDetailsList] = useState([]);
    const [majorActivity, setMajorActivity] = useState("");
    const [classificationYear, setClassificationYear] = useState("");
    const [classificationDate, setClassificationDate] = useState("");


    // country and state

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);

    const fetchCountries = async () => {
        try {
            const response = await axios.get(
                `${baseURL}/pms/dropdown_countries?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414`
            );

            const formattedCountries = response.data.countries.map((country) => ({
                value: country.value,
                label: country.name, // Map 'name' to 'label' for react-select
            }));

            setCountries(formattedCountries);
        } catch (error) {
            console.error("Error fetching countries:", error);
        }
    };

    useEffect(() => {
        fetchCountries();
    }, []);

    const fetchStates = async (countryId) => {
        try {
            const response = await axios.get(
                `${baseURL}/pms/dropdown_states?country_id=${countryId}&token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414`
            );

            const formattedStates = response.data.states.map((state) => ({
                value: state.value,
                label: state.name, // Map 'name' to 'label' for react-select
            }));

            setStates(formattedStates);
        } catch (error) {
            console.error("Error fetching states:", error);
        }
    };

    useEffect(() => {
        if (bankDetailsList.length > 0) {
            const firstBank = bankDetailsList[0];
            setSelectedCountry(firstBank.country_id);
            fetchStates(firstBank.country_id); // Fetch states when country is set
            setSelectedState(firstBank.state_id);
        }
    }, [bankDetailsList]);

    const handleCountryChange = (selectedOption, bankId) => {
        setBankDetailsList((prevList) =>
            prevList.map((bankDetail) =>
                bankDetail.id === bankId
                    ? { ...bankDetail, country_id: selectedOption?.value, state_id: null } // Reset state when country changes
                    : bankDetail
            )
        );

        if (selectedOption) {
            fetchStates(selectedOption.value); // Fetch states for selected country
        }
    };

    const handleStateChange = (selectedOption, bankId) => {
        setBankDetailsList((prevList) =>
            prevList.map((bankDetail) =>
                bankDetail.id === bankId
                    ? { ...bankDetail, state_id: selectedOption?.value }
                    : bankDetail
            )
        );
    };

    const [deletedBankDetails, setDeletedBankDetails] = useState([]); // Store deleted bank details
    const [bankAttachments, setBankAttachments] = useState([]); // State for bank attachments

    // Add near the top of your component with other constants
    const accountTypeOptions = [
        { value: "", label: "Select Account Type" },
        { value: "Saving Account", label: "Saving Account" },
        { value: "Current Account", label: "Current Account" },
        { value: "Overdraft Account", label: "Overdraft Account" },
    ];
    const [inputErrors, setInputErrors] = useState({});

    const handleInputChange = (e, id, field) => {
        const { value } = e.target;

        if (field === "pincode") {
            // Remove non-numeric characters
            const numericValue = value.replace(/\D/g, "").slice(0, 6);

            // Update bank details list first
            setBankDetailsList((prevDetails) =>
                prevDetails.map((bankDetail) =>
                    bankDetail.id === id
                        ? { ...bankDetail, pincode: numericValue }
                        : bankDetail
                )
            );

            // Only set input errors if it's a new bank detail
            const bankDetail = bankDetailsList.find((detail) => detail.id === id);
            if (bankDetail?.isNew) {
                if (!numericValue) {
                    setInputErrors((prev) => ({
                        ...prev,
                        [id]: { ...prev[id], pincode: "Pincode is required." },
                    }));
                    // Clear the validation error since we're handling it with input error
                    setErrors((prev) => {
                        const newErrors = { ...prev };
                        delete newErrors.pincode;
                        return newErrors;
                    });
                } else if (numericValue.length < 6) {
                    setInputErrors((prev) => ({
                        ...prev,
                        [id]: { ...prev[id], pincode: "Pincode must be 6 digits" },
                    }));
                    // Clear the validation error
                    setErrors((prev) => {
                        const newErrors = { ...prev };
                        delete newErrors.pincode;
                        return newErrors;
                    });
                } else {
                    setInputErrors((prev) => {
                        const newErrors = { ...prev };
                        if (newErrors[id]) {
                            delete newErrors[id].pincode;
                        }
                        return newErrors;
                    });
                }
            }
        } else if (field === "ifsc_code") {
            // Convert to uppercase
            const upperValue = value.toUpperCase();

            // IFSC validation regex: First 4 letters + 0 + 6 alphanumeric
            // const ifscRegex = /^[A-Z]{4}[0-9]{1}[A-Z0-9]{6}$/;
            const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;

            // Update bank details list first
            setBankDetailsList((prevDetails) =>
                prevDetails.map((bankDetail) =>
                    bankDetail.id === id
                        ? { ...bankDetail, ifsc_code: upperValue }
                        : bankDetail
                )
            );

            // Only set input errors if it's a new bank detail
            const bankDetail = bankDetailsList.find((detail) => detail.id === id);
            if (bankDetail?.isNew) {
                if (!upperValue) {
                    setInputErrors((prev) => ({
                        ...prev,
                        [id]: { ...prev[id], ifsc: "IFSC Code is required." },
                    }));
                    // Clear the validation error
                    setErrors((prev) => {
                        const newErrors = { ...prev };
                        delete newErrors.ifsc_code;
                        return newErrors;
                    });
                } else if (upperValue.length < 11) {
                    setInputErrors((prev) => ({
                        ...prev,
                        [id]: { ...prev[id], ifsc: "IFSC code must be 11 characters" },
                    }));
                    // Clear the validation error
                    setErrors((prev) => {
                        const newErrors = { ...prev };
                        delete newErrors.ifsc_code;
                        return newErrors;
                    });
                } else if (!ifscRegex.test(upperValue)) {
                    setInputErrors((prev) => ({
                        ...prev,
                        [id]: {
                            ...prev[id],
                            ifsc: "Invalid IFSC format. First 4 characters must be capital letters, followed by '0' and 6 alphanumeric characters. eg.: ABCD0123456",
                        },
                    }));
                    // Clear the validation error
                    setErrors((prev) => {
                        const newErrors = { ...prev };
                        delete newErrors.ifsc_code;
                        return newErrors;
                    });
                } else {
                    setInputErrors((prev) => {
                        const newErrors = { ...prev };
                        if (newErrors[id]) {
                            delete newErrors[id].ifsc;
                        }
                        return newErrors;
                    });
                }
            }
        } else {
            // Handle other fields normally
            setBankDetailsList((prevDetails) =>
                prevDetails.map((bankDetail) =>
                    bankDetail.id === id ? { ...bankDetail, [field]: value } : bankDetail
                )
            );
        }
    };

    // Function to add a new bank detail
    const addBankDetails = () => {
        setBankDetailsList([
            ...bankDetailsList,
            {
                id: Date.now(),
                bank_name: null,
                address: null,
                country_id: null,
                state_id: null,
                // city: null,
                city_name: null,
                // pin_code: null,
                pincode: null,
                // account_type: null,
                account_type: "", // Initialize with empty string for dropdown
                account_number: null,
                confirm_account_number: null,
                branch_name: null,
                micr_number: null,
                ifsc_code: null,
                benficary_name: null,
                remark: null,
                _destroy: "false",
                isNew: true,
            },
        ]);

        // setFormSubmitted(true);
    };

    // Function to delete bank details
    const deleteBankDetails = (id) => {
        setBankDetailsList((prev) => {
            const item = prev.find((i) => i.id === id);
            if (!item) return prev;

            // If it's a new (unsaved) item, remove it from the list
            if (item.isNew) {
                return prev.filter((i) => i.id !== id);
            }

            // For existing items, mark them for deletion so backend receives _destroy flag
            return prev.map((i) => (i.id === id ? { ...i, _destroy: "true" } : i));
        });

        // Keep a record of deleted items (for payload or UI audit)
        const deletedItem = bankDetailsList.find((item) => item.id === id);
        if (deletedItem) {
            setDeletedBankDetails((prev) => [...prev, { ...deletedItem, _destroy: true }]);
        }
    };


    // console.log("bank detail list to deleted :", deletedBankDetails)

    const handleFileChangeBank = (file, bankId) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result.split(",")[1];
            const attachment = {
                filename: file.name,
                content: base64String,
                content_type: file.type,
            };
            // setBankAttachments([...bankAttachments, attachment]);

            setBankAttachments((prevAttachments) => ({
                ...prevAttachments,
                [bankId]: attachment, // Store attachment against the bank ID
            }));
        };
        reader.readAsDataURL(file);
    };

    // console.log("banck details :", bankDetailsList);

    // Define state for form fields
    //  const [msmeUdyamApplicable, setMsmeUdyamApplicable] = useState("No");
    //  const [msmeEnterpriseType, setMsmeEnterpriseType] = useState("Micro");
    const [msmeNo, setMsmeNo] = useState("");
    const [validFrom, setValidFrom] = useState("");
    const [validTill, setValidTill] = useState("");
    //  const [attachment, setAttachment] = useState(null);
    const [msmeAttachments, setMsmeAttachments] = useState([]);
    // State for eInvoicing Attachments
    const [einvoicingAttachments, setEinvoicingAttachments] = useState([]);

    // Handler for MSME/Udyam Number
    const handleMsmeNoChange = (e) => {
        setMsmeNo(e.target.value);
    };

    const handleClassificationYearChange = (selectedOption) => {
        if (!selectedOption) {
            setClassificationYear("");
            setValidFrom("");
            setValidTill("");
            return;
        }

        <div className="row w-100 mb-3">
            <div className="col-md-6">
                <input className="form-control" type="text" placeholder="Enter Email OTP" />
            </div>
            <div className="col-md-6">
                <input className="form-control" type="text" placeholder="Enter Mobile OTP" />
            </div>
        </div>

        let validFromDate = "";
        let validTillDate = "";

        if (selectedYear) {
            const [startYear, endYear] = selectedYear.split("-");
            validFromDate = `${startYear}-04-01`;
            validTillDate = `20${endYear}-03-31`;
        }

        setValidFrom(validFromDate);
        setValidTill(validTillDate);
    };

    const handleValidFromChange = (e) => {
        setValidFrom(e.target.value);
    };

    // Handler for Valid Till date
    const handleValidTillChange = (e) => {
        setValidTill(e.target.value);
    };

    // name rekyc attachments 
    const [panAttachments, setPanAttachments] = useState([]);
    const [msmeAttachments2, setMsmeAttachments2] = useState([]);
    const [cinAttachments, setCinAttachments] = useState([]);
    const [gstinAttachments2, setGstinAttachments2] = useState([]);
    const [bankChequeAttachments, setBankChequeAttachments] = useState([]);
    const handleFileUpload = (file, setAttachmentState, currentAttachments) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result.split(",")[1];
            const attachment = {
                filename: file.name,
                content: base64String,
                content_type: file.type,
            };
            setAttachmentState([...currentAttachments, attachment]);
        };
        reader.readAsDataURL(file);
    };
    const handlePanUpload = (file) => {
        handleFileUpload(file, setPanAttachments, panAttachments);
    };

    const handleMsmeUpload = (file) => {
        handleFileUpload(file, setMsmeAttachments2, msmeAttachments2);
    };

    const handleCinUpload = (file) => {
        handleFileUpload(file, setCinAttachments, cinAttachments);
    };

    const handleGstinUpload = (file) => {
        handleFileUpload(file, setGstinAttachments2, gstinAttachments2);
    };

    const handleBankChequeUpload = (file) => {
        handleFileUpload(file, setBankChequeAttachments, bankChequeAttachments);
    };


    // const handleStatutoryInputChange = (code, value, id, statutory_detail_value) => {
    //     setStatutoryInputs(prev => ({
    //         ...prev,
    //         [code]: {
    //             ...prev[code],
    //             input: value,
    //             id: id,
    //         },
    //     }));
    // };

    // const handleStatutoryFileChange = (code, file, id, statutory_detail_value) => {
    //     const reader = new FileReader();

    //     reader.onloadend = () => {
    //         const base64String = reader.result.split(",")[1];

    //         const attachment = {
    //             filename: file.name,
    //             content: base64String,
    //             content_type: file.type,
    //         };

    //         // Update the statutoryInputs state with attachment
    //         setStatutoryInputs((prev) => ({
    //             ...prev,
    //             [code]: {
    //                 ...prev[code],
    //                 file: attachment, // Save attachment object instead of raw File
    //                 id: id,
    //                 // input: statutory_detail_value
    //             },
    //         }));
    //     };

    //     if (file) {
    //         reader.readAsDataURL(file);
    //     }
    // };





    // const statutoryPayload = Object.entries(statutoryInputs).map(
    //     ([code, { input, file, id }]) => ({
    //         id,
    //         // code,
    //         statutory_detail_value: input || null,
    //         statutory_detail_attachment: file || null,
    //     })
    // );


    // const validateStatutoryInputs = () => {
    //     const errors = {};

    //     Object.entries(statutoryInputs || {}).forEach(([stateKey, { input, file, code }]) => {
    //         const inputValue = (input || "").toString().trim().toLowerCase();
    //         const isNotApplicable = inputValue === "not applicable";

    //         // targetKey for errors should be the original statutory code (fallback to stateKey)
    //         const targetKey = code || stateKey;

    //         // Require file if input is provided and it's not 'not applicable'
    //         if (inputValue && !isNotApplicable && !file) {
    //             errors[targetKey] = "Attachment is required.";
    //         }

    //         // Optional: You can add required input check too
    //         // if (!inputValue && !file) {
    //         //   errors[code] = "This field is required.";
    //         // }
    //     });

    //     return errors;
    // };



    useEffect(() => {
        const reconcile = (fieldKey, options) => {
            try {
                if (!options || options.length === 0) return;
                const current = basicInfo[fieldKey];
                if (!current) return;
                const currentVal = (typeof current === 'object' ? current.value : current);
                const match = (options || []).find(opt => String(opt.value) === String(currentVal) || String(opt.label) === String(currentVal));
                if (match && match !== current) {
                    setBasicInfo(prev => ({ ...prev, [fieldKey]: match }));
                }
            } catch (e) {
                // ignore
            }
        };

        reconcile('organizationType', organizationTypeOptions);
        reconcile('vendorType', vendorTypeOptions);
        reconcile('industryType', industryTypeOptions);
        reconcile('natureOfBusiness', natureOfBusinessOptions);
        reconcile('schemaGroup', schemaGroupOptions);

        // run when any of these options or the basicInfo fields change
    }, [organizationTypeOptions, vendorTypeOptions, industryTypeOptions, natureOfBusinessOptions, schemaGroupOptions, basicInfo.organizationType, basicInfo.vendorType, basicInfo.industryType, basicInfo.natureOfBusiness, basicInfo.schemaGroup]);

    useEffect(() => {
        try {
            setRegisteredAddress(prev => {
                const countryId = prev?.country?.value ?? prev?.country ?? null;
                const stateId = prev?.state?.value ?? prev?.state ?? null;

                const countryOpt = countryId ? ((countryOptions || []).find(opt => String(opt.value) === String(countryId)) || { value: countryId, label: prev?.country?.label || '' }) : null;

                const stateOpt = stateId ? (
                    (stateOptions || []).find(opt => String(opt.value) === String(stateId))
                    || (commStateOptions || []).find(opt => String(opt.value) === String(stateId))
                    || { value: stateId, label: prev?.state?.label || '' }
                ) : null;

                // Only update if something changed to avoid re-renders
                if (countryOpt !== prev.country || stateOpt !== prev.state) {
                    return { ...prev, country: countryOpt || prev.country, state: stateOpt || prev.state };
                }
                return prev;
            });

            setCommunicationAddress(prev => {
                const countryId = prev?.country?.value ?? prev?.country ?? null;
                const stateId = prev?.state?.value ?? prev?.state ?? null;

                const countryOpt = countryId ? ((countryOptions || []).find(opt => String(opt.value) === String(countryId)) || { value: countryId, label: prev?.country?.label || '' }) : null;

                const stateOpt = stateId ? (
                    (commStateOptions || []).find(opt => String(opt.value) === String(stateId))
                    || (stateOptions || []).find(opt => String(opt.value) === String(stateId))
                    || { value: stateId, label: prev?.state?.label || '' }
                ) : null;

                if (countryOpt !== prev.country || stateOpt !== prev.state) {
                    return { ...prev, country: countryOpt || prev.country, state: stateOpt || prev.state };
                }
                return prev;
            });
        } catch (e) {
            // swallow - reconciliation is best-effort
        }
    }, [countryOptions, stateOptions, commStateOptions]);

    // update api

    const [errors, setErrors] = useState({});
    const [isChecked, setIsChecked] = useState(false); // Add this state to track checkbox
    // const [formSubmitted, setFormSubmitted] = useState(false);

    const handleCheckboxChange = () => {
        // make checkbox controlled and clear declaration errors when changed
        setIsChecked(prev => {
            const next = !prev;
            // clear declaration error when user toggles checkbox
            setErrors(errPrev => {
                const copy = { ...errPrev };
                if (copy.declaration) delete copy.declaration;
                return copy;
            });
            return next;
        });
    };

    // console.log("before update:",additionalDetails.classificationYear.value)
    const handleStatutoryInputChange = (code, value, id, statutory_detail_value) => {
        setStatutoryInputs(prev => ({
            ...prev,
            [code]: {
                ...prev[code],
                input: value,
                id: id,
            },
        }));
    };

    const handleStatutoryFileChange = (code, file, id, statutory_detail_value) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64String = reader.result.split(",")[1];

            const attachment = {
                filename: file.name,
                content: base64String,
                content_type: file.type,
            };

            // Update the statutoryInputs state with attachment
            setStatutoryInputs((prev) => ({
                ...prev,
                [code]: {
                    ...prev[code],
                    file: attachment, // Save attachment object instead of raw File
                    id: id,
                    // input: statutory_detail_value
                },
            }));
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };





    const statutoryPayload = Object.entries(statutoryInputs).map(
        ([code, { input, file, id }]) => ({
            id,
            // code,
            statutory_detail_value: input || null,
            statutory_detail_attachment: file || null,
        })
    );


    const validateStatutoryInputs = () => {
        const errors = {};

        Object.entries(statutoryInputs || {}).forEach(([code, { input, file }]) => {
            const inputValue = (input || "").toString().trim().toLowerCase();
            const isNotApplicable = inputValue === "not applicable";

            // Require file if input is provided and it's not 'not applicable'
            if (inputValue && !isNotApplicable && !file) {
                errors[code] = "Attachment is required.";
            }

            // Optional: You can add required input check too
            // if (!inputValue && !file) {
            //   errors[code] = "This field is required.";
            // }
        });

        return errors;
    };

    // Validation wrapper for Step 5 (Statutory Details)
    const validateStep5 = () => {
        if (isSectionVisible("statutory details")) {
            const errs = validateStatutoryInputs();
            // errs is keyed by statutory code when applicable
            setStatutoryErrors(errs || {});
            return Object.keys(errs || {}).length === 0;
        }
    };

    // Show star on Attachment when corresponding input has a value (and not 'not applicable')
    const shouldShowAttachmentStar = (code, defaultValue) => {
        const valueFromState = statutoryInputs?.[code]?.input;
        const effectiveValue =
            valueFromState !== undefined ? valueFromState : defaultValue;
        const normalized = (effectiveValue ?? "").toString().trim().toLowerCase();
        return normalized.length > 0 && normalized !== "not applicable";
    };











    const ppayload2 = {


        pms_supplier: {

            company_id: supplierShowData?.company_id || null,
            organization_name: basicInfo.vendorOrganizationName,

            cin_number: basicInfo.cin,
            cin_attachment: [basicInfo.cinAttachmentObj],

            llp_number: basicInfo.llp,
            llp_attachment: [basicInfo.llpAttachmentObj],

            type_of_organization_id: basicInfo.organizationType && basicInfo.organizationType.value ? basicInfo.organizationType.value : null,
            nature_of_business_id: basicInfo.natureOfBusiness,
            vendor_type: basicInfo.vendorType && basicInfo.vendorType.value ? basicInfo.vendorType.value : null,
            type_business_id: basicInfo.industryType && basicInfo.industryType.value ? basicInfo.industryType.value : null,
            type_of_work: basicInfo.typeOfWork,
            key_market: basicInfo.keyMarket,

            pan_number: basicInfo.panNo,
            pan_attachment: [basicInfo.panAttachmentObj],
            schema_group_id: basicInfo.schemaGroup,
            date_of_incorporation: basicInfo.dateOfIncorporation,



            gstin_applicable:
                basicInfo.gstinApplicable && basicInfo.gstinApplicable.value === 'Yes' ? true :
                    basicInfo.gstinApplicable && basicInfo.gstinApplicable.value === 'No' ? false :
                        null,
            gst_classification_id: basicInfo.gstinClassification?.value,
            gstin: basicInfo.gstinNo,
            gstin_attachmentObj: [basicInfo.gstinAttachment] || [basicInfo.gstinDeclaration],
            // gstin_declarationObj: basicInfo.gstinDeclaration,




            website: additionalDetails.website,
            delivery_lead_period: additionalDetails.deliveryLeadPeriod,
            specify_warranty_period: additionalDetails.warrantyPeriod,
            amc_provided: additionalDetails.amcProvided && additionalDetails.amcProvided.value ? additionalDetails.amcProvided.value : null,
            currency: additionalDetails.currencyType && additionalDetails.currencyType.value ? additionalDetails.currencyType.value : null,
            msme: additionalDetails.msmeUdyamApplicable && additionalDetails.msmeUdyamApplicable.value ? additionalDetails.msmeUdyamApplicable.value : null,
            einvoicing: additionalDetails.einvoice && additionalDetails.einvoice.value ? additionalDetails.einvoice.value : null,
            // einvoicing_declaration: additionalDetails.einvoiceDeclaration,
            einvoicing_attachments: [additionalDetails.einvoiceDeclaration],
            msme_no: additionalDetails.msmeNo,
            classification_year: additionalDetails.classificationYear && additionalDetails.classificationYear.value ? additionalDetails.classificationYear.value : null,
            major_activity: additionalDetails.majorActivity && additionalDetails.majorActivity.value ? additionalDetails.majorActivity.value : null,
            valid_from: additionalDetails.validFrom,
            valid_till: additionalDetails.validTill,
            enterprise: additionalDetails.msmeEnterpriseType && additionalDetails.msmeEnterpriseType.value ? additionalDetails.msmeEnterpriseType.value : null,
            msme_attachment: [additionalDetails.msmeAttachmentObj] || [additionalDetails.msmeDeclarationObj],
            // msme_declaration: additionalDetails.msmeDeclarationObj,

            office_address_attributes: mapRegisteredAddressToPayload(registeredAddress)[0] || {},
            communication_address_attributes: mapCommunicationAddressToPayload(communicationAddress)[0] || {},
            bank_details_attributes: bankDetailsList.map((item) => ({
                ...item,
                id: item.isNew ? null : item.id,
                attachment: item.isNew
                    ? bankAttachments[item.id] || null
                    : bankAttachments[item.id] || (item.attachment ? null : null),
            })),


            bank_details_attributes: bankDetailsList.map((item) => ({
                ...item,
                id: item.isNew ? null : item.id,

                attachment: item.isNew
                    ? bankAttachments[item.id] || null // If new attachment exists, pass it; otherwise, null
                    : bankAttachments[item.id] || (item.attachment ? null : null), // If existing, only pass null if no new file is uploaded
            })),

            branch_offices_attributes: mapBranchOfficesToPayload(branchOffices),
            contact_people_attributes: mapContactPersonsToPayload(contactPersons),
            directors_informations_attributes: mapOwnersToPayload(owners),
            factory_warehouses_attributes: mapWarehousesToPayload(warehouses),
            major_customers_attributes: mapMajorCustomersToPayload(majorCustomers),



            // annual_turnovers_attributes: [
            //   {
            //     id: null,
            //     financial_year: "2024-25",
            //     key_markets: "Domestic",
            //     turnover: "60 Cr",
            //     attachment: "turnover_statement2.pdf",
            //     _destroy: false
            //   }
            // ],


            annual_turnovers_attributes: annualTurnover.map(item => ({
                id: item.idPre || null,
                financial_year: item.year,
                key_markets: item.keyMarkets,
                turnover: item.turnover,
                attachment: [item.attachment],
                _destroy: false
            })),



            // vendor_re_kyc: {
            //   status: "completed"
            // }
        }
    }

    console.log("payloaddddddd*********:", ppayload2)


    // console.log("basic info:", basicInfo)

    // console.log("additional details:", additionalDetails)
    // console.log("supplier id:", supplierId)
    // Save as Draft function
    const saveDraft = async () => {
        const ppayload2 = {


            pms_supplier: {
                status: "draft",
                company_id: supplierShowData?.company_id || null,
                organization_name: basicInfo.vendorOrganizationName,

                cin_number: basicInfo.cin,
                cin_attachment: [basicInfo.cinAttachmentObj],

                llp_number: basicInfo.llp,
                llp_attachment: basicInfo.llpAttachmentObj,

                type_of_organization_id: basicInfo.organizationType && basicInfo.organizationType.value ? basicInfo.organizationType.value : null,
                nature_of_business_id: basicInfo.natureOfBusiness,
                vendor_type: basicInfo.vendorType && basicInfo.vendorType.value ? basicInfo.vendorType.value : null,
                type_business_id: basicInfo.industryType && basicInfo.industryType.value ? basicInfo.industryType.value : null,
                type_of_work: basicInfo.typeOfWork,
                key_market: basicInfo.keyMarket,

                pan_number: basicInfo.panNo,
                pan_attachment: basicInfo.panAttachmentObj,
                schema_group_id: basicInfo.schemaGroup,
                date_of_incorporation: basicInfo.dateOfIncorporation,



                gstin_applicable:
                    basicInfo.gstinApplicable && basicInfo.gstinApplicable.value === 'Yes' ? true :
                        basicInfo.gstinApplicable && basicInfo.gstinApplicable.value === 'No' ? false :
                            null,
                gst_classification_id: basicInfo.gstinClassification?.value,
                gstin: basicInfo.gstinNo,
                gstin_attachment: basicInfo.gstinAttachmentObj,
                gstin_declaration: basicInfo.gstinDeclarationObj,




                website: additionalDetails.website,
                delivery_lead_period: additionalDetails.deliveryLeadPeriod,
                specify_warranty_period: additionalDetails.warrantyPeriod,
                amc_provided: additionalDetails.amcProvided && additionalDetails.amcProvided.value ? additionalDetails.amcProvided.value : null,
                currency: additionalDetails.currencyType && additionalDetails.currencyType.value ? additionalDetails.currencyType.value : null,
                msme: additionalDetails.msmeUdyamApplicable && additionalDetails.msmeUdyamApplicable.value ? additionalDetails.msmeUdyamApplicable.value : null,
                einvoicing: additionalDetails.einvoice && additionalDetails.einvoice.value ? additionalDetails.einvoice.value : null,
                einvoicing_declaration: additionalDetails.einvoiceDeclaration,
                msme_no: additionalDetails.msmeNo,
                classification_year: additionalDetails.classificationYear && additionalDetails.classificationYear.value ? additionalDetails.classificationYear.value : null,
                major_activity: additionalDetails.majorActivity && additionalDetails.majorActivity.value ? additionalDetails.majorActivity.value : null,
                valid_from: additionalDetails.validFrom,
                valid_till: additionalDetails.validTill,
                enterprise: additionalDetails.msmeEnterpriseType && additionalDetails.msmeEnterpriseType.value ? additionalDetails.msmeEnterpriseType.value : null,
                msme_attachment: additionalDetails.msmeAttachmentObj,
                msme_declaration: additionalDetails.msmeDeclarationOb,

                // office_address_attributes: mapRegisteredAddressToPayload(registeredAddress),
                // communication_address_attributes: mapCommunicationAddressToPayload(communicationAddress),
                // bank_details_attributes: bankDetailsList.map((item) => ({
                //     ...item,
                //     id: item.isNew ? null : item.id,
                //     attachment: item.isNew
                //         ? bankAttachments[item.id] || null
                //         : bankAttachments[item.id] || (item.attachment ? null : null),
                // })),


                // bank_details_attributes: bankDetailsList.map((item) => ({
                //     ...item,
                //     id: item.isNew ? null : item.id,

                //     attachment: item.isNew
                //         ? bankAttachments[item.id] || null // If new attachment exists, pass it; otherwise, null
                //         : bankAttachments[item.id] || (item.attachment ? null : null), // If existing, only pass null if no new file is uploaded
                // })),

                // branch_offices_attributes: mapBranchOfficesToPayload(branchOffices),
                // contact_people_attributes: mapContactPersonsToPayload(contactPersons),
                // directors_informations_attributes: mapOwnersToPayload(owners),
                // factory_warehouses_attributes: mapWarehousesToPayload(warehouses),
                // major_customers_attributes: mapMajorCustomersToPayload(majorCustomers),



                // annual_turnovers_attributes: [
                //   {
                //     id: null,
                //     financial_year: "2024-25",
                //     key_markets: "Domestic",
                //     turnover: "60 Cr",
                //     attachment: "turnover_statement2.pdf",
                //     _destroy: false
                //   }
                // ],



                // vendor_re_kyc: {
                //   status: "completed"
                // }
            }
        }
        try {
            // Construct your payload here. Example:
            const payload = ppayload2
            // {
            //     basicInfo,
            //     additionalDetails,
            //     registeredAddress,
            //     communicationAddress,
            //     turnover,
            //     // Add other sections as needed
            // };
            const response = await axios.patch(`${baseURL}/pms/suppliers/${supplierId}/update_api.json?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414`, payload);
            toast.success('Draft saved successfully!');
        } catch (error) {
            toast.error('Failed to save draft.');
            console.error('Save draft error:', error);
        }
    };


    // console.log("llp attach", [basicInfo.llpAttachmentObj])
    // console.log("cin attach", [basicInfo.cinAttachmentObj])

    const saveDraftStep1 = async () => {
        setLoading2(true)
        const payload = {
            pms_supplier: {
                status: "draft",
                company_id: supplierShowData?.company_id || null,
                organization_name: basicInfo.vendorOrganizationName,

                cin_number: basicInfo.cin,
                cin_number_attachments: [basicInfo.cinAttachmentObj],

                llp_number: basicInfo.llp,
                llp_attachment: [basicInfo.llpAttachmentObj],

                type_of_organization_id: basicInfo.organizationType && basicInfo.organizationType.value ? basicInfo.organizationType.value : null,
                nature_of_business_id: basicInfo.natureOfBusiness,
                supplier_type_id: basicInfo.vendorType && basicInfo.vendorType.value ? basicInfo.vendorType.value : null,
                type_business_id: basicInfo.industryType && basicInfo.industryType.value ? basicInfo.industryType.value : null,
                type_of_work: basicInfo.typeOfWork,
                key_market: basicInfo.keyMarket,

                pan_number: basicInfo.panNo,
                pan_attachment: [basicInfo.panAttachmentObj],
                schema_group_id: basicInfo.schemaGroup,
                date_of_incorporation: basicInfo.dateOfIncorporation,



                gstin_applicable:
                    basicInfo.gstinApplicable && basicInfo.gstinApplicable.value === 'Yes' ? true :
                        basicInfo.gstinApplicable && basicInfo.gstinApplicable.value === 'No' ? false :
                            null,
                gst_classification_id: basicInfo.gstinClassification?.value,
                gstin: basicInfo.gstinNo,
                gstin_attachment: [basicInfo.gstinAttachmentObj] || [basicInfo.gstinDeclarationObj],
                // gstin_declaration: basicInfo.gstinDeclarationObj,




                website: additionalDetails.website,
                delivery_lead_period: additionalDetails.deliveryLeadPeriod,
                specify_warranty_period: additionalDetails.warrantyPeriod,
                amc_provided: additionalDetails.amcProvided && additionalDetails.amcProvided.value ? additionalDetails.amcProvided.value : null,
                currency: additionalDetails.currencyType && additionalDetails.currencyType.value ? additionalDetails.currencyType.value : null,
                msme: additionalDetails.msmeUdyamApplicable && additionalDetails.msmeUdyamApplicable.value ? additionalDetails.msmeUdyamApplicable.value : null,
                einvoicing: additionalDetails.einvoice && additionalDetails.einvoice.value ? additionalDetails.einvoice.value : null,
                einvoicing_attachments: [additionalDetails.einvoiceDeclaration],
                msme_no: additionalDetails.msmeNo,
                classification_year: additionalDetails.classificationYear && additionalDetails.classificationYear.value ? additionalDetails.classificationYear.value : null,
                major_activity: additionalDetails.majorActivity && additionalDetails.majorActivity.value ? additionalDetails.majorActivity.value : null,
                valid_from: additionalDetails.validFrom,
                valid_till: additionalDetails.validTill,
                enterprise: additionalDetails.msmeEnterpriseType && additionalDetails.msmeEnterpriseType.value ? additionalDetails.msmeEnterpriseType.value : null,
                msme_attachment: [additionalDetails.msmeAttachmentObj] || [additionalDetails.msmeDeclarationObj],
                // msme_declaration: additionalDetails.msmeDeclarationOb,
            }
        };
        try {
            await axios.patch(`${baseURL}/pms/suppliers/${supplierId}/update_api.json?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414`, payload);
            toast.success('Step 2 draft saved!');
            // mark this step completed and move to next
            setCompleted((arr) => {
                const copy = [...arr];
                copy[currentStep] = true;
                return copy;
            });
            setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
        } catch (error) {
            toast.error('Failed to save Step 1 draft.');
        } finally {
            setLoading2(false);
        }
    };

    // console.log("add:", registeredAddress,communicationAddress, mapRegisteredAddressToPayload(registeredAddress))

    // console.log("base info:", basicInfo)
    const saveDraftStep2 = async () => {
        setLoading2(true)
        console.log("sameAsRegistered value:", sameAsRegistered);
        const commAddrPayload = mapCommunicationAddressToPayload(communicationAddress, sameAsRegistered)[0] || {};
        console.log("communication_address_attributes:", commAddrPayload);
        const payload = {
            pms_supplier: {
                status: "draft",
                company_id: supplierShowData?.company_id || null,
                organization_name: basicInfo.vendorOrganizationName,

                cin_number: basicInfo.cin,
                cin_number_attachments: [basicInfo.cinAttachmentObj],

                llp_number: basicInfo.llp,
                llp_attachment: [basicInfo.llpAttachmentObj],

                type_of_organization_id: basicInfo.organizationType && basicInfo.organizationType.value ? basicInfo.organizationType.value : null,
                nature_of_business_id: basicInfo.natureOfBusiness,
                supplier_type_id: basicInfo.vendorType && basicInfo.vendorType.value ? basicInfo.vendorType.value : null,
                type_business_id: basicInfo.industryType && basicInfo.industryType.value ? basicInfo.industryType.value : null,
                type_of_work: basicInfo.typeOfWork,
                key_market: basicInfo.keyMarket,

                pan_number: basicInfo.panNo,
                pan_attachment: [basicInfo.panAttachmentObj],
                schema_group_id: basicInfo.schemaGroup,
                date_of_incorporation: basicInfo.dateOfIncorporation,
                gstin_applicable:
                    basicInfo.gstinApplicable && basicInfo.gstinApplicable.value === 'Yes' ? true :
                        basicInfo.gstinApplicable && basicInfo.gstinApplicable.value === 'No' ? false :
                            null,
                gst_classification_id: basicInfo.gstinClassification?.value,
                gstin: basicInfo.gstinNo,
                gstin_attachment: [basicInfo.gstinAttachmentObj] || [basicInfo.gstinDeclarationObj],
                // gstin_declaration: basicInfo.gstinDeclarationObj,

                website: additionalDetails.website,
                delivery_lead_period: additionalDetails.deliveryLeadPeriod,
                specify_warranty_period: additionalDetails.warrantyPeriod,
                amc_provided: additionalDetails.amcProvided && additionalDetails.amcProvided.value ? additionalDetails.amcProvided.value : null,
                currency: additionalDetails.currencyType && additionalDetails.currencyType.value ? additionalDetails.currencyType.value : null,
                msme: additionalDetails.msmeUdyamApplicable && additionalDetails.msmeUdyamApplicable.value ? additionalDetails.msmeUdyamApplicable.value : null,
                einvoicing: additionalDetails.einvoice && additionalDetails.einvoice.value ? additionalDetails.einvoice.value : null,
                // einvoicing_declaration: additionalDetails.einvoiceDeclaration,
                einvoicing_attachments: [additionalDetails.einvoiceDeclaration],
                msme_no: additionalDetails.msmeNo,
                classification_year: additionalDetails.classificationYear && additionalDetails.classificationYear.value ? additionalDetails.classificationYear.value : null,
                major_activity: additionalDetails.majorActivity && additionalDetails.majorActivity.value ? additionalDetails.majorActivity.value : null,
                valid_from: additionalDetails.validFrom,
                valid_till: additionalDetails.validTill,
                enterprise: additionalDetails.msmeEnterpriseType && additionalDetails.msmeEnterpriseType.value ? additionalDetails.msmeEnterpriseType.value : null,
                msme_attachment: [additionalDetails.msmeAttachmentObj] || [additionalDetails.msmeDeclarationObj],
                // msme_declaration: additionalDetails.msmeDeclarationObj,

                // office_address_attributes: mapRegisteredAddressToPayload(registeredAddress),
                // communication_address_attributes: mapCommunicationAddressToPayload(communicationAddress),
                office_address_attributes: mapRegisteredAddressToPayload(registeredAddress)[0] || {},
                communication_address_attributes: commAddrPayload,
            }
        };
        console.log(" payload for address step:", payload)
        try {
            await axios.patch(`${baseURL}/pms/suppliers/${supplierId}/update_api.json?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414`, payload);
            toast.success('Step 3 draft saved!');
            // mark this step completed and move to next
            setCompleted((arr) => {
                const copy = [...arr];
                copy[currentStep] = true;
                return copy;
            });
            setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
        } catch (error) {
            toast.error('Failed to save Step 3  draft.');
        } finally {
            setLoading2(false);
        }
    };


    const saveDraftStep3 = async () => {
        setLoading2(true)
        console.log("sameAsRegistered value:", sameAsRegistered);
        const commAddrPayload = mapCommunicationAddressToPayload(communicationAddress, sameAsRegistered)[0] || {};
        console.log("communication_address_attributes:", commAddrPayload);
        const payload = {
            pms_supplier: {
                status: "draft",
                company_id: supplierShowData?.company_id || null,
                organization_name: basicInfo.vendorOrganizationName,

                cin_number: basicInfo.cin,
                cin_number_attachments: [basicInfo.cinAttachmentObj],

                llp_number: basicInfo.llp,
                llp_attachment: [basicInfo.llpAttachmentObj],

                type_of_organization_id: basicInfo.organizationType && basicInfo.organizationType.value ? basicInfo.organizationType.value : null,
                nature_of_business_id: basicInfo.natureOfBusiness,
                supplier_type_id: basicInfo.vendorType && basicInfo.vendorType.value ? basicInfo.vendorType.value : null,
                type_business_id: basicInfo.industryType && basicInfo.industryType.value ? basicInfo.industryType.value : null,
                type_of_work: basicInfo.typeOfWork,
                key_market: basicInfo.keyMarket,

                pan_number: basicInfo.panNo,
                pan_attachment: [basicInfo.panAttachmentObj],
                schema_group_id: basicInfo.schemaGroup,
                date_of_incorporation: basicInfo.dateOfIncorporation,
                gstin_applicable:
                    basicInfo.gstinApplicable && basicInfo.gstinApplicable.value === 'Yes' ? true :
                        basicInfo.gstinApplicable && basicInfo.gstinApplicable.value === 'No' ? false :
                            null,
                gst_classification_id: basicInfo.gstinClassification?.value,
                gstin: basicInfo.gstinNo,
                gstin_attachment: [basicInfo.gstinAttachmentObj] || [basicInfo.gstinDeclarationObj],
                // gstin_declaration: basicInfo.gstinDeclarationObj,

                website: additionalDetails.website,
                delivery_lead_period: additionalDetails.deliveryLeadPeriod,
                specify_warranty_period: additionalDetails.warrantyPeriod,
                amc_provided: additionalDetails.amcProvided,
                currency: additionalDetails.currencyType && additionalDetails.currencyType.value ? additionalDetails.currencyType.value : null,
                msme: additionalDetails.msmeUdyamApplicable && additionalDetails.msmeUdyamApplicable.value ? additionalDetails.msmeUdyamApplicable.value : null,
                einvoicing: additionalDetails.einvoice && additionalDetails.einvoice.value ? additionalDetails.einvoice.value : null,
                // einvoicing_declaration: additionalDetails.einvoiceDeclaration,
                einvoicing_attachments: [additionalDetails.einvoiceDeclaration],
                msme_no: additionalDetails.msmeNo,
                classification_year: additionalDetails.classificationYear && additionalDetails.classificationYear.value ? additionalDetails.classificationYear.value : null,
                major_activity: additionalDetails.majorActivity && additionalDetails.majorActivity.value ? additionalDetails.majorActivity.value : null,
                valid_from: additionalDetails.validFrom,
                valid_till: additionalDetails.validTill,
                enterprise: additionalDetails.msmeEnterpriseType && additionalDetails.msmeEnterpriseType.value ? additionalDetails.msmeEnterpriseType.value : null,

                msme_attachment: [additionalDetails.msmeAttachmentObj] || [additionalDetails.msmeDeclarationObj],
                // msme_declaration: additionalDetails.msmeDeclarationObj,

                // office_address_attributes: mapRegisteredAddressToPayload(registeredAddress),
                // communication_address_attributes: mapCommunicationAddressToPayload(communicationAddress),
                // office_address_attributes: mapRegisteredAddressToPayload(registeredAddress)[0] || {},
                // communication_address_attributes: commAddrPayload,

                bank_details_attributes: bankDetailsList.map((item) => ({
                    ...item,
                    id: item.isNew ? null : item.id,
                    attachment: item.isNew
                        ? bankAttachments[item.id] || null
                        : bankAttachments[item.id] || (item.attachment ? null : null),
                })),
            }
        };
        try {
            await axios.patch(`${baseURL}/pms/suppliers/${supplierId}/update_api.json?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414`, payload);
            toast.success('Step 4 draft saved!');
            // mark this step completed and move to next
            setCompleted((arr) => {
                const copy = [...arr];
                copy[currentStep] = true;
                return copy;
            });
            setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
        } catch (error) {
            toast.error('Failed to save Step 4 draft.');
        } finally {
            setLoading2(false);
        }
    };

    const saveDraftStep4 = async () => {
        setLoading2(true)
        console.log("sameAsRegistered value:", sameAsRegistered);
        const commAddrPayload = mapCommunicationAddressToPayload(communicationAddress, sameAsRegistered)[0] || {};
        console.log("communication_address_attributes:", commAddrPayload);
        const payload = {
            pms_supplier: {
                status: "draft",
                company_id: supplierShowData?.company_id || null,
                organization_name: basicInfo.vendorOrganizationName,

                cin_number: basicInfo.cin,
                cin_attachment: [basicInfo.cinAttachmentObj],

                llp_number: basicInfo.llp,
                llp_attachment: [basicInfo.llpAttachmentObj],

                type_of_organization_id: basicInfo.organizationType && basicInfo.organizationType.value ? basicInfo.organizationType.value : null,
                nature_of_business_id: basicInfo.natureOfBusiness,
                supplier_type_id: basicInfo.vendorType && basicInfo.vendorType.value ? basicInfo.vendorType.value : null,
                type_business_id: basicInfo.industryType && basicInfo.industryType.value ? basicInfo.industryType.value : null,
                type_of_work: basicInfo.typeOfWork,
                key_market: basicInfo.keyMarket,

                pan_number: basicInfo.panNo,
                pan_attachment: [basicInfo.panAttachmentObj],
                schema_group_id: basicInfo.schemaGroup,
                date_of_incorporation: basicInfo.dateOfIncorporation,
                gstin_applicable:
                    basicInfo.gstinApplicable && basicInfo.gstinApplicable.value === 'Yes' ? true :
                        basicInfo.gstinApplicable && basicInfo.gstinApplicable.value === 'No' ? false :
                            null,
                gst_classification_id: basicInfo.gstinClassification?.value,
                gstin: basicInfo.gstinNo,
                gstin_attachment: [basicInfo.gstinAttachmentObj] || [basicInfo.gstinDeclarationObj],
                // gstin_declaration: basicInfo.gstinDeclarationObj,

                website: additionalDetails.website,
                delivery_lead_period: additionalDetails.deliveryLeadPeriod,
                specify_warranty_period: additionalDetails.warrantyPeriod,
                amc_provided: additionalDetails.amcProvided,
                currency: additionalDetails.currencyType && additionalDetails.currencyType.value ? additionalDetails.currencyType.value : null,
                msme: additionalDetails.msmeUdyamApplicable && additionalDetails.msmeUdyamApplicable.value ? additionalDetails.msmeUdyamApplicable.value : null,
                einvoicing: additionalDetails.einvoice && additionalDetails.einvoice.value ? additionalDetails.einvoice.value : null,
                // einvoicing_declaration: additionalDetails.einvoiceDeclaration,
                einvoicing_attachments: [additionalDetails.einvoiceDeclaration],
                msme_no: additionalDetails.msmeNo,
                classification_year: additionalDetails.classificationYear && additionalDetails.classificationYear.value ? additionalDetails.classificationYear.value : null,
                major_activity: additionalDetails.majorActivity && additionalDetails.majorActivity.value ? additionalDetails.majorActivity.value : null,
                valid_from: additionalDetails.validFrom,
                valid_till: additionalDetails.validTill,
                enterprise: additionalDetails.msmeEnterpriseType && additionalDetails.msmeEnterpriseType.value ? additionalDetails.msmeEnterpriseType.value : null,

                msme_attachment: [additionalDetails.msmeAttachmentObj] || [additionalDetails.msmeDeclarationObj],
                // msme_declaration: additionalDetails.msmeDeclarationObj,

                // office_address_attributes: mapRegisteredAddressToPayload(registeredAddress),
                // communication_address_attributes: mapCommunicationAddressToPayload(communicationAddress),
                // office_address_attributes: mapRegisteredAddressToPayload(registeredAddress)[0] || {},
                // communication_address_attributes: commAddrPayload,

                // bank_details_attributes: bankDetailsList.map((item) => ({
                //     ...item,
                //     id: item.isNew ? null : item.id,
                //     attachment: item.isNew
                //         ? bankAttachments[item.id] || null
                //         : bankAttachments[item.id] || (item.attachment ? null : null),
                // })),

                branch_offices_attributes: mapBranchOfficesToPayload(branchOffices),
                contact_people_attributes: mapContactPersonsToPayload(contactPersons),
                directors_informations_attributes: mapOwnersToPayload(owners),
                factory_warehouses_attributes: mapWarehousesToPayload(warehouses),
                major_customers_attributes: mapMajorCustomersToPayload(majorCustomers),
                annual_turnovers_attributes: annualTurnover.map(item => ({
                    id: item.idPre || null,
                    financial_year: item.year,
                    key_markets: item.keyMarkets,
                    turnover: item.turnover,
                    attachment: [item.attachment],
                    _destroy: false
                })),
            }
        };
        try {
            await axios.patch(`${baseURL}/pms/suppliers/${supplierId}/update_api.json?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414`, payload);
            toast.success('Step 5 draft saved!');
            setCompleted((arr) => {
                const copy = [...arr];
                copy[currentStep] = true;
                return copy;
            });
            setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
        } catch (error) {
            toast.error('Failed to save Step 5 draft.');
        } finally {
            setLoading2(false);
        }
    };


    const saveDraftStep5 = async () => {
        setLoading2(true)
        console.log("sameAsRegistered value:", sameAsRegistered);
        const commAddrPayload = mapCommunicationAddressToPayload(communicationAddress, sameAsRegistered)[0] || {};
        console.log("communication_address_attributes:", commAddrPayload);
        const payload = {
            pms_supplier: {
                status: "draft",
                company_id: supplierShowData?.company_id || null,
                organization_name: basicInfo.vendorOrganizationName,

                cin_number: basicInfo.cin,
                cin_attachment: [basicInfo.cinAttachmentObj],

                llp_number: basicInfo.llp,
                llp_attachment: [basicInfo.llpAttachmentObj],

                type_of_organization_id: basicInfo.organizationType && basicInfo.organizationType.value ? basicInfo.organizationType.value : null,
                nature_of_business_id: basicInfo.natureOfBusiness,
                supplier_type_id: basicInfo.vendorType && basicInfo.vendorType.value ? basicInfo.vendorType.value : null,
                type_business_id: basicInfo.industryType && basicInfo.industryType.value ? basicInfo.industryType.value : null,
                type_of_work: basicInfo.typeOfWork,
                key_market: basicInfo.keyMarket,

                pan_number: basicInfo.panNo,
                pan_attachment: [basicInfo.panAttachmentObj],
                schema_group_id: basicInfo.schemaGroup,
                date_of_incorporation: basicInfo.dateOfIncorporation,
                gstin_applicable:
                    basicInfo.gstinApplicable && basicInfo.gstinApplicable.value === 'Yes' ? true :
                        basicInfo.gstinApplicable && basicInfo.gstinApplicable.value === 'No' ? false :
                            null,
                gst_classification_id: basicInfo.gstinClassification?.value,
                gstin: basicInfo.gstinNo,
                gstin_attachment: [basicInfo.gstinAttachmentObj] || [basicInfo.gstinDeclarationObj],
                // gstin_declaration: basicInfo.gstinDeclarationObj,

                website: additionalDetails.website,
                delivery_lead_period: additionalDetails.deliveryLeadPeriod,
                specify_warranty_period: additionalDetails.warrantyPeriod,
                amc_provided: additionalDetails.amcProvided,
                currency: additionalDetails.currencyType && additionalDetails.currencyType.value ? additionalDetails.currencyType.value : null,
                msme: additionalDetails.msmeUdyamApplicable && additionalDetails.msmeUdyamApplicable.value ? additionalDetails.msmeUdyamApplicable.value : null,
                einvoicing: additionalDetails.einvoice && additionalDetails.einvoice.value ? additionalDetails.einvoice.value : null,
                // einvoicing_declaration: additionalDetails.einvoiceDeclaration,
                einvoicing_attachments: [additionalDetails.einvoiceDeclaration],
                msme_no: additionalDetails.msmeNo,
                classification_year: additionalDetails.classificationYear && additionalDetails.classificationYear.value ? additionalDetails.classificationYear.value : null,
                major_activity: additionalDetails.majorActivity && additionalDetails.majorActivity.value ? additionalDetails.majorActivity.value : null,
                valid_from: additionalDetails.validFrom,
                valid_till: additionalDetails.validTill,
                enterprise: additionalDetails.msmeEnterpriseType && additionalDetails.msmeEnterpriseType.value ? additionalDetails.msmeEnterpriseType.value : null,

                msme_attachment: [additionalDetails.msmeAttachmentObj] || [additionalDetails.msmeDeclarationObj],
                // msme_declaration: additionalDetails.msmeDeclarationObj,

                que1: questions.expertise,
                // question1_attachment: questions.expertiseAttachment,
                que2: questions.structure,

                // office_address_attributes: mapRegisteredAddressToPayload(registeredAddress),
                // communication_address_attributes: mapCommunicationAddressToPayload(communicationAddress),
                // office_address_attributes: mapRegisteredAddressToPayload(registeredAddress)[0] || {},
                // communication_address_attributes: commAddrPayload,

                // bank_details_attributes: bankDetailsList.map((item) => ({
                //     ...item,
                //     id: item.isNew ? null : item.id,
                //     attachment: item.isNew
                //         ? bankAttachments[item.id] || null
                //         : bankAttachments[item.id] || (item.attachment ? null : null),
                // })),

                // branch_offices_attributes: mapBranchOfficesToPayload(branchOffices),
                // contact_people_attributes: mapContactPersonsToPayload(contactPersons),
                // directors_informations_attributes: mapOwnersToPayload(owners),
                // factory_warehouses_attributes: mapWarehousesToPayload(warehouses),
                // major_customers_attributes: mapMajorCustomersToPayload(majorCustomers),
                // annual_turnovers_attributes: annualTurnover.map(item => ({
                //     id: item.idPre || null,
                //     financial_year: item.year,
                //     key_markets: item.keyMarkets,
                //     turnover: item.turnover,
                //     attachment: [item.attachment],
                //     destroy: false
                // })),


                statutory_details: statutoryPayload || []



            }
        };
        try {
            await axios.patch(`${baseURL}/pms/suppliers/${supplierId}/update_api.json?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414`, payload);
            toast.success('Step 6 draft saved!');
            setCompleted((arr) => {
                const copy = [...arr];
                copy[currentStep] = true;
                return copy;
            });
            setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
        } catch (error) {
            toast.error('Failed to save Step 6 draft.');
        } finally {
            setLoading2(false);
        }
    };

    // console.log("checklist :", checklistPayload)
    const saveDraftStep6 = async () => {
        setLoading2(true)
        console.log("sameAsRegistered value:", sameAsRegistered);
        const commAddrPayload = mapCommunicationAddressToPayload(communicationAddress, sameAsRegistered)[0] || {};
        // console.log("communication_address_attributes:", commAddrPayload);
        const payload = {
            pms_supplier: {
                status: "draft",
                company_id: supplierShowData?.company_id || null,
                organization_name: basicInfo.vendorOrganizationName,

                cin_number: basicInfo.cin,
                cin_attachment: [basicInfo.cinAttachmentObj],

                llp_number: basicInfo.llp,
                llp_attachment: [basicInfo.llpAttachmentObj],

                type_of_organization_id: basicInfo.organizationType && basicInfo.organizationType.value ? basicInfo.organizationType.value : null,
                nature_of_business_id: basicInfo.natureOfBusiness,
                supplier_type_id: basicInfo.vendorType && basicInfo.vendorType.value ? basicInfo.vendorType.value : null,
                type_business_id: basicInfo.industryType && basicInfo.industryType.value ? basicInfo.industryType.value : null,
                type_of_work: basicInfo.typeOfWork,
                key_market: basicInfo.keyMarket,

                pan_number: basicInfo.panNo,
                pan_attachment: [basicInfo.panAttachmentObj],
                schema_group_id: basicInfo.schemaGroup,
                date_of_incorporation: basicInfo.dateOfIncorporation,
                gstin_applicable:
                    basicInfo.gstinApplicable && basicInfo.gstinApplicable.value === 'Yes' ? true :
                        basicInfo.gstinApplicable && basicInfo.gstinApplicable.value === 'No' ? false :
                            null,
                gst_classification_id: basicInfo.gstinClassification?.value,
                gstin: basicInfo.gstinNo,
                gstin_attachment: [basicInfo.gstinAttachmentObj] || [basicInfo.gstinDeclarationObj],
                // gstin_declaration: basicInfo.gstinDeclarationObj,

                website: additionalDetails.website,
                delivery_lead_period: additionalDetails.deliveryLeadPeriod,
                specify_warranty_period: additionalDetails.warrantyPeriod,
                amc_provided: additionalDetails.amcProvided,
                currency: additionalDetails.currencyType && additionalDetails.currencyType.value ? additionalDetails.currencyType.value : null,
                msme: additionalDetails.msmeUdyamApplicable && additionalDetails.msmeUdyamApplicable.value ? additionalDetails.msmeUdyamApplicable.value : null,
                einvoicing: additionalDetails.einvoice && additionalDetails.einvoice.value ? additionalDetails.einvoice.value : null,
                // einvoicing_declaration: additionalDetails.einvoiceDeclaration,
                einvoicing_attachments: [additionalDetails.einvoiceDeclaration],
                msme_no: additionalDetails.msmeNo,
                classification_year: additionalDetails.classificationYear && additionalDetails.classificationYear.value ? additionalDetails.classificationYear.value : null,
                major_activity: additionalDetails.majorActivity && additionalDetails.majorActivity.value ? additionalDetails.majorActivity.value : null,
                valid_from: additionalDetails.validFrom,
                valid_till: additionalDetails.validTill,
                enterprise: additionalDetails.msmeEnterpriseType && additionalDetails.msmeEnterpriseType.value ? additionalDetails.msmeEnterpriseType.value : null,

                msme_attachment: [additionalDetails.msmeAttachmentObj] || [additionalDetails.msmeDeclarationObj],
                // msme_declaration: additionalDetails.msmeDeclarationObj,

                // que1: questions.expertise,
                // // question1_attachment: questions.expertiseAttachment,
                // que2: questions.structure,

                // office_address_attributes: mapRegisteredAddressToPayload(registeredAddress),
                // communication_address_attributes: mapCommunicationAddressToPayload(communicationAddress),
                // office_address_attributes: mapRegisteredAddressToPayload(registeredAddress)[0] || {},
                // communication_address_attributes: commAddrPayload,

                // bank_details_attributes: bankDetailsList.map((item) => ({
                //     ...item,
                //     id: item.isNew ? null : item.id,
                //     attachment: item.isNew
                //         ? bankAttachments[item.id] || null
                //         : bankAttachments[item.id] || (item.attachment ? null : null),
                // })),

                // branch_offices_attributes: mapBranchOfficesToPayload(branchOffices),
                // contact_people_attributes: mapContactPersonsToPayload(contactPersons),
                // directors_informations_attributes: mapOwnersToPayload(owners),
                // factory_warehouses_attributes: mapWarehousesToPayload(warehouses),
                // major_customers_attributes: mapMajorCustomersToPayload(majorCustomers),
                // annual_turnovers_attributes: annualTurnover.map(item => ({
                //     id: item.idPre || null,
                //     financial_year: item.year,
                //     key_markets: item.keyMarkets,
                //     turnover: item.turnover,
                //     attachment: [item.attachment],
                //     destroy: false
                // })),


                // statutory_details: statutoryPayload || [],
                checklist: checklistPayload



            }
        };
        try {
            await axios.patch(`${baseURL}/pms/suppliers/${supplierId}/update_api.json?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414`, payload);
            toast.success('Step 7 draft saved!');
            setCompleted((arr) => {
                const copy = [...arr];
                copy[currentStep] = true;
                return copy;
            });
            setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
        } catch (error) {
            toast.error('Failed to save Step 7 draft.');
        } finally {
            setLoading2(false);
        }
    };
    // Repeat for other steps...



    // console.log("com add::",mapCommunicationAddressToPayload(communicationAddress))

    // console.log("same key add",sameAsRegistered)




    // Handle the Update Button Click
    const handleUpdate = async () => {

        const commAddrPayload = mapCommunicationAddressToPayload(communicationAddress, sameAsRegistered)[0] || {};
        // Validate declaration checkbox
        if (!isChecked) {
            setErrors(prev => ({ ...prev, declaration: 'Please accept the declaration to continue.' }));
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        // Validate each declaration question and collect per-question errors
        const declarationQuestionErrors = {};
        supplierDeclarations.forEach(d => {
            const qNum = Number(d.question_number);
            // unanswered option
            if (!d.selected_option || String(d.selected_option).trim() === '') {
                declarationQuestionErrors[d.question_id] = 'Please select an option.';
            }
            // explanation required for Q1 & Q2 when answered Yes (case-insensitive)
            const selected = String(d.selected_option || '').toLowerCase();
            if ((qNum === 1 || qNum === 2) && selected === 'yes') {
                if (!d.explanation || !d.explanation.trim()) {
                    declarationQuestionErrors[d.question_id] = `Please provide explanation for question ${qNum}.`;
                }
            }
        });

        if (Object.keys(declarationQuestionErrors).length > 0) {
            setErrors(prev => ({ ...prev, declaration: 'Please correct the highlighted declaration fields.', declarationQuestions: declarationQuestionErrors }));
            // scroll to top so user sees the summary and can spot inline errors
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        // Map supplierDeclarations into simple questionN_checked and questionN fields
        const declarationFields = {};
        supplierDeclarations.forEach(d => {
            const qNum = Number(d.question_number);
            const checked = String(d.selected_option || '').toLowerCase() === 'yes' ? 'yes' : 'no';
            declarationFields[`question${qNum}_checked`] = checked;
            // store explanation if provided (only Q1 & Q2 will typically have explanations)
            declarationFields[`question${qNum}`] = d.explanation ? d.explanation : '';
        });


        setLoading(true);
        const payload = {
            pms_supplier: {
                status: "details_submitted_by_vendor",
                // company_id: supplierShowData?.company_id || null,
                // organization_name: basicInfo.vendorOrganizationName,

                // cin_number: basicInfo.cin,
                // cin_attachment: [basicInfo.cinAttachmentObj],

                // llp_number: basicInfo.llp,
                // llp_attachment: [basicInfo.llpAttachmentObj],

                // type_of_organization_id: basicInfo.organizationType && basicInfo.organizationType.value ? basicInfo.organizationType.value : null,
                // nature_of_business_id: basicInfo.natureOfBusiness,
                // supplier_type_id: basicInfo.vendorType && basicInfo.vendorType.value ? basicInfo.vendorType.value : null,
                // type_business_id: basicInfo.industryType && basicInfo.industryType.value ? basicInfo.industryType.value : null,
                // type_of_work: basicInfo.typeOfWork,
                // key_market: basicInfo.keyMarket,

                // pan_number: basicInfo.panNo,
                // pan_attachment: [basicInfo.panAttachmentObj],
                // schema_group_id: basicInfo.schemaGroup,
                // date_of_incorporation: basicInfo.dateOfIncorporation,
                // gstin_applicable:
                //     basicInfo.gstinApplicable && basicInfo.gstinApplicable.value === 'Yes' ? true :
                //         basicInfo.gstinApplicable && basicInfo.gstinApplicable.value === 'No' ? false :
                //             null,
                // gst_classification_id: basicInfo.gstinClassification?.value,
                // gstin: basicInfo.gstinNo,
                // gstin_attachment: [basicInfo.gstinAttachmentObj] || [basicInfo.gstinDeclarationObj],
                // gstin_declaration: basicInfo.gstinDeclarationObj,

                // website: additionalDetails.website,
                // delivery_lead_period: additionalDetails.deliveryLeadPeriod,
                // specify_warranty_period: additionalDetails.warrantyPeriod,
                // amc_provided: additionalDetails.amcProvided,
                // currency: additionalDetails.currencyType && additionalDetails.currencyType.value ? additionalDetails.currencyType.value : null,
                // msme: additionalDetails.msmeUdyamApplicable && additionalDetails.msmeUdyamApplicable.value ? additionalDetails.msmeUdyamApplicable.value : null,
                // einvoicing: additionalDetails.einvoice && additionalDetails.einvoice.value ? additionalDetails.einvoice.value : null,
                // einvoicing_declaration: additionalDetails.einvoiceDeclaration,
                // einvoicing_attachments: [additionalDetails.einvoiceDeclaration],
                // msme_no: additionalDetails.msmeNo,
                // classification_year: additionalDetails.classificationYear && additionalDetails.classificationYear.value ? additionalDetails.classificationYear.value : null,
                // major_activity: additionalDetails.majorActivity && additionalDetails.majorActivity.value ? additionalDetails.majorActivity.value : null,
                // valid_from: additionalDetails.validFrom,
                // valid_till: additionalDetails.validTill,
                // enterprise: additionalDetails.msmeEnterpriseType && additionalDetails.msmeEnterpriseType.value ? additionalDetails.msmeEnterpriseType.value : null,

                // msme_attachment: [additionalDetails.msmeAttachmentObj] || [additionalDetails.msmeDeclarationObj],
                // msme_declaration: additionalDetails.msmeDeclarationObj,

                // que1: questions.expertise,
                // question1_attachment: questions.expertiseAttachment,
                // que2: questions.structure,
                // include declaration flattened fields


                // office_address_attributes: mapRegisteredAddressToPayload(registeredAddress),
                // communication_address_attributes: mapCommunicationAddressToPayload(communicationAddress),
                // office_address_attributes: mapRegisteredAddressToPayload(registeredAddress)[0] || {},
                // communication_address_attributes: commAddrPayload,

                // bank_details_attributes: bankDetailsList.map((item) => ({
                //     ...item,
                //     id: item.isNew ? null : item.id,
                //     attachment: item.isNew
                //         ? bankAttachments[item.id] || null
                //         : bankAttachments[item.id] || (item.attachment ? null : null),
                // })),

                // branch_offices_attributes: mapBranchOfficesToPayload(branchOffices),
                // contact_people_attributes: mapContactPersonsToPayload(contactPersons),
                // directors_informations_attributes: mapOwnersToPayload(owners),
                // factory_warehouses_attributes: mapWarehousesToPayload(warehouses),
                // major_customers_attributes: mapMajorCustomersToPayload(majorCustomers),
                // annual_turnovers_attributes: annualTurnover.map(item => ({
                //     id: item.idPre || null,
                //     financial_year: item.year,
                //     key_markets: item.keyMarkets,
                //     turnover: [item.turnover],
                //     attachment: item.attachment,
                //     destroy: false
                // })),


                // statutory_details: statutoryPayload || [],
                // checklist: checklistPayload

                ...declarationFields,

            }
        };
        try {
            const response = await axios.patch(
                `${baseURL}/pms/suppliers/${supplierId}/update_api.json?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414`, payload
            );

            console.log("Response:", response.data); // Check the response data
            // await fetchSupplierData();
            if (response.status === 200) {
                toast.success("Updated successfully");
                navigate("/confirmation");
                console.log("success");
            }
        } catch (error) {
            // If 422 and error message present, show it in toast
            if (error.response && error.response.status === 422 && error.response.data && error.response.data.error) {
                toast.error(error.response.data.error);
            } else {
                console.error(
                    "Error:",
                    error.response ? error.response.data : error.message
                );
                toast.error("Something went wrong!");
            }
        } finally {
            setLoading(false);
        }
    }


    const options = [
        { value: "", label: "Select" },
        { value: "Yes", label: "Yes" },
        { value: "No", label: "No" },
    ];

    const optionsEnterPrise = [
        { value: "", label: "Select option" },
        { value: "Micro", label: "Micro" },
        { value: "Small", label: "Small" },
        { value: "Medium", label: "Medium" },
        { value: "Not_applicable", label: "Not Applicable" },
    ];

    const optionsMajorActivity = [
        { value: "", label: "Select option" },
        { value: "services", label: "Services" },
        { value: "trader", label: "Trader" },
        { value: "manufacture", label: "Manufacture" },
        { value: "others", label: "Others" },
    ];

    const optionsClassificationYear = [
        { value: "", label: "Select Option" },
        { value: "2021-22", label: "2021-22" },
        { value: "2022-23", label: "2022-23" },
        { value: "2023-24", label: "2023-24" },
        { value: "2024-25", label: "2024-25" },
    ];


    // Server-driven steps: keep a default fallback but allow the API to provide
    // steps and the list of enabled sections per step. Sections are normalized
    // into a Set for fast visibility checks.
    const defaultSteps = [
        // { label: "OTP Verification" },
        // { label: "Organization Details" },
        // { label: "Communication & Register Address" },
        // { label: "Bank Details" },
        // { label: "Additional Details" },
        // { label: "Statutory Details" },
        // { label: "Pre qualification" },
        // { label: "Preview,Declarations & Submit" },
    ];

    const [steps, setSteps] = useState(defaultSteps);
    const [currentStep, setCurrentStep] = useState(0);
    // completed is kept in sync with steps.length
    const [completed, setCompleted] = useState(Array(defaultSteps.length).fill(false));

    const [enabledSections, setEnabledSections] = useState(new Set());
    const [apiSectionsLoaded, setApiSectionsLoaded] = useState(false);

    const normalize = (s) => {
        if (!s && s !== 0) return "";
        return String(s).trim().toLowerCase().replace(/\s+/g, " ");
    };

    const isSectionVisible = (sectionName) => {
        // while API hasn't loaded, be permissive (don't hide sections)
        if (!apiSectionsLoaded) return true;
        return enabledSections.has(normalize(sectionName));
    };

    // keep `completed` array length consistent with steps
    useEffect(() => {
        setCompleted((prev) => {
            const next = Array(steps.length).fill(false);
            for (let i = 0; i < Math.min(prev.length, next.length); i++) next[i] = prev[i];
            return next;
        });
    }, [steps]);

    // fetch steps/sections from server and normalize section names
    useEffect(() => {
        let cancelled = false;
        const fetchSteps = async () => {
            try {
                const res = await fetch(`${baseURL}/pms/suppliers/${id}/build_vrf_steps`);
                if (!res.ok) throw new Error('Failed to fetch steps');
                const data = await res.json();
                if (cancelled) return;
                if (data && Array.isArray(data.steps) && data.steps.length) {
                    setSteps(data.steps.map((s) => ({ label: s.step_name || s.label || '' })));

                    //                     setSteps([
                    //     { label: "OTP Verification" },
                    //     // { label: "Organization Details" },
                    //     // { label: "Communication & Register Address" },
                    //     { label: "Bank Details" },
                    //     // { label: "Additional Details" },
                    //     // { label: "Statutory Details" },
                    //     { label: "Prequalification" },
                    //     { label: "Preview & Declarations" },
                    // ]);
                    const sections = new Set();
                    data.steps.forEach((st) => {
                        (st.sections || []).forEach((sec) => sections.add(normalize(sec)));
                    });
                    setEnabledSections(sections);
                }


                const hardCoded = [
                    // 'basic details',
                    // 'additional vendor details',
                    // 'reg. office',
                    // 'communication address',
                    'bank detail',
                    "prequalification",

                ].map(normalize);
                // setEnabledSections(new Set(hardCoded));
            } catch (err) {
                // on error we silently keep defaults; still mark as loaded so
                // isSectionVisible can start hiding if needed in future logic
                // (or stay permissive if no enabledSections were provided)
                // console.error(err);
            } finally {
                if (!cancelled) setApiSectionsLoaded(true);
            }
        };
        fetchSteps();
        return () => { cancelled = true; };
    }, []);

    // Helper: a step is completed if completed[idx] is true
    // The line between step i and i+1 is colored only if completed[i] is true

    console.log("enabled sections :", enabledSections)
    console.log("enabled steps :", steps)



    // Set(18) {'basic details', 'additional vendor details', 'reg. office', 'communication address', 'bank detail'}


    return (
        <>

            <div className="website-content overflowY-auto">
                <div>
                    {/* Stepper UI */}
                    <div className="stepper mb-5 d-flex align-items-center justify-content-between mx-5 mt-5" style={{ gap: 0 }}>
                        {steps.map((step, idx) => (
                            <React.Fragment key={step.label}>
                                <div className="d-flex align-items-center flex-column" style={{ minWidth: 70 }}>
                                    <button
                                        type="button"
                                        className={`step-circle btn btn-sm ${currentStep === idx ? "purple-btn2" : completed[idx] ? "" : "purple-btn2"}`}
                                        style={{
                                            borderRadius: "50%",
                                            width: 36,
                                            height: 36,
                                            fontWeight: "bold",
                                            zIndex: 2,
                                            background: currentStep === idx ? '#e95420' : completed[idx] ? '#e95420' : '',
                                            color: currentStep === idx ? '#fff' : completed[idx] ? '#fff' : '',
                                            borderColor: currentStep === idx ? '#e95420' : completed[idx] ? '#e95420' : '',
                                            borderWidth: currentStep === idx ? 3 : completed[idx] ? 2 : '',
                                            boxShadow: currentStep === idx ? '0 0 8px #e95420' : completed[idx] ? '0 0 4px #e95420' : 'none',
                                            transition: 'background 0.3s, color 0.3s, border-color 0.3s',
                                        }}
                                        onClick={() => setCurrentStep(idx)}
                                    >
                                        {idx + 1}
                                    </button>
                                    <div
                                        className="step-label mt-2 d-flex align-items-center justify-content-center"
                                        style={{
                                            fontSize: 13,
                                            minWidth: 120,
                                            maxWidth: 150,
                                            textAlign: 'center',
                                            position: 'relative',
                                            border: '2px solid #e95420',
                                            borderRadius: 8,
                                            padding: '2px 8px',
                                            background: currentStep === idx ? '#e95420' : '#fff',
                                            color: currentStep === idx ? '#fff' : '',
                                            boxShadow: currentStep === idx ? '0 0 8px #e95420' : completed[idx] ? '0 0 4px #e95420' : 'none',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
                                            fontWeight: currentStep === idx ? 'bold' : '',
                                        }}
                                        title={step.label}
                                    >
                                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{step.label}</span>
                                        {completed[idx] && (
                                            <span style={{ color: 'green', fontWeight: 'bold', fontSize: 18, marginLeft: 6, display: 'inline-flex', alignItems: 'center' }}>✔</span>
                                        )}
                                    </div>
                                </div>
                                {idx < steps.length - 1 && (
                                    <div
                                        className="flex-grow-1"
                                        style={{
                                            height: 2,
                                            borderBottom: `2px dotted ${completed[idx] ? '#e95420' : '#aaa'}`,
                                            margin: "0 4px 0 4px",
                                            background: completed[idx] ? '#e95420' : 'none',
                                            transition: 'background 0.3s, border-color 0.3s',
                                            zIndex: 1
                                        }}
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </div>






                    {(normalize(steps[currentStep]?.label || '') === normalize('OTP Verification')) && (
                        <div className="d-flex justify-content-center mt-4">
                            <div className="card pb-4  mx-5 w-100"
                            // style={{maxWidth:'700px', width:'100%'}}
                            >
                                <div className="w-100 text-center mb-3">
                                    <h3 className="fw-bold" style={{ marginTop: '24px' }}>OTP Verification</h3>
                                </div>
                                <div className="card-body mt-0">
                                    <div className="row justify-content-center">
                                        <div className="col-md-8">

                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <div className="form-group mb-2">
                                                        <label>Contact Person First Name</label>
                                                        <input className="form-control" type="text"
                                                            value={supplierShowData?.first_name || "-"} readOnly disabled
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-3">
                                                        <label>Contact Person Last Name</label>
                                                        <input className="form-control" type="text"
                                                            value={supplierShowData?.last_name || "-"} readOnly disabled
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>Primary Email ID</label>
                                                        <input className="form-control" type="email" value={supplierShowData?.email || "-"} readOnly disabled />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">

                                                    <div className="form-group">
                                                        <label>Secondary Email ID</label>
                                                        <input className="form-control" type="email" value={supplierShowData?.alternate_email || "-"} readOnly disabled />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>Primary Mobile No.</label>
                                                        <input className="form-control" type="text" value={supplierShowData?.mobile || "-"} readOnly disabled />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>Secondary Mobile No.</label>
                                                        <input className="form-control" type="text" value={supplierShowData?.mobile || "-"} placeholder="Enter secondary mobile number" disabled />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mb-3 justify-content-center">
                                                <div className="col-md-6 d-flex justify-content-center">
                                                    <button
                                                        className="purple-btn2"
                                                        type="button"
                                                        onClick={handleGetOtp}
                                                        disabled={otpTimer > 0}
                                                    >
                                                        {otpTimer > 0 ? `Resend in ${formatTimer(otpTimer)}` : 'Get OTP'}
                                                    </button>
                                                </div>
                                                <div className="w-100 text-center mt-2">
                                                    {otpTimer > 0 && (
                                                        <div aria-live="polite" className="text-secondary">Time remaining: <strong>{formatTimer(otpTimer)}</strong></div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="row w-100 mb-3">
                                                <div className="col-md-6">
                                                    <input
                                                        className="form-control"
                                                        type="number"
                                                        placeholder="Enter Email OTP"
                                                        value={emailOtp}
                                                        min={0}
                                                        max={99999}
                                                        onInput={e => {
                                                            let val = e.target.value.replace(/[^0-9]/g, '');
                                                            if (val.length > 5) val = val.slice(0, 5);
                                                            setEmailOtp(val);
                                                        }}
                                                        onKeyDown={e => {
                                                            if (e.key === '-' || e.key === 'e' || e.keyCode === 109 || e.keyCode === 189) {
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                    />
                                                    <span style={{ background: '#fff', color: '#e95420', padding: '2px 8px', borderRadius: '4px', fontSize: '0.95em', display: 'inline-block', marginTop: '4px' }}>*Note: Any One OTP Is Mandatory To Proceed</span>
                                                </div>
                                                <div className="col-md-6">
                                                    <input
                                                        className="form-control"
                                                        type="number"
                                                        placeholder="Enter Mobile OTP"
                                                        value={mobileOtp}
                                                        min={0}
                                                        max={99999}
                                                        onInput={e => {
                                                            let val = e.target.value.replace(/[^0-9]/g, '');
                                                            if (val.length > 5) val = val.slice(0, 5);
                                                            setMobileOtp(val);
                                                        }}
                                                        onKeyDown={e => {
                                                            if (e.key === '-' || e.key === 'e' || e.keyCode === 109 || e.keyCode === 189) {
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-center mt-3">
                                                <button className="purple-btn2 " onClick={() => {
                                                    handleOtpSubmit();
                                                }}>Submit</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )}

                    {/* Step content */}
                    {(normalize(steps[currentStep]?.label || '') === normalize('Organization Detail')) && (
                        <div className="card mx-4 pb-4 mt-4">
                            {/* Organization Details section here */}
                            {/* ...existing code for Organization Details... */}


                            <div className="card mx-4 pb-4 mt-4 mt-5">
                                <div className="card-header3">
                                    <h3 className="card-title">Organization Details</h3>
                                </div>
                                <div className="card-body mt-0">
                                    <div className="row px-3">
                                        <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                                            <div className="col-6 ">
                                                <label>Company</label>
                                            </div>
                                            <div className="col-6">
                                                <label className="text">
                                                    <span className="me-3">
                                                        <span className="text-dark">:</span>
                                                    </span>
                                                    {supplierShowData?.organization_name || "-"}
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                                            <div className="col-6 ">
                                                <label>Certifying Company GSTIN</label>
                                            </div>
                                            <div className="col-6">
                                                <label className="text">
                                                    <span className="me-3">
                                                        <span className="text-dark">:</span>
                                                    </span>
                                                    {supplierShowData?.gstin || "-"}
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                                            <div className="col-6 ">
                                                <label>Site</label>
                                            </div>
                                            <div className="col-6">
                                                <label className="text">
                                                    <span className="me-3">
                                                        <span className="text-dark">:</span>
                                                    </span>
                                                    {supplierShowData?.site_name || "-"}
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                                            <div className="col-6 ">
                                                <label>Department</label>
                                            </div>
                                            <div className="col-6">
                                                <label className="text">
                                                    <span className="me-3">
                                                        <span className="text-dark">:</span>
                                                    </span>
                                                    {supplierShowData?.department_name || "-"}
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                                            <div className="col-6 ">
                                                <label>Invited By</label>
                                            </div>
                                            <div className="col-6">
                                                <label className="text">
                                                    <span className="me-3">
                                                        <span className="text-dark">:</span>
                                                    </span>
                                                    {supplierShowData?.invited_by_name || "-"}
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                                            <div className="col-6 ">
                                                <label>Contact Number</label>
                                            </div>
                                            <div className="col-6">
                                                <label className="text">
                                                    <span className="me-3">
                                                        <span className="text-dark">:</span>
                                                    </span>
                                                    {supplierShowData?.mobile || "-"}
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {isSectionVisible('Basic Details') && (
                                <div className="card mx-4 pb-4 mt-5">
                                    <div className="card-header3">
                                        <h3 className="card-title">Basic Information</h3>
                                    </div>
                                    <div className="card-body mt-0">
                                        <div className="row">

                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label>
                                                        Vendor Organization Name <span>*</span>
                                                        <TooltipIcon message="Enter the full legal name of the vendor organization." />
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={basicInfo.vendorOrganizationName}
                                                        disabled
                                                        onChange={e => updateBasicInfo('vendorOrganizationName', e.target.value)}
                                                    />
                                                    {basicInfoErrors.vendorOrganizationName && (
                                                        <div className="ValidationColor">{basicInfoErrors.vendorOrganizationName}</div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label>
                                                        Type of Organization <span>*</span>
                                                        <TooltipIcon message="Choose the type of your organization from the options provided to help us better understand your profile." />
                                                    </label>
                                                    <SingleSelector
                                                        options={organizationTypeOptions || []}
                                                        placeholder="Select Organization Type"
                                                        value={basicInfo.organizationType}
                                                        onChange={val => updateBasicInfo('organizationType', val || null)}
                                                    />
                                                    {basicInfoErrors.organizationType && (
                                                        <div className="ValidationColor">{basicInfoErrors.organizationType}</div>
                                                    )}
                                                </div>
                                            </div>
                                            {/* {console.log("+++++++++++++ basicInfo", basicInfo.organizationType.label)} */}

                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    {/* Label with Tooltip */}
                                                    <label>
                                                        Nature of Business <span>*</span>
                                                        {/* <TooltipIcon message="Please choose your country from the list" /> */}
                                                    </label>
                                                    <SingleSelector
                                                        options={natureOfBusinessOptions || []}
                                                        placeholder="Select Nature of Business"
                                                        isDisabled={true}
                                                        value={basicInfo.natureOfBusiness || null}
                                                        onChange={val => updateBasicInfo('natureOfBusiness', val)}
                                                    />
                                                    {basicInfoErrors.natureOfBusiness && (
                                                        <div className="ValidationColor">{basicInfoErrors.natureOfBusiness}</div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-md-4 mt-2">
                                                <div className="form-group">

                                                    <label>
                                                        Vendor Type  <span>*</span>
                                                        {/* <TooltipIcon message="Please choose your country from the list" /> */}
                                                    </label>
                                                    <SingleSelector
                                                        options={vendorTypeOptions || []}
                                                        placeholder="Select Vendor Type"
                                                        isDisabled={true}
                                                        value={basicInfo.vendorType}
                                                        onChange={val => updateBasicInfo('vendorType', val)}
                                                    />
                                                    {basicInfoErrors.vendorType && (
                                                        <div className="ValidationColor">{basicInfoErrors.vendorType}</div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-md-4 mt-2">
                                                <div className="form-group">

                                                    <label>
                                                        Type of Industry  <span>*</span>
                                                        <TooltipIcon message="Choose the industry that your organization operates in. This helps us better understand your sector." />
                                                    </label>
                                                    <SingleSelector
                                                        options={industryTypeOptions || []}
                                                        placeholder="Select Type of Industry"
                                                        value={basicInfo.industryType}
                                                        onChange={val => updateBasicInfo('industryType', val)}
                                                    />
                                                    {basicInfoErrors.industryType && (
                                                        <div className="ValidationColor">{basicInfoErrors.industryType}</div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="col-md-4 mt-2">
                                                <div className="form-group">
                                                    <label>
                                                        Type of Work (Scope of work with Panchshil)<span>*</span>
                                                        <TooltipIcon message="Write the Type of Work that your organization operates in.This helps us better understand your sector." />
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        placeholder="Enter Address"
                                                        value={basicInfo.typeOfWork}
                                                        onChange={e => updateBasicInfo('typeOfWork', e.target.value)}
                                                    />
                                                    {basicInfoErrors.typeOfWork && (
                                                        <div className="ValidationColor">{basicInfoErrors.typeOfWork}</div>
                                                    )}

                                                </div>
                                            </div>
                                            <div className="col-md-4 mt-2">
                                                <div className="form-group">
                                                    <label>
                                                        Full Name  <span>*</span>
                                                        {/* <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." /> */}
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={basicInfo.fullName}
                                                        onChange={e => updateBasicInfo('fullName', e.target.value)}
                                                        disabled
                                                    />
                                                    {basicInfoErrors.fullName && (
                                                        <div className="ValidationColor">{basicInfoErrors.fullName}</div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-md-4 mt-2">
                                                <div className="form-group">
                                                    <label>
                                                        Email <span>*</span>
                                                        {/* <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." /> */}
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={basicInfo.email}
                                                        onChange={e => updateBasicInfo('email', e.target.value)}
                                                        disabled
                                                        onBlur={e => {
                                                            const value = e.target.value.trim();
                                                            let error = '';
                                                            if (!value) {
                                                                error = 'This field is required.';
                                                            } else if (!/^\S+@\S+\.\S+$/.test(value)) {
                                                                error = 'Invalid email format.';
                                                            }
                                                            setBasicInfoErrors(prev => ({ ...prev, email: error }));
                                                        }}
                                                    />
                                                    {basicInfoErrors.email && (
                                                        <div className="ValidationColor">{basicInfoErrors.email}</div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-md-4 mt-2">
                                                <div className="form-group">
                                                    <label>
                                                        Mobile <span>*</span>
                                                        {/* <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." /> */}
                                                    </label>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <select
                                                            className="form-select"
                                                            style={{ width: '110px', marginRight: '8px' }}
                                                            value={basicInfo.countryCode || '+91'}
                                                            onChange={e => updateBasicInfo('countryCode', e.target.value)}
                                                            disabled
                                                        >
                                                            <option value="+91">🇮🇳 +91</option>

                                                        </select>
                                                        <input
                                                            className="form-control"
                                                            type="number"
                                                            style={{ flex: 1 }}
                                                            value={basicInfo.mobile}
                                                            onChange={e => updateBasicInfo('mobile', e.target.value)}
                                                            disabled
                                                            onBlur={e => {
                                                                const value = e.target.value.trim();
                                                                let error = '';
                                                                if (!value) {
                                                                    error = 'This field is required.';
                                                                } else if (!/^\d{10}$/.test(value)) {
                                                                    error = 'Mobile number must be exactly 10 digits.';
                                                                }
                                                                setBasicInfoErrors(prev => ({ ...prev, mobile: error }));
                                                            }}
                                                        />
                                                    </div>
                                                    {basicInfoErrors.mobile && (
                                                        <div className="ValidationColor">{basicInfoErrors.mobile}</div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="col-md-4 mt-2">
                                                <div className="form-group">
                                                    <label>
                                                        Key Market <span>*</span>
                                                        <TooltipIcon message="Write the Key Market that your organization operates in. This helps us better understand your sector." />
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={basicInfo.keyMarket}
                                                        onChange={e => updateBasicInfo('keyMarket', e.target.value)}
                                                    />
                                                    {basicInfoErrors.keyMarket && (
                                                        <div className="ValidationColor">{basicInfoErrors.keyMarket}</div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-md-4 mt-2">
                                                <div className="form-group">
                                                    <label>
                                                        PAN No. <span>*</span>
                                                        {/* <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." /> */}
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={basicInfo.panNo}
                                                        onChange={e => updateBasicInfo('panNo', e.target.value)}
                                                        disabled
                                                    />
                                                    {basicInfoErrors.panNo && (
                                                        <div className="ValidationColor">{basicInfoErrors.panNo}</div>
                                                    )}
                                                </div>
                                            </div>


                                            {/* PAN Attachment */}
                                            {/* {console.log("pan attachment:",basicInfo?.panAttachmentObj)} */}
                                            <div className="col-md-4 mt-2">
                                                <div className="form-group">
                                                    <label>
                                                        PAN Attachment <span>*</span>
                                                        <TooltipIcon message="Please attach a clear PDF of your organization's PAN certificate. This is required for identity and tax verification." />
                                                    </label>
                                                    {/*
                                                    Show existing PAN attachment only when it comes from the API (has a file_url).
                                                    If the user picks a new file via input we store filename/content and should NOT show download link —
                                                    instead render the selected filename as plain text.
                                                */}
                                                    {basicInfo?.panAttachmentObj?.file_url ? (
                                                        <span className="ms-2">
                                                            <a
                                                                href={`${baseURL}${basicInfo.panAttachmentObj.file_url}`}
                                                                download
                                                                className="text-primary d-flex align-items-center"
                                                            >
                                                                <span className="me-2">Existing File:</span>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="#DE7008" className="bi bi-download" viewBox="0 0 16 16">
                                                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                                                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                                                </svg>
                                                                {basicInfo.panAttachmentObj.filename}
                                                            </a>
                                                        </span>
                                                    ) : basicInfo?.panAttachmentObj?.filename ? (
                                                        <span className="ms-2 d-flex align-items-center">
                                                            <span className="me-2">Selected File:</span>
                                                            <span className="text-muted">{basicInfo.panAttachmentObj.filename}</span>
                                                        </span>
                                                    ) : null}
                                                    <input
                                                        className="form-control mt-2"
                                                        type="file"
                                                        accept=".pdf"
                                                        onChange={e => {
                                                            const file = e.target.files[0];
                                                            if (file) {
                                                                const reader = new FileReader();
                                                                reader.onload = function (ev) {
                                                                    updateBasicInfo('panAttachmentObj', {
                                                                        filename: file.name,
                                                                        content: ev.target.result.split(',')[1],
                                                                        content_type: file.type,
                                                                    });
                                                                };
                                                                reader.readAsDataURL(file);
                                                            }
                                                        }}
                                                    />
                                                    {basicInfoErrors.panAttachment && (
                                                        <div className="ValidationColor">{basicInfoErrors.panAttachment}</div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="col-md-4 mt-2">
                                                <div className="form-group">

                                                    <label>
                                                        Schema Group
                                                        {/* <span>*</span>
                                                    <TooltipIcon message="Please choose your country from the list" /> */}
                                                    </label>
                                                    <SingleSelector
                                                        options={schemaGroupOptions || []}
                                                        value={basicInfo.schemaGroup || null}
                                                        onChange={val => updateBasicInfo('schemaGroup', val)}
                                                        placeholder="Select Schema Group"
                                                        isDisabled={true}
                                                    />

                                                    {basicInfoErrors.schemaGroup && (
                                                        <div className="ValidationColor">{basicInfoErrors.schemaGroup}</div>
                                                    )}

                                                </div>
                                            </div>

                                            <div className="col-md-4 mt-2">
                                                <div className="form-group">
                                                    <label>
                                                        Date of Incorporation
                                                        <TooltipIcon message="Provide the date when your organization was officially incorporated. Use the format (DD-MM-YYYY) and refer to your incorporation certificate if needed." />
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="date"
                                                        max={new Date().toISOString().split('T')[0]}
                                                        value={basicInfo.dateOfIncorporation}
                                                        onChange={e => handleBasicInfoDateChange('dateOfIncorporation', e.target.value)}
                                                    />
                                                    {/* {basicInfoErrors.dateOfIncorporation && (
                                                    <div className="ValidationColor">{basicInfoErrors.dateOfIncorporation}</div>
                                                )} */}
                                                </div>
                                            </div>

                                            {(
                                                basicInfo?.organizationType?.label === 'Private Limited' || basicInfo?.organizationType?.label === 'Public Limited') && (
                                                    <>
                                                        <div className="col-md-4 mt-2">
                                                            <div className="form-group">
                                                                <label>
                                                                    Corporate Identification Number <span>*</span>
                                                                    <TooltipIcon message="Enter your organization's Corporate Identification Number\n(MCA), which is issued by the Ministry of Corporate Affairs\n(MCA) in India. This number uniquely identifies\u00A0your\u00A0company." />
                                                                </label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    value={basicInfo.cin}
                                                                    maxLength={21}
                                                                    onChange={e => {
                                                                        let val = e.target.value.toUpperCase();
                                                                        if (val.length > 21) {
                                                                            val = val.slice(0, 21);
                                                                        }
                                                                        updateBasicInfo('cin', val);
                                                                        // CIN format: 21 alphanumeric characters
                                                                        const cinRegex = /^[A-Za-z0-9]{21}$/;
                                                                        if (val && !cinRegex.test(val)) {
                                                                            setBasicInfoErrors(prev => ({ ...prev, cin: 'Enter a valid CIN format. Must be 21 alphanumeric characters.' }));
                                                                        } else {
                                                                            setBasicInfoErrors(prev => ({ ...prev, cin: undefined }));
                                                                        }
                                                                    }}
                                                                />
                                                                {basicInfoErrors.cin && (
                                                                    <div className="ValidationColor">{basicInfoErrors.cin}</div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* CIN Attachment */}
                                                        {(basicInfo?.organizationType?.label === 'Private Limited' || basicInfo?.organizationType?.label === 'Public Limited') && (
                                                            <div className="col-md-4 mt-2">
                                                                <div className="form-group">
                                                                    <label>
                                                                        Corporate Identification Number Attachment  <span>*</span>
                                                                        <TooltipIcon message="Upload the official document or certificate to verify the details you have submitted. The document must be uploaded in PDF format. Corporate Identification Number Attachment." />
                                                                    </label>

                                                                    {/* Show existing CIN attachment only when it comes from the API (has a file_url).
                                                                    If the user picks a new file via input we store filename/content and should NOT show download link —
                                                                    instead render the selected filename as plain text. */}
                                                                    {basicInfo?.cinAttachmentObj?.file_url ? (
                                                                        <span className="ms-2">
                                                                            <a
                                                                                href={`${baseURL}${basicInfo.cinAttachmentObj.file_url}`}
                                                                                download
                                                                                className="text-primary d-flex align-items-center"
                                                                            >
                                                                                <span className="me-2">Existing File:</span>
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="#DE7008" className="bi bi-download" viewBox="0 0 16 16">
                                                                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                                                                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                                                                </svg>
                                                                                {basicInfo.cinAttachmentObj.filename}
                                                                            </a>
                                                                        </span>
                                                                    ) : basicInfo?.cinAttachmentObj?.filename ? (
                                                                        <span className="ms-2 d-flex align-items-center">
                                                                            <span className="me-2">Selected File:</span>
                                                                            <span className="text-muted">{basicInfo.cinAttachmentObj.filename}</span>
                                                                        </span>
                                                                    ) : null}
                                                                    <input
                                                                        className="form-control mt-2"
                                                                        type="file"
                                                                        accept="application/pdf"
                                                                        onChange={e => {
                                                                            const file = e.target.files[0];
                                                                            if (file) {
                                                                                const reader = new FileReader();
                                                                                reader.onload = function (ev) {
                                                                                    updateBasicInfo('cinAttachmentObj', {
                                                                                        filename: file.name,
                                                                                        content: ev.target.result.split(',')[1],
                                                                                        content_type: file.type,
                                                                                    });
                                                                                };
                                                                                reader.readAsDataURL(file);
                                                                            }
                                                                        }}
                                                                    />


                                                                    {basicInfoErrors.cinAttachment && (
                                                                        <div className="ValidationColor">{basicInfoErrors.cinAttachment}</div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </>
                                                )}

                                            {(
                                                basicInfo?.organizationType?.label === 'Limited Liability Partnership (LLP)') && (
                                                    <>
                                                        <div className="col-md-4 mt-2">
                                                            <div className="form-group">
                                                                <label>
                                                                    LLP No. <span>*</span>
                                                                    <TooltipIcon message="Enter your organization's Corporate Identification Number\n(MCA), which is issued by the Ministry of Corporate Affairs\n(MCA) in India. This number uniquely identifies\u00A0your\u00A0company." />
                                                                </label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    value={basicInfo.llp}
                                                                    onChange={e => {
                                                                        const val = e.target.value.toUpperCase();
                                                                        updateBasicInfo('llp', val);
                                                                        // LLP format: 3 uppercase letters, hyphen, 4 digits (e.g. AAA-1234)
                                                                        const llpRegex = /^[A-Z]{3}-\d{4}$/;
                                                                        if (val && !llpRegex.test(val)) {
                                                                            setBasicInfoErrors(prev => ({ ...prev, llp: 'Enter a valid LLP format. e.g.: AAA-1234' }));
                                                                        } else {
                                                                            setBasicInfoErrors(prev => ({ ...prev, llp: undefined }));
                                                                        }
                                                                    }}
                                                                />
                                                                {basicInfoErrors.llp && (
                                                                    <div className="ValidationColor">{basicInfoErrors.llp}</div>
                                                                )}
                                                            </div>
                                                        </div>


                                                        {/* LLP Attachment */}
                                                        {basicInfo?.organizationType?.label === 'Limited Liability Partnership (LLP)' && (
                                                            <div className="col-md-4 mt-2">
                                                                <div className="form-group">
                                                                    <label>
                                                                        LLP No. Attachment  <span>*</span>
                                                                        <TooltipIcon message="Upload the official document or certificate to verify the details you have submitted. The document must be uploaded in PDF format. Corporate Identification Number Attachment." />
                                                                    </label>
                                                                    {/* Show existing LLP attachment when provided by API; display selected filename when present. Input is disabled in preview. */}


                                                                    {basicInfo?.llpAttachmentObj?.file_url ? (
                                                                        <span className="ms-2">
                                                                            <a
                                                                                href={`${baseURL}${basicInfo.llpAttachmentObj.file_url}`}
                                                                                download
                                                                                className="text-primary d-flex align-items-center"
                                                                            >
                                                                                <span className="me-2">Existing File:</span>
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="#DE7008" className="bi bi-download" viewBox="0 0 16 16">
                                                                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                                                                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                                                                </svg>
                                                                                {basicInfo.llpAttachmentObj.filename}
                                                                            </a>
                                                                        </span>
                                                                    ) : basicInfo?.llpAttachmentObj?.filename ? (
                                                                        <span className="ms-2 d-flex align-items-center">
                                                                            <span className="me-2">Selected File:</span>
                                                                            <span className="text-muted">{basicInfo.llpAttachmentObj.filename}</span>
                                                                        </span>
                                                                    ) : null}
                                                                    <input
                                                                        className="form-control mt-2"
                                                                        type="file"
                                                                        accept="application/pdf"
                                                                        onChange={e => {
                                                                            const file = e.target.files[0];
                                                                            if (file) {
                                                                                const reader = new FileReader();
                                                                                reader.onload = function (ev) {
                                                                                    updateBasicInfo('llpAttachmentObj', {
                                                                                        filename: file.name,
                                                                                        content: ev.target.result.split(',')[1],
                                                                                        content_type: file.type,
                                                                                    });
                                                                                };
                                                                                reader.readAsDataURL(file);
                                                                            }
                                                                        }}
                                                                    />
                                                                    {basicInfoErrors.llpAttachment && (
                                                                        <div className="ValidationColor">{basicInfoErrors.llpAttachment}</div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </>
                                                )}





                                            <div className="col-md-4 mt-2">
                                                <div className="form-group">
                                                    {/* Label with Tooltip */}
                                                    <label>
                                                        GSTIN Applicable <span>*</span>
                                                        <TooltipIcon message="Indicate whether your organization is registered under the Goods and Services Tax (GST) Act. Select 'Yes' if GSTIN is applicable to your organization" />
                                                    </label>
                                                    <SingleSelector
                                                        placeholder="Select Yes or No"
                                                        options={gstinApplicableOptions}
                                                        value={basicInfo.gstinApplicable}
                                                        onChange={selected => updateBasicInfo('gstinApplicable', selected)}
                                                    // placeholder="Select Yes or No"
                                                    />
                                                    {basicInfoErrors.gstinApplicable && (
                                                        <div className="ValidationColor">{basicInfoErrors.gstinApplicable}</div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="col-md-4 mt-2">
                                                <div className="form-group">

                                                    <label>
                                                        GSTIN Classification
                                                        {/* <TooltipIcon message="Please choose your country from the list" /> */}
                                                    </label>


                                                    <SingleSelector
                                                        options={gstinClassificationOptions || []}
                                                        value={basicInfo.gstinClassification || null}
                                                        onChange={val => updateBasicInfo('gstinClassification', val)}
                                                        placeholder="Select GSTIN Classification"
                                                        isDisabled={
                                                            basicInfo.gstinApplicable === 'Yes' ||
                                                                basicInfo.gstinApplicable?.value === 'Yes'
                                                                ? false
                                                                : true
                                                        }
                                                    />
                                                    {basicInfoErrors.gstinClassification && (
                                                        <div className="ValidationColor">{basicInfoErrors.gstinClassification}</div>
                                                    )}
                                                </div>
                                            </div>


                                            <div className="row">
                                                {basicInfo.gstinApplicable.label === 'Yes' && (
                                                    <>
                                                        <div className="col-md-4 mt-2">
                                                            <div className="form-group">
                                                                <label>
                                                                    GSTIN No. <span>*</span>
                                                                    {/* <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." /> */}
                                                                </label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    value={basicInfo.gstinNo}
                                                                    onChange={e => {
                                                                        const val = e.target.value.toUpperCase();
                                                                        updateBasicInfo('gstinNo', val);
                                                                        // GSTIN format: 15 chars, e.g. 22AAAAA0000A1Z5
                                                                        const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
                                                                        if (val && !gstinRegex.test(val)) {
                                                                            setBasicInfoErrors(prev => ({ ...prev, gstinNo: 'Enter a valid GSTIN format. e.g.: 22AAAAA0000A1Z5' }));
                                                                        } else {
                                                                            setBasicInfoErrors(prev => ({ ...prev, gstinNo: undefined }));
                                                                        }
                                                                    }}
                                                                    maxLength={15}
                                                                />
                                                                {basicInfoErrors.gstinNo && (
                                                                    <div className="ValidationColor">{basicInfoErrors.gstinNo}</div>
                                                                )}
                                                            </div>
                                                        </div>


                                                        {/* GSTIN Attachment */}
                                                        {basicInfo.gstinApplicable.label === 'Yes' && (
                                                            <div className="col-md-4 mt-2">
                                                                <div className="form-group">
                                                                    <label>
                                                                        GSTIN Attachment <span>*</span>
                                                                        <TooltipIcon message="Upload a digital copy of the official GSTIN certificate or document showing your GST registration number. Ensure the document is legible and valid." />
                                                                    </label>
                                                                    {/* Show existing GSTIN attachment only when it comes from the API (has a file_url).
                                                                    If the user picks a new file via input we store filename/content and should NOT show download link —
                                                                    instead render the selected filename as plain text. */}
                                                                    {basicInfo?.gstinAttachmentObj?.file_url ? (
                                                                        <span className="ms-2">
                                                                            <a
                                                                                href={`${baseURL}${basicInfo.gstinAttachmentObj.file_url}`}
                                                                                download
                                                                                className="text-primary d-flex align-items-center"
                                                                            >
                                                                                <span className="me-2">Existing File:</span>
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="#DE7008" className="bi bi-download" viewBox="0 0 16 16">
                                                                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                                                                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                                                                </svg>
                                                                                {basicInfo.gstinAttachmentObj.filename}
                                                                            </a>
                                                                        </span>
                                                                    ) : basicInfo?.gstinAttachmentObj?.filename ? (
                                                                        <span className="ms-2 d-flex align-items-center">
                                                                            <span className="me-2">Selected File:</span>
                                                                            <span className="text-muted">{basicInfo.gstinAttachmentObj.filename}</span>
                                                                        </span>
                                                                    ) : null}
                                                                    <input
                                                                        className="form-control mt-2"
                                                                        type="file"
                                                                        onChange={e => {
                                                                            const file = e.target.files[0];
                                                                            if (file) {
                                                                                const reader = new FileReader();
                                                                                reader.onload = function (ev) {
                                                                                    updateBasicInfo('gstinAttachmentObj', {
                                                                                        filename: file.name,
                                                                                        content: ev.target.result.split(',')[1],
                                                                                        content_type: file.type,
                                                                                    });
                                                                                };
                                                                                reader.readAsDataURL(file);
                                                                            }
                                                                        }}
                                                                    />
                                                                    {basicInfoErrors.gstinAttachment && (
                                                                        <div className="ValidationColor">{basicInfoErrors.gstinAttachment}</div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </>
                                                )}
                                                {basicInfo.gstinApplicable.label === 'No' && (
                                                    <>
                                                        <div className="col-md-4 mt-2">
                                                            <div className="form-group">
                                                                <label>
                                                                    Download Specimen
                                                                    {/* <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." /> */}
                                                                </label>


                                                                <span className="ms-2">
                                                                    <a
                                                                        // href={`${baseURL}${bankDetail.attachment}`} // Ensure URL is correct
                                                                        // download // Forces file download
                                                                        // className="text-primary d-flex align-items-center"    
                                                                        className="text-primary d-flex align-items-center"
                                                                        href={`${baseURL}/assets/Spciman%20GST%20Declaration.pdf`}
                                                                        // download
                                                                        download="SGSTIN_Declaration.pdf"

                                                                    >

                                                                        {/* <span className="me-2">Existing File:</span> */}
                                                                        {/* <TooltipIcon message="Indicate whether your organization is registered under the Goods and Services Tax (GST) Act."
                               /> */}
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            width={24}
                                                                            height={24}
                                                                            fill="#DE7008"
                                                                            className="bi bi-download"
                                                                            viewBox="0 0 16 16"
                                                                        >
                                                                            <path
                                                                                d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"
                                                                            // style={{ fill: "#de7008!important" }}
                                                                            />
                                                                            <path
                                                                                d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"
                                                                            // style={{ fill: "#de7008!important" }}
                                                                            />
                                                                        </svg>
                                                                        <span className="mt-2 ms-2">
                                                                            **Specimen For No GSTIN Applicable.pdf
                                                                        </span>
                                                                    </a>
                                                                </span>
                                                            </div>
                                                        </div>



                                                        {/* GSTIN Declaration */}

                                                        <div className="col-md-4 mt-2">
                                                            <div className="form-group">
                                                                <label>
                                                                    Upload GSTIN Declaration  <span>*</span>
                                                                </label>
                                                                {/* Show existing GSTIN Declaration when provided by API; display selected filename when present. Keep input disabled in preview. */}

                                                                {basicInfo?.gstinDeclarationObj?.file_url ? (
                                                                    <span className="ms-2">
                                                                        <a
                                                                            href={`${baseURL}${basicInfo.gstinDeclarationObj.file_url}`}
                                                                            download
                                                                            className="text-primary d-flex align-items-center"
                                                                        >
                                                                            <span className="me-2">Existing File:</span>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="#DE7008" className="bi bi-download" viewBox="0 0 16 16">
                                                                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                                                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                                                            </svg>
                                                                            {basicInfo?.gstinDeclarationObj?.filename || basicInfo?.gstinAttachmentObj?.filename}
                                                                        </a>
                                                                    </span>
                                                                ) : basicInfo?.gstinDeclarationObj?.filename ? (
                                                                    <span className="ms-2 d-flex align-items-center">
                                                                        <span className="me-2">Selected File:</span>
                                                                        <span className="text-muted">{basicInfo.gstinDeclarationObj.filename}</span>
                                                                    </span>
                                                                ) : null}
                                                                <input
                                                                    className="form-control mt-2"
                                                                    type="file"
                                                                    onChange={e => {
                                                                        const file = e.target.files[0];
                                                                        if (file) {
                                                                            const reader = new FileReader();
                                                                            reader.onload = function (ev) {
                                                                                updateBasicInfo('gstinDeclarationObj', {
                                                                                    filename: file.name,
                                                                                    content: ev.target.result.split(',')[1],
                                                                                    content_type: file.type,
                                                                                });
                                                                            };
                                                                            reader.readAsDataURL(file);
                                                                        }
                                                                    }}
                                                                />
                                                                {basicInfoErrors.gstinDeclaration && (
                                                                    <div className="ValidationColor">{basicInfoErrors.gstinDeclaration}</div>
                                                                )}
                                                            </div>
                                                        </div>

                                                    </>
                                                )}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            )}


                            {isSectionVisible('Additional Vendor Details') && (
                                <div className="card mx-4 pb-4 mt-4">
                                    <div className="card-header3">
                                        <h3 className="card-title">Additional Vendor Details</h3>
                                    </div>


                                    <div className="card-body mt-0">
                                        <div className="row">

                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label>
                                                        Delivery Lead Period (In Days)
                                                        <TooltipIcon message="Enter the number of days required to deliver the product or service from the date of order confirmation." />
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={additionalDetails.deliveryLeadPeriod}
                                                        // onChange={e => updateAdditionalDetails('deliveryLeadPeriod', e.target.value)}
                                                        onChange={e => {
                                                            const value = e.target.value;
                                                            // Allow only digits (0–9)
                                                            if (/^\d*$/.test(value)) {
                                                                updateAdditionalDetails('deliveryLeadPeriod', value);
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4">



                                                <div className="form-group">
                                                    <label>
                                                        Specify Warranty Period (In Years)
                                                        <TooltipIcon message="Enter the duration of the warranty for the product or service, in years. This is the period during which the item will be covered for repairs or replacement." />
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={additionalDetails.warrantyPeriod}
                                                        // onChange={e => updateAdditionalDetails('warrantyPeriod', e.target.value)}
                                                        onChange={e => {
                                                            const value = e.target.value;
                                                            // Allow only numbers (0–9)
                                                            if (/^\d*$/.test(value)) {
                                                                updateAdditionalDetails('warrantyPeriod', value);
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">

                                                    <label>
                                                        AMC Provided
                                                        <TooltipIcon message="Please specify if an Annual Maintenance Contract (AMC) is included with the product or service. Select 'Yes if AMC is provided." />
                                                    </label>
                                                    <SingleSelector
                                                        options={gstinApplicableOptions}
                                                        value={additionalDetails.amcProvided}
                                                        onChange={val => updateAdditionalDetails('amcProvided', val)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4 mt-2">
                                                <div className="form-group">
                                                    <label>
                                                        Website
                                                        <TooltipIcon message="Enter the URL of your company's website where users can lear more about your products or services." />
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={additionalDetails.website}
                                                        onChange={e => updateAdditionalDetails('website', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4  mt-2">
                                                <div className="form-group">
                                                    {/* Label with Tooltip */}
                                                    <label>
                                                        Currency Type <span>*</span>
                                                        {/* <TooltipIcon message="Please choose your country from the list" /> */}
                                                    </label>
                                                    <SingleSelector
                                                        options={currencyOptions}
                                                        placeholder="Select Currency Type"
                                                        value={additionalDetails.currencyType}
                                                        onChange={val => updateAdditionalDetails('currencyType', val)}
                                                    />
                                                    {errors.currencyType && (
                                                        <div className="ValidationColor">{errors.currencyType}</div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-md-4 mt-2">
                                                <div className="form-group">

                                                    <label>
                                                        MSME/Udyam Number Applicable  <span>*</span>
                                                        <TooltipIcon message="Select whether your organization is registered under the MSME (Micro, Small, and Medium Enterprises) or Udyam scheme. Choose 'Yes' if applicable, otherwise select 'No.' By selecting 'No,' you confirm that your organization does not hold a valid MSME/Udyam registration number. A declaration is required, and this response will be timestamped to record the submission date and time." />
                                                    </label>
                                                    <SingleSelector
                                                        value={additionalDetails.msmeUdyamApplicable}
                                                        onChange={val => updateAdditionalDetails('msmeUdyamApplicable', val)}
                                                        options={options}
                                                        className="form-control"
                                                        placeholder="Select MSME/Udyam Number Applicable"
                                                    />
                                                    {errors.msmeUdyamApplicable && (
                                                        <div className="ValidationColor">{errors.msmeUdyamApplicable}</div>
                                                    )}

                                                </div>
                                            </div>

                                            {additionalDetails.msmeUdyamApplicable?.value === "Yes" && (
                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">
                                                        <label

                                                        >
                                                            MSME/Udyam Number <span>*</span>
                                                            <TooltipIcon message="Enter your organization's valid MSME or Udyam registration number. This number is issued by the Ministry of Micro, Small, and Medium Enterprises (MSME) under the Udyam registration scheme" />
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            name="name"
                                                            placeholder=""
                                                            value={additionalDetails.msmeNo}
                                                            onChange={e => updateAdditionalDetails('msmeNo', e.target.value)}
                                                        // value={supplierData?.msme_details?.msme_no}
                                                        />
                                                        {errors.msmeNo && (
                                                            <div className="ValidationColor">{errors.msmeNo}</div>
                                                        )}
                                                        {/* Show error */}
                                                    </div>
                                                </div>
                                            )}

                                            {additionalDetails.msmeUdyamApplicable?.value === "Yes" && (
                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">
                                                        <label >
                                                            Classifiction Year <span>*</span>
                                                        </label>

                                                        <SingleSelector
                                                            value={additionalDetails.classificationYear}
                                                            onChange={val => updateAdditionalDetails('classificationYear', val)}
                                                            options={optionsClassificationYear}
                                                            className="form-control"
                                                            placeholder="Select Classification Year"
                                                        />

                                                        {/* Show error */}
                                                        {errors.classificationYear && (
                                                            <div className="ValidationColor">
                                                                {errors.classificationYear}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}


                                            {additionalDetails.msmeUdyamApplicable?.value === "Yes" && (
                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">
                                                        <label>
                                                            Major Activity <span>*</span>
                                                        </label>


                                                        <SingleSelector
                                                            value={additionalDetails.majorActivity}
                                                            onChange={val => updateAdditionalDetails('majorActivity', val)}
                                                            options={optionsMajorActivity}
                                                            className="form-control"
                                                            placeholder="Select Major Activity"
                                                        />
                                                        {/* {console.log("majorActivity", majorActivity)} */}

                                                        {errors.majorActivity && (
                                                            <div className="ValidationColor">
                                                                {errors.majorActivity}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {/* MSME/Udyam Valid From */}
                                            {additionalDetails.msmeUdyamApplicable?.value === "Yes" && (
                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">
                                                        <label >
                                                            MSME/Udyam Valid From <span>*</span>
                                                            <TooltipIcon message="Enter the date when your MSME/Udyam registration became valid. This is the start date mentioned on your MSME/Udyam registration certificate for the financial year." />
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="date"
                                                            name="name"
                                                            placeholder=""
                                                            value={additionalDetails.validFrom}
                                                            disabled={!!additionalDetails.classificationYear}
                                                            onChange={e => updateAdditionalDetails('validFrom', e.target.value)}
                                                        // value={supplierData?.msme_details?.valid_from}
                                                        />
                                                        {errors.validFrom && (
                                                            <div className="ValidationColor">
                                                                {errors.validFrom}
                                                            </div>
                                                        )}
                                                        {/* Show error */}
                                                    </div>
                                                </div>
                                            )}

                                            {/* MSME/Udyam Valid Till */}
                                            {additionalDetails.msmeUdyamApplicable?.value === "Yes" && (
                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">
                                                        <label >
                                                            MSME/Udyam Valid Till <span>*</span>
                                                            <TooltipIcon message="Enter the date when your MSME/Udyam registration became valid. This is the end date mentioned on your MSME/Udyam registration certificate for the financial year." />
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="date"
                                                            name="name"
                                                            placeholder=""
                                                            value={additionalDetails.validTill}
                                                            disabled={!!additionalDetails.classificationYear}
                                                            onChange={e => updateAdditionalDetails('validTill', e.target.value)}
                                                        // value={supplierData?.msme_details?.valid_till}
                                                        />
                                                        {errors.validTill && (
                                                            <div className="ValidationColor">
                                                                {errors.validTill}
                                                            </div>
                                                        )}
                                                        {/* Show error */}
                                                    </div>
                                                </div>
                                            )}

                                            {/* MSME Enterprise Type */}
                                            {additionalDetails.msmeUdyamApplicable?.value === "Yes" && (
                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">
                                                        <label  >
                                                            MSME Enterprise Type <span>*</span>
                                                            <TooltipIcon message="Select the type of your organization under the MSME (Micro, Small, and Medium Enterprises) scheme. Choose from 'Micro,'Small,' or 'Medium' based on your organization's annual turnover and investment in plant and machinery." />
                                                        </label>

                                                        <SingleSelector
                                                            value={additionalDetails.msmeEnterpriseType}
                                                            onChange={val => updateAdditionalDetails('msmeEnterpriseType', val)}
                                                            options={optionsEnterPrise}
                                                            className="form-control"
                                                            placeholder="Select option..."
                                                        />
                                                        {errors.msmeEnterpriseType && (
                                                            <div className="ValidationColor">
                                                                {errors.msmeEnterpriseType}
                                                            </div>
                                                        )}
                                                        {/* Show error */}
                                                    </div>
                                                </div>
                                            )}



                                            {/*  */}
                                            {additionalDetails.msmeUdyamApplicable?.value === "Yes" && (
                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">
                                                        <label>
                                                            Download Specimen <span>*</span>
                                                        </label>
                                                        <a
                                                            download="Specimen_E-Invoicing_Declaration.docx"
                                                            className="text-primary d-flex align-items-center"
                                                            href={`${baseURL}/assets/Yes%20_%20msme.pdf`}
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width={24}
                                                                height={24}
                                                                fill="#DE7008"
                                                                className="bi bi-download"
                                                                viewBox="0 0 16 16"
                                                            >
                                                                <path
                                                                    d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"
                                                                    style={{ fill: "#de7008!important" }}
                                                                />
                                                                <path
                                                                    d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"
                                                                    style={{ fill: "#de7008!important" }}
                                                                />
                                                            </svg>
                                                            <span className="mt-2 ms-2">
                                                                Specimen For Yes Msme.pdf
                                                            </span>
                                                        </a>
                                                        {/* Show MSME attachment (server) or selected filename in preview */}
                                                        {additionalDetails?.msmeAttachmentObj?.file_url ? (
                                                            <div className="mt-2">
                                                                <a
                                                                    href={`${additionalDetails.msmeAttachmentObj.file_url.startsWith('http') ? additionalDetails.msmeAttachmentObj.file_url : `${baseURL}${additionalDetails.msmeAttachmentObj.file_url}`}`}
                                                                    download
                                                                    className="text-primary d-flex align-items-center"
                                                                >
                                                                    <span className="me-2">Existing MSME File:</span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="#DE7008" className="bi bi-download" viewBox="0 0 16 16">
                                                                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                                                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                                                    </svg>
                                                                    <span className="ms-2">{additionalDetails.msmeAttachmentObj.filename}</span>
                                                                </a>
                                                            </div>
                                                        ) : additionalDetails?.msmeAttachmentObj?.filename ? (
                                                            <div className="mt-2 d-flex align-items-center">
                                                                <span className="me-2">Selected MSME File:</span>
                                                                <span className="text-muted">{additionalDetails.msmeAttachmentObj.filename}</span>
                                                            </div>
                                                        ) : null}
                                                        <input className="form-control mt-2" type="file" disabled />
                                                    </div>
                                                </div>
                                            )}
                                            {/* MSME/Udyam Attachment */}
                                            {additionalDetails.msmeUdyamApplicable?.value === "Yes" && (


                                                // MSME/Udyam Attachment field (show only from additionalDetails.msmeAttachmentObj)
                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">
                                                        <label>
                                                            MSME/Udyam Attachment <span>*</span>
                                                            <TooltipIcon message="Attach a clear, scanned copy or digital image of your MSME/Udyam registration certificate to verify your organization's classification under the MSME scheme. The document must be uploaded in PDF format." />
                                                        </label>
                                                        {/* Show MSME/Udyam attachment only when it comes from the API (has a file_url).
                                                        If the user picks a new file via input we store filename/content and should NOT show download link —
                                                        instead render the selected filename as plain text. */}
                                                        {additionalDetails?.msmeAttachmentObj?.file_url ? (
                                                            <span className="ms-2">
                                                                <a
                                                                    href={`${baseURL}${additionalDetails.msmeAttachmentObj.file_url}`}
                                                                    download
                                                                    className="text-primary d-flex align-items-center"
                                                                >
                                                                    <span className="me-2">Uploaded File:</span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="#DE7008" className="bi bi-download" viewBox="0 0 16 16">
                                                                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                                                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                                                    </svg>
                                                                    {additionalDetails.msmeAttachmentObj.filename}
                                                                </a>
                                                            </span>
                                                        ) : additionalDetails?.msmeAttachmentObj?.filename ? (
                                                            <span className="ms-2 d-flex align-items-center">
                                                                <span className="me-2">Selected File:</span>
                                                                <span className="text-muted">{additionalDetails.msmeAttachmentObj.filename}</span>
                                                            </span>
                                                        ) : null}
                                                        <input
                                                            className="form-control mt-2"
                                                            type="file"
                                                            onChange={e => {
                                                                const file = e.target.files[0];
                                                                if (file) {
                                                                    const reader = new FileReader();
                                                                    reader.onload = function (ev) {
                                                                        updateAdditionalDetails('msmeAttachmentObj', {
                                                                            filename: file.name,
                                                                            content: ev.target.result.split(',')[1],
                                                                            content_type: file.type,
                                                                        });
                                                                    };
                                                                    reader.readAsDataURL(file);
                                                                }
                                                            }}
                                                            ref={fileInputRef}
                                                            multiple
                                                            accept=".pdf"
                                                        />
                                                        {errors.msmeAttachments && (
                                                            <div className="ValidationColor">
                                                                {errors.msmeAttachments}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}


                                            <div className="row">
                                                {additionalDetails.msmeUdyamApplicable?.value === "No" && (
                                                    <div className="col-md-4 mt-2 ms-3">
                                                        <div className="form-group">
                                                            <label
                                                            >
                                                                Download Specimen <span>*</span>
                                                            </label>
                                                            <TooltipIcon message="If you choose 'No' for e-invoicing, a specimen format will be available for download. This is for businesses not subject to e-invoicing under GST regulations. Please upload a signed declaration stating that your organization is not registered.The document must be uploaded in PDF format" />
                                                            <a
                                                                download="Specimen_E-Invoicing_Declaration.docx"
                                                                className="text-primary d-flex align-items-center"
                                                                href={`${baseURL}/assets/NO_%20MSME.pdf`}
                                                                onClick={(e) => {
                                                                    // Force navigation in the same tab to avoid any target/_blank behavior
                                                                    e.preventDefault();
                                                                    window.location.href = `${baseURL}/assets/NO_%20MSME.pdf`;
                                                                }}
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width={24}
                                                                    height={24}
                                                                    fill="#DE7008"
                                                                    className="bi bi-download"
                                                                    viewBox="0 0 16 16"
                                                                >
                                                                    <path
                                                                        d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"
                                                                        style={{ fill: "#de7008!important" }}
                                                                    />
                                                                    <path
                                                                        d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"
                                                                        style={{ fill: "#de7008!important" }}
                                                                    />
                                                                </svg>

                                                                <span className="mt-2 ms-2">
                                                                    Specimen For No Msme.pdf
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                )}

                                                {additionalDetails.msmeUdyamApplicable?.value === "No" && (


                                                    // MSME Declaration Upload Section
                                                    <div className="col-md-4 mt-2">
                                                        <div className="form-group">
                                                            <label>
                                                                Upload Declaration <span>*</span>
                                                            </label>
                                                            <TooltipIcon message="If you choose E-Invoice applicable 'No', please upload a signed declaration document to verify the details you have submitted. The document must be uploaded in PDF format. Ensure that the document is clear, legible, and properly signed." />
                                                            {/* Show MSME Declaration only when it comes from the API (has a file_url).
                                                            If the user picks a new file via input we store filename/content and should NOT show download link —
                                                            instead render the selected filename as plain text. */}
                                                            {additionalDetails?.msmeDeclarationObj?.file_url ? (
                                                                <span className="ms-2">
                                                                    <a
                                                                        href={`${baseURL}${additionalDetails.msmeDeclarationObj.file_url}`}
                                                                        download
                                                                        className="text-primary d-flex align-items-center"
                                                                    >
                                                                        <span className="me-2">Uploaded Declaration:</span>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="#DE7008" className="bi bi-download" viewBox="0 0 16 16">
                                                                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                                                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                                                        </svg>
                                                                        {additionalDetails?.msmeDeclarationObj?.filename || additionalDetails?.msmeAttachmentObj?.filename}
                                                                    </a>
                                                                </span>
                                                            ) : additionalDetails?.msmeDeclarationObj?.filename ? (
                                                                <span className="ms-2 d-flex align-items-center">
                                                                    <span className="me-2">Selected File:</span>
                                                                    <span className="text-muted">{additionalDetails.msmeDeclarationObj.filename}</span>
                                                                </span>
                                                            ) : null}
                                                            <input
                                                                className="form-control"
                                                                type="file"
                                                                accept=".pdf"
                                                                name=""
                                                                onChange={e => {
                                                                    const file = e.target.files[0];
                                                                    if (file) {
                                                                        const reader = new FileReader();
                                                                        reader.onload = function (ev) {
                                                                            updateAdditionalDetails('msmeDeclarationObj', {
                                                                                filename: file.name,
                                                                                content: ev.target.result.split(',')[1],
                                                                                content_type: file.type,
                                                                            });
                                                                        };
                                                                        reader.readAsDataURL(file);
                                                                    }
                                                                }}
                                                            />
                                                            {errors.msmeDeclaration && (
                                                                <div className="ValidationColor">{errors.msmeDeclaration}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>


                                            {basicInfo.gstinApplicable.label === 'Yes' && (
                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">

                                                        <label>
                                                            E-invoicing Applicable  <span>*</span>
                                                            {/* <TooltipIcon message="Select whether your organization is registered under the MSME (Micro, Small, and Medium Enterprises) or Udyam scheme. Choose 'Yes' if applicable, otherwise select 'No.' By selecting 'No,' you confirm that your organization does not hold a valid MSME/Udyam registration number. A declaration is required, and this response will be timestamped to record the submission date and time." /> */}
                                                        </label>
                                                        <SingleSelector
                                                            value={additionalDetails.einvoice}
                                                            onChange={val => updateAdditionalDetails('einvoice', val)}
                                                            options={options}
                                                            className="form-control"
                                                            placeholder="Selec E-invoicing Applicable ."
                                                        />
                                                        {errors.einvoice && (
                                                            <div className="ValidationColor">{errors.einvoice}</div>
                                                        )}

                                                    </div>
                                                </div>
                                            )}
                                            <div className="row">
                                                {additionalDetails.einvoice?.value === "No" && (
                                                    <div className="col-md-4 mt-2 ms-3">
                                                        <div className="form-group">
                                                            <label
                                                            >
                                                                Download Specimen <span>*</span>
                                                            </label>
                                                            <TooltipIcon message="If you choose 'No' for e-invoicing, a specimen format will be available for download. This is for businesses not subject to e-invoicing under GST regulations. Please upload a signed declaration stating that your organization is not registered.The document must be uploaded in PDF format" />
                                                            <a
                                                                download="Specimen_E-Invoicing_Declaration.docx"
                                                                className="text-primary d-flex align-items-center"
                                                                href={`${baseURL}/assets/Specimen_E-Invoicing_Declaration.docx`}


                                                                target="_self" // Ensure it doesn't open in a new tab
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width={24}
                                                                    height={24}
                                                                    fill="#DE7008"
                                                                    className="bi bi-download"
                                                                    viewBox="0 0 16 16"
                                                                >
                                                                    <path
                                                                        d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"
                                                                        style={{ fill: "#de7008!important" }}
                                                                    />
                                                                    <path
                                                                        d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"
                                                                        style={{ fill: "#de7008!important" }}
                                                                    />
                                                                </svg>

                                                                <span className="mt-2 ms-2">
                                                                    Specimen For No E-invoicing.pdf
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                )}

                                                {additionalDetails.einvoice?.value === "No" && (
                                                    <div className="col-md-4 mt-2">
                                                        <div className="form-group">
                                                            <label>
                                                                Upload Declaration <span>*</span>
                                                            </label>


                                                            <TooltipIcon message="If you choose E-Invoice applicable 'No', please upload a signed declaration document to verify the details you have submitted. The document must be uploaded in PDF format.Ensure that the document is clear, legible, and properly signed." />

                                                            {/* Show existing server file or uploaded file preview */}
                                                            {/* {additionalDetails.einvoiceDeclaration && (
                                                            <div style={{ marginTop: 6 }}>
                                                                {additionalDetails.einvoiceDeclaration.file_url ? (
                                                                    <a
                                                                        href={String(additionalDetails.einvoiceDeclaration.file_url).startsWith('http') ? additionalDetails.einvoiceDeclaration.file_url : `${baseURL}${additionalDetails.einvoiceDeclaration.file_url}`}
                                                                        download
                                                                        className="text-primary d-flex align-items-center mt-1"
                                                                        style={{ gap: 6 }}
                                                                    >
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            width={20}
                                                                            height={20}
                                                                            fill="#DE7008"
                                                                            className="bi bi-download"
                                                                            viewBox="0 0 16 16"
                                                                        >
                                                                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                                                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                                                        </svg>
                                                                        <span style={{ fontSize: 12 }}>{additionalDetails.einvoiceDeclaration.filename}</span>
                                                                    </a>
                                                                ) : (
                                                                    <span style={{ fontSize: 12 }}>{additionalDetails.einvoiceDeclaration.filename} (uploaded)</span>
                                                                )}
                                                            </div>
                                                        )} */}
                                                            {additionalDetails.einvoiceDeclaration && (
                                                                additionalDetails.einvoiceDeclaration.file_url ? (
                                                                    <span className="ms-2">
                                                                        <a
                                                                            href={String(additionalDetails.einvoiceDeclaration.file_url).startsWith('http') ? additionalDetails.einvoiceDeclaration.file_url : `${baseURL}${additionalDetails.einvoiceDeclaration.file_url}`}
                                                                            download
                                                                            className="text-primary d-flex align-items-center"
                                                                        >
                                                                            <span className="me-2">Uploaded Declaration:</span>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="#DE7008" className="bi bi-download" viewBox="0 0 16 16">
                                                                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                                                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                                                            </svg>
                                                                            {additionalDetails.einvoiceDeclaration.filename}
                                                                        </a>
                                                                    </span>
                                                                ) : additionalDetails.einvoiceDeclaration.filename ? (
                                                                    <span className="ms-2 d-flex align-items-center">
                                                                        <span className="me-2">Selected File:</span>
                                                                        <span className="text-muted">{additionalDetails.einvoiceDeclaration.filename}</span>
                                                                    </span>
                                                                ) : null
                                                            )}

                                                            <input
                                                                className="form-control"
                                                                type="file"
                                                                accept=".pdf"
                                                                name=""
                                                                onChange={e => handleEinvoiceDeclarationFileChange(e.target.files[0])}
                                                            />
                                                            {errors.einvoiceDeclaration && (
                                                                <div className="ValidationColor">{errors.einvoiceDeclaration}</div>
                                                            )}

                                                        </div>
                                                    </div>
                                                )}
                                            </div>


                                        </div>
                                    </div>
                                </div>

                            )}
                        </div>


                    )}

                    {(normalize(steps[currentStep]?.label || '') === normalize('Communication & Register Address')) && (
                        <div className="card mx-4 pb-4 mt-4">
                            {/* Basic Information section here */}
                            {/* ...existing code for Basic Information... */}

                            {isSectionVisible('reg. office') && (
                                <div className="card mx-3 pb-4 mt-4">
                                    <div className="card-header3">
                                        <h3 className="card-title">Billing / Registered Office</h3>
                                    </div>
                                    <div className="card-body mt-0">
                                        <div className="row">

                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label>
                                                        Address <span>*</span>
                                                        <TooltipIcon message="Please enter your address using a maximum of 40 characters." />
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={registeredAddress.address1}
                                                        onChange={e => handleRegisteredAddressChange('address1', e.target.value)}
                                                    />
                                                    {addressErrors.registered.address1 && (
                                                        <div className="ValidationColor">{addressErrors.registered.address1}</div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label>
                                                        Address Line 2
                                                        <TooltipIcon message="Please enter your address line 2 using a maximum of 40 characters." />
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={registeredAddress.address2}
                                                        onChange={e => handleRegisteredAddressChange('address2', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label>
                                                        Address Line 3
                                                        <TooltipIcon message="Please enter your address line 3 using a maximum of 40 characters." />
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={registeredAddress.address3}
                                                        onChange={e => handleRegisteredAddressChange('address3', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4 mt-2">
                                                <div className="form-group">
                                                    <label>
                                                        Address Line 4
                                                        <TooltipIcon message=" Please enter your address line 4 using a maximum of 40 characters." />
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={registeredAddress.address4}
                                                        onChange={e => handleRegisteredAddressChange('address4', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4  mt-2">
                                                <div className="form-group">
                                                    <label>
                                                        Address Line 5
                                                        <TooltipIcon message=" Please enter your address line 5 using a maximum of 40 characters." />
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={registeredAddress.address5}
                                                        onChange={e => handleRegisteredAddressChange('address5', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4  mt-2">
                                                <div className="form-group">

                                                    <label>
                                                        Country<span>*</span>
                                                        <TooltipIcon message="Please choose your country from the list. This helps us identify the location of your organization." />
                                                    </label>
                                                    <SingleSelector
                                                        options={countryOptions}
                                                        value={registeredAddress.country}
                                                        onChange={val => handleRegisteredAddressChange('country', val)}
                                                    />
                                                    {addressErrors.registered.country && (
                                                        <div className="ValidationColor">{addressErrors.registered.country}</div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-md-4  mt-2">
                                                <div className="form-group">
                                                    {/* Label with Tooltip */}
                                                    <label>
                                                        State <span>*</span>
                                                        <TooltipIcon message="Please choose your state from the list. This helps us determine your organization's regional location." />
                                                    </label>
                                                    <SingleSelector
                                                        options={stateOptions}
                                                        value={registeredAddress.state}
                                                        onChange={val => handleRegisteredAddressChange('state', val)}
                                                    />
                                                    {addressErrors.registered.state && (
                                                        <div className="ValidationColor">{addressErrors.registered.state}</div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="col-md-4  mt-2">
                                                <div className="form-group">
                                                    <label>
                                                        City <span>*</span>
                                                        <TooltipIcon message="Please provide the name of the city where your business is based." />
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={registeredAddress.city}
                                                        onChange={e => handleRegisteredAddressChange('city', e.target.value)}
                                                    />
                                                    {addressErrors.registered.city && (
                                                        <div className="ValidationColor">{addressErrors.registered.city}</div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-md-4  mt-2">
                                                <div className="form-group">
                                                    <label>
                                                        Pin Code<span>*</span>
                                                        <TooltipIcon message="Enter the postal code (Pin Code) for your organization's location. This is required for address verification." />
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={registeredAddress.pincode}
                                                        maxLength={6}
                                                        onChange={e => {
                                                            const val = e.target.value.replace(/[^0-9]/g, '');
                                                            handleRegisteredAddressChange('pincode', val);
                                                            // Pin code must be 6 digits
                                                            if (val && !/^\d{6}$/.test(val)) {
                                                                setAddressErrors(prev => ({
                                                                    ...prev,
                                                                    registered: {
                                                                        ...prev.registered,
                                                                        pincode: 'Pin code must be 6 digits.'
                                                                    }
                                                                }));
                                                            } else {
                                                                setAddressErrors(prev => ({
                                                                    ...prev,
                                                                    registered: {
                                                                        ...prev.registered,
                                                                        pincode: undefined
                                                                    }
                                                                }));
                                                            }
                                                        }}
                                                    />
                                                    {addressErrors.registered.pincode && (
                                                        <div className="ValidationColor">{addressErrors.registered.pincode}</div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="col-md-4  mt-2">
                                                <div className="form-group">
                                                    <label>
                                                        Contact Number <span>*</span>
                                                        <TooltipIcon message="Please provide the full mobile number, including the country code. Ensure the number is correct and formatted properly.." />
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={registeredAddress.mobile}
                                                        maxLength={10}
                                                        onChange={e => {
                                                            let val = e.target.value.replace(/[^0-9]/g, '');
                                                            if (val.length > 10) {
                                                                val = val.slice(0, 10);
                                                            }
                                                            handleRegisteredAddressChange('mobile', val);
                                                            // Mobile number must be exactly 10 digits
                                                            if (val && val.length !== 10) {
                                                                setAddressErrors(prev => ({
                                                                    ...prev,
                                                                    registered: {
                                                                        ...prev.registered,
                                                                        mobile: 'Contact number must be exactly 10 digits.'
                                                                    }
                                                                }));
                                                            } else {
                                                                setAddressErrors(prev => ({
                                                                    ...prev,
                                                                    registered: {
                                                                        ...prev.registered,
                                                                        mobile: undefined
                                                                    }
                                                                }));
                                                            }
                                                        }}
                                                    />
                                                    {addressErrors.registered.mobile && (
                                                        <div className="ValidationColor">{addressErrors.registered.mobile}</div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-md-4  mt-2">
                                                <div className="form-group">
                                                    <label>
                                                        Ordering Email ID <span>*</span>
                                                        <TooltipIcon message="Please provide the email address used by your organization for processing orders. Make sure the email ID is accurate and valid
." />
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={registeredAddress.orderingEmail}
                                                        onChange={e => {
                                                            const val = e.target.value;
                                                            handleRegisteredAddressChange('orderingEmail', val);
                                                            // Email format validation
                                                            const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;
                                                            if (val && !emailRegex.test(val)) {
                                                                setAddressErrors(prev => ({
                                                                    ...prev,
                                                                    registered: {
                                                                        ...prev.registered,
                                                                        orderingEmail: 'Enter a valid email address. e.g. : abc@gmail.com'
                                                                    }
                                                                }));
                                                            } else {
                                                                setAddressErrors(prev => ({
                                                                    ...prev,
                                                                    registered: {
                                                                        ...prev.registered,
                                                                        orderingEmail: undefined
                                                                    }
                                                                }));
                                                            }
                                                        }}
                                                    />
                                                    {addressErrors.registered.orderingEmail && (
                                                        <div className="ValidationColor">{addressErrors.registered.orderingEmail}</div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-md-4  mt-2">
                                                <div className="form-group">
                                                    <label>
                                                        Billing & Accounting Email ID <span>*</span>
                                                        <TooltipIcon message="Enter the email address your organization uses for billing and accounting communications. Ensure it is a valid email format (e.g., example@domain.com)." />
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={registeredAddress.billingEmail}
                                                        onChange={e => {
                                                            const val = e.target.value;
                                                            handleRegisteredAddressChange('billingEmail', val);
                                                            const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;
                                                            if (val && !emailRegex.test(val)) {
                                                                setAddressErrors(prev => ({
                                                                    ...prev,
                                                                    registered: {
                                                                        ...prev.registered,
                                                                        billingEmail: 'Enter a valid email address. e.g. : abc@gmail.com'
                                                                    }
                                                                }));
                                                            } else {
                                                                setAddressErrors(prev => ({
                                                                    ...prev,
                                                                    registered: {
                                                                        ...prev.registered,
                                                                        billingEmail: undefined
                                                                    }
                                                                }));
                                                            }
                                                        }}
                                                    />
                                                    {addressErrors.registered.billingEmail && (
                                                        <div className="ValidationColor">{addressErrors.registered.billingEmail}</div>
                                                    )}
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            )}

                            {isSectionVisible('communication address') && (
                                <div className="card mx-3 pb-4 mt-4">
                                    <div className="card-header3">
                                        <h3 className="card-title">Communication Address</h3>
                                    </div>
                                    <div className="card-body mt-0">
                                        <div className="row ms-1">
                                            <div className="form-check mb-2">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="sameAsRegisteredAddress"
                                                    checked={sameAsRegistered}
                                                    onChange={handleSameAsRegisteredAddress}
                                                />
                                                <label className="form-check-label" htmlFor="sameAsRegisteredAddress">
                                                    Same as Registered Address
                                                </label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label>
                                                        Address <span>*</span>
                                                        <TooltipIcon message="Please enter your address using a maximum of 40 characters." />
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={communicationAddress.address1 || ''}
                                                        onChange={e => handleCommunicationAddressChange('address1', e.target.value)}
                                                        disabled={sameAsRegistered}
                                                    />
                                                    {addressErrors.communication.address1 && (
                                                        <div className="ValidationColor">{addressErrors.communication.address1}</div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label>
                                                        Address Line 2
                                                        <TooltipIcon message="Please enter your address line 2 using a maximum of 40 characters." />
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={communicationAddress.address2 || ''}
                                                        onChange={e => handleCommunicationAddressChange('address2', e.target.value)}
                                                        disabled={sameAsRegistered}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label>
                                                        Address Line 3
                                                        <TooltipIcon message="Please enter your address line 3 using a maximum of 40 characters." />
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={communicationAddress.address3 || ''}
                                                        onChange={e => handleCommunicationAddressChange('address3', e.target.value)}
                                                        disabled={sameAsRegistered}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4 mt-2">
                                                <div className="form-group">
                                                    <label>
                                                        Address Line 4
                                                        <TooltipIcon message=" Please enter your address line 4 using a maximum of 40 characters." />
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={communicationAddress.address4 || ''}
                                                        onChange={e => handleCommunicationAddressChange('address4', e.target.value)}
                                                        disabled={sameAsRegistered}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4  mt-2">
                                                <div className="form-group">
                                                    <label>
                                                        Address Line 5
                                                        <TooltipIcon message=" Please enter your address line 5 using a maximum of 40 characters." />
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={communicationAddress.address5 || ''}
                                                        onChange={e => handleCommunicationAddressChange('address5', e.target.value)}
                                                        disabled={sameAsRegistered}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-4  mt-2">
                                                <div className="form-group">

                                                    <label>
                                                        Country<span>*</span>
                                                        {/* <TooltipIcon message="Please choose your country from the list" /> */}
                                                    </label>
                                                    <SingleSelector
                                                        options={countryOptions}
                                                        value={communicationAddress.country}
                                                        onChange={val => handleCommunicationAddressChange('country', val)}
                                                        isDisabled={sameAsRegistered}
                                                    />
                                                    {addressErrors.communication.country && (
                                                        <div className="ValidationColor">{addressErrors.communication.country}</div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-md-4  mt-2">
                                                <div className="form-group">
                                                    {/* Label with Tooltip */}
                                                    <label>
                                                        State <span>*</span>
                                                        {/* <TooltipIcon message="Please choose your country from the list" /> */}
                                                    </label>
                                                    <SingleSelector
                                                        options={commStateOptions}
                                                        value={communicationAddress.state}
                                                        onChange={val => handleCommunicationAddressChange('state', val)}
                                                        isDisabled={sameAsRegistered}
                                                    />
                                                    {addressErrors.communication.state && (
                                                        <div className="ValidationColor">{addressErrors.communication.state}</div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="col-md-4  mt-2">
                                                <div className="form-group">
                                                    <label>
                                                        City <span>*</span>
                                                        {/* <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." /> */}
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={communicationAddress.city}
                                                        onChange={e => handleCommunicationAddressChange('city', e.target.value)}
                                                        disabled={sameAsRegistered}
                                                    />
                                                    {addressErrors.communication.city && (
                                                        <div className="ValidationColor">{addressErrors.communication.city}</div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-md-4  mt-2">
                                                <div className="form-group">
                                                    <label>
                                                        Pin Code<span>*</span>
                                                        {/* <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." /> */}
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={communicationAddress.pincode}
                                                        maxLength={6}
                                                        onChange={e => {
                                                            const val = e.target.value.replace(/[^0-9]/g, '');
                                                            handleCommunicationAddressChange('pincode', val);
                                                            // Pin code must be 6 digits
                                                            if (val && !/^\d{6}$/.test(val)) {
                                                                setAddressErrors(prev => ({
                                                                    ...prev,
                                                                    communication: {
                                                                        ...prev.communication,
                                                                        pincode: 'Pin code must be 6 digits.'
                                                                    }
                                                                }));
                                                            } else {
                                                                setAddressErrors(prev => ({
                                                                    ...prev,
                                                                    communication: {
                                                                        ...prev.communication,
                                                                        pincode: undefined
                                                                    }
                                                                }));
                                                            }
                                                        }}
                                                        disabled={sameAsRegistered}
                                                    />
                                                    {addressErrors.communication.pincode && (
                                                        <div className="ValidationColor">{addressErrors.communication.pincode}</div>
                                                    )}
                                                </div>
                                            </div>
                                            {/* <div className="col-md-4  mt-2">
                                            <div className="form-group">
                                                <label>
                                                    Telephone Phone No.
                                                    {/* <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." /> */}
                                            {/* </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    value={communicationAddress.telephone}
                                                    onChange={e => handleCommunicationAddressChange('telephone', e.target.value)}
                                                    disabled={sameAsRegistered}
                                                />
                                            </div>
                                        </div> */}
                                            <div className="col-md-4  mt-2">
                                                <div className="form-group">
                                                    <label>
                                                        Contact  Number <span>*</span>
                                                        {/* <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." /> */}
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={communicationAddress.mobile}
                                                        maxLength={10}
                                                        onChange={e => {
                                                            let val = e.target.value.replace(/[^0-9]/g, '');
                                                            if (val.length > 10) {
                                                                val = val.slice(0, 10);
                                                            }
                                                            handleCommunicationAddressChange('mobile', val);
                                                            // Mobile number must be exactly 10 digits
                                                            if (val && val.length !== 10) {
                                                                setAddressErrors(prev => ({
                                                                    ...prev,
                                                                    communication: {
                                                                        ...prev.communication,
                                                                        mobile: 'Contact number must be exactly 10 digits.'
                                                                    }
                                                                }));
                                                            } else {
                                                                setAddressErrors(prev => ({
                                                                    ...prev,
                                                                    communication: {
                                                                        ...prev.communication,
                                                                        mobile: undefined
                                                                    }
                                                                }));
                                                            }
                                                        }}
                                                        disabled={sameAsRegistered}
                                                    />
                                                    {addressErrors.communication.mobile && (
                                                        <div className="ValidationColor">{addressErrors.communication.mobile}</div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-md-4  mt-2">
                                                <div className="form-group">
                                                    <label>
                                                        Email ID <span>*</span>
                                                        {/* <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." /> */}
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={communicationAddress.orderingEmail}
                                                        onChange={e => {
                                                            const val = e.target.value;
                                                            handleCommunicationAddressChange('orderingEmail', val);
                                                            // Email format validation
                                                            const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;
                                                            if (val && !emailRegex.test(val)) {
                                                                setAddressErrors(prev => ({
                                                                    ...prev,
                                                                    communication: {
                                                                        ...prev.communication,
                                                                        orderingEmail: 'Enter a valid email address. e.g.: abc@gmail.com'
                                                                    }
                                                                }));
                                                            } else {
                                                                setAddressErrors(prev => ({
                                                                    ...prev,
                                                                    communication: {
                                                                        ...prev.communication,
                                                                        orderingEmail: undefined
                                                                    }
                                                                }));
                                                            }
                                                        }}
                                                        disabled={sameAsRegistered}
                                                    />
                                                    {addressErrors.communication.orderingEmail && (
                                                        <div className="ValidationColor">{addressErrors.communication.orderingEmail}</div>
                                                    )}
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}



                    {(normalize(steps[currentStep]?.label || '') === normalize('Bank Details')) && (
                        <>
                            {isSectionVisible('bank detail') && (
                                <div className="card mx-4 pb-4 mt-4">


                                    {bankDetailsList?.filter(b => b._destroy !== "true").map((bankDetail, idx) => (
                                        <CollapsedCardKYC
                                            key={bankDetail.id}
                                            title={`Bank Details${bankDetailsList.length > 1 ? ` (${idx + 1})` : ''}`}
                                            onDelete={() => deleteBankDetails(bankDetail.id)}
                                        >
                                            <div className="row">
                                                {/* Bank Name */}
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label

                                                        >
                                                            Bank Name <span>*</span>
                                                            <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            placeholder="Enter Bank name"
                                                            value={bankDetail.bank_name}
                                                            onChange={(e) =>
                                                                handleInputChange(e, bankDetail.id, "bank_name")
                                                            }
                                                            disabled={!bankDetail.isNew}
                                                        />

                                                        {bankDetail.isNew &&
                                                            bankErrors.bank_name &&
                                                            !bankDetail.bank_name && (
                                                                <div className="ValidationColor">
                                                                    {bankErrors.bank_name}
                                                                </div>
                                                            )}


                                                    </div>
                                                </div>
                                                {/* Address */}
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label

                                                        >
                                                            Address <span>*</span>
                                                            <TooltipIcon message="Please provide the complete address of your bank branch,including the street address,city and postal code." />
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            placeholder="Enter Address"
                                                            value={bankDetail.address}
                                                            onChange={(e) =>
                                                                handleInputChange(e, bankDetail.id, "address")
                                                            }
                                                            disabled={!bankDetail.isNew}
                                                        />
                                                        {bankDetail.isNew &&
                                                            bankErrors.address &&
                                                            !bankDetail.address && (
                                                                <div className="ValidationColor">
                                                                    {bankErrors.address}
                                                                </div>
                                                            )}

                                                    </div>
                                                </div>
                                                {/* Country */}
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        {/* Label with Tooltip */}
                                                        <label

                                                        >
                                                            Country <span>*</span>
                                                            <TooltipIcon message="Please choose your country from the list" />
                                                        </label>




                                                        <SingleSelector
                                                            options={countries}
                                                            value={
                                                                countries.find(
                                                                    (c) => c.value === bankDetail.country_id
                                                                ) || null
                                                            }
                                                            onChange={(selectedOption) =>
                                                                handleCountryChange(selectedOption, bankDetail.id)
                                                            }
                                                            // disabled={!bankDetail.isNew}
                                                            placeholder="Select Country"
                                                            isDisabled={!bankDetail.isNew}
                                                        />

                                                        {/* Validation Error Message */}
                                                        {bankDetail.isNew &&
                                                            bankErrors.country_id &&
                                                            !bankDetail.country_id && (
                                                                <div className="ValidationColor">
                                                                    {bankErrors.country_id}
                                                                </div>
                                                            )}

                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group mt-2">
                                                        <label

                                                        >
                                                            State <span>*</span>
                                                            <TooltipIcon message="Please choose your State from the list" />
                                                        </label>



                                                        <SingleSelector
                                                            options={states}
                                                            value={
                                                                states.find(
                                                                    (s) => s.value === bankDetail.state_id
                                                                ) || null
                                                            }
                                                            onChange={(selectedOption) =>
                                                                handleStateChange(selectedOption, bankDetail.id)
                                                            }
                                                            placeholder="Select State"
                                                            // isDisabled={!bankDetail.country_id},
                                                            isDisabled={!bankDetail.isNew}
                                                        />

                                                        {bankDetail.isNew &&
                                                            bankErrors.state_id &&
                                                            !bankDetail.state_id && (
                                                                <div className="ValidationColor">
                                                                    {bankErrors.state_id}
                                                                </div>
                                                            )}
                                                    </div>
                                                </div>
                                                {/* City */}
                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">
                                                        <label

                                                        >
                                                            City <span>*</span>
                                                            <TooltipIcon message="Enter the city where your bank branch is located" />
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            placeholder="Enter City Name"
                                                            value={bankDetail.city_name}
                                                            onChange={(e) =>
                                                                handleInputChange(e, bankDetail.id, "city_name")
                                                            }
                                                            disabled={!bankDetail.isNew}
                                                        />
                                                        {bankDetail.isNew &&
                                                            bankErrors.city_name &&
                                                            !bankDetail.city_name && (
                                                                <div className="ValidationColor">
                                                                    {bankErrors.city_name}
                                                                </div>
                                                            )}
                                                    </div>
                                                </div>
                                                {/* Pin Code */}
                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">
                                                        <label

                                                        >
                                                            Pin Code <span>*</span>
                                                            <TooltipIcon message="Enter the postal code (Pin Code) for the bank branch location" />
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="number"
                                                            placeholder="Enter Pin Code"
                                                            value={bankDetail.pincode}
                                                            onChange={(e) =>
                                                                handleInputChange(e, bankDetail.id, "pincode")
                                                            }
                                                            disabled={!bankDetail.isNew}
                                                        />

                                                        {bankDetail.isNew && (
                                                            <>
                                                                {inputErrors[bankDetail.id]?.pincode && (
                                                                    <div className="ValidationColor">
                                                                        {inputErrors[bankDetail.id].pincode}
                                                                    </div>
                                                                )}
                                                                {bankErrors.pincode && !bankDetail.pincode && (
                                                                    <div className="ValidationColor">
                                                                        {bankErrors.pincode}
                                                                    </div>
                                                                )}
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                                {/* Account Type */}
                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">
                                                        <label

                                                        >
                                                            Account Type <span>*</span>
                                                            <TooltipIcon message="Select the type of bank account your organization holds,such as Savings,Current,or any other relevant type" />
                                                        </label>


                                                        <SingleSelector
                                                            options={accountTypeOptions}
                                                            value={
                                                                accountTypeOptions.find(
                                                                    (option) =>
                                                                        option.value === bankDetail.account_type
                                                                ) || null
                                                            }
                                                            onChange={(selected) =>
                                                                handleInputChange(
                                                                    { target: { value: selected?.value || "" } },
                                                                    bankDetail.id,
                                                                    "account_type"
                                                                )
                                                            }
                                                            placeholder="Select Account Type"
                                                            isDisabled={!bankDetail.isNew}
                                                        />
                                                        {bankDetail.isNew &&
                                                            bankErrors.account_type &&
                                                            !bankDetail.account_type && (
                                                                <div className="ValidationColor">
                                                                    {bankErrors.account_type}
                                                                </div>
                                                            )}
                                                    </div>
                                                </div>
                                                {/* Account Number */}
                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">
                                                        <label

                                                        >
                                                            Account Number <span>*</span>
                                                            <TooltipIcon message="Please provide your organization's bank account number.Make sure it is correct and matches the details at your bank" />
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            placeholder="Enter Account Number"
                                                            value={bankDetail.account_number}
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    e,
                                                                    bankDetail.id,
                                                                    "account_number"
                                                                )
                                                            }
                                                            disabled={!bankDetail.isNew}
                                                        />

                                                        {bankDetail.isNew &&
                                                            bankErrors.account_number &&
                                                            !bankDetail.account_number && (
                                                                <div className="ValidationColor">
                                                                    {bankErrors.account_number}
                                                                </div>
                                                            )}
                                                    </div>
                                                </div>

                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">
                                                        <label>
                                                            Confirm Account Number <span>*</span>
                                                            <TooltipIcon message="Re-enter the bank account number to confirm accuracy. Ensure it matches the original account number entered above." />
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            placeholder="Enter Confirm Account Number"
                                                            value={bankDetail.confirm_account_number}
                                                            onChange={(e) => {
                                                                const newValue = e.target.value;
                                                                handleInputChange(
                                                                    e,
                                                                    bankDetail.id,
                                                                    "confirm_account_number"
                                                                );
                                                                // Live validation: show error as soon as user types and it doesn't match
                                                                if (newValue !== bankDetail.account_number) {
                                                                    setBankErrors((prev) => ({
                                                                        ...prev,
                                                                        confirm_account_number: "Account numbers must match",
                                                                    }));
                                                                } else {
                                                                    setBankErrors((prev) => {
                                                                        const newErrors = { ...prev };
                                                                        delete newErrors.confirm_account_number;
                                                                        return newErrors;
                                                                    });
                                                                }
                                                            }}
                                                            onPaste={(e) => {
                                                                e.preventDefault();
                                                                alert(
                                                                    "Pasting is not allowed for security reasons. Please type the account number."
                                                                );
                                                            }}
                                                            disabled={!bankDetail.isNew}
                                                        />
                                                        {bankDetail.isNew && bankErrors.confirm_account_number && (
                                                            <div className="ValidationColor">
                                                                {bankErrors.confirm_account_number}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                {/* Branch Name */}
                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">
                                                        <label

                                                        >
                                                            Branch Name <span>*</span>
                                                            <TooltipIcon message="Enter the name of the bank branch where your organization's account is held. " />
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            placeholder="Enter Branch Name"
                                                            value={bankDetail.branch_name}
                                                            onChange={(e) =>
                                                                handleInputChange(e, bankDetail.id, "branch_name")
                                                            }
                                                            disabled={!bankDetail.isNew}
                                                        />
                                                        {bankDetail.isNew &&
                                                            bankErrors.branch_name &&
                                                            !bankDetail.branch_name && (
                                                                <div className="ValidationColor">
                                                                    {bankErrors.branch_name}
                                                                </div>
                                                            )}
                                                    </div>
                                                </div>
                                                {/* MICR No. */}
                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">
                                                        <label

                                                        >
                                                            MICR No. <span>*</span>
                                                            <TooltipIcon message="MICR: Enter the MICR (Magnetic Ink Character Recognition) number of your  bank branch. This number is typically found on your cheque leaf" />
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            placeholder="Enter MICR No."
                                                            value={bankDetail.micr_number}
                                                            onChange={(e) =>
                                                                handleInputChange(e, bankDetail.id, "micr_number")
                                                            }
                                                            disabled={!bankDetail.isNew}
                                                        />
                                                        {bankDetail.isNew && bankErrors.micr_number && !bankDetail.micr_number && (
                                                            <div className="ValidationColor">
                                                                {bankErrors.micr_number}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                {/* IFSC Code */}
                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">
                                                        <label

                                                        >
                                                            IFSC Code <span>*</span>
                                                            <TooltipIcon message="Enter the IFSC (Indian Financial System Code) of your bank branch. This is required for electronic fund transfers like NEFT and RTGS" />
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            placeholder="Enter IFSC Code"
                                                            value={bankDetail.ifsc_code}
                                                            maxLength={11}
                                                            onChange={(e) =>
                                                                handleInputChange(e, bankDetail.id, "ifsc_code")
                                                            }
                                                            disabled={!bankDetail.isNew}
                                                        />

                                                        {bankDetail.isNew && (
                                                            <>
                                                                {inputErrors[bankDetail.id]?.ifsc && (
                                                                    <div className="ValidationColor">
                                                                        {inputErrors[bankDetail.id].ifsc}
                                                                    </div>
                                                                )}
                                                                {bankErrors.ifsc_code && !bankDetail.ifsc_code && (
                                                                    <div className="ValidationColor">
                                                                        {bankErrors.ifsc_code}
                                                                    </div>
                                                                )}
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                                {/* Beneficiary Name */}
                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">
                                                        <label
                                                        >
                                                            Beneficiary Name <span>*</span>
                                                            <TooltipIcon message="Enter the full legel name of the beneficiary." />
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            placeholder="Enter Beneficiary Name"
                                                            // value={bankDetail.benficary_name}
                                                            value={bankDetail.benficary_name} // Correct key
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    e,
                                                                    bankDetail.id,
                                                                    "benficary_name"
                                                                )
                                                            }
                                                            disabled={!bankDetail.isNew}
                                                        />
                                                        {bankDetail.isNew &&
                                                            bankErrors.benficary_name &&
                                                            !bankDetail.benficary_name && (
                                                                <div className="ValidationColor">
                                                                    {bankErrors.benficary_name}
                                                                </div>
                                                            )}
                                                    </div>
                                                </div>


                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">
                                                        <label

                                                        >
                                                            Virtual Account
                                                            {/* <TooltipIcon message="Select the type of bank account your organization holds,such as Savings,Current,or any other relevant type" /> */}
                                                        </label>


                                                        <SingleSelector
                                                            options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]}
                                                            value={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }].find(opt => opt.value === virtualAccount) || null}
                                                            onChange={selected => setVirtualAccount(selected.value)}
                                                            placeholder="Select Virtual Account"
                                                            isDisabled={!bankDetail.isNew}
                                                        />
                                                        {/* {bankDetail.isNew &&
                                                    errors.account_type &&
                                                    !bankDetail.account_type && (
                                                        <div className="ValidationColor">
                                                            {errors.account_type}
                                                        </div>
                                                    )} */}
                                                    </div>
                                                </div>





                                                {virtualAccount === 'Yes' && (
                                                    <div className="col-md-4 mt-2">
                                                        <div className="form-group">
                                                            <label>
                                                                Select Company <span>*</span>
                                                            </label>
                                                            <SingleSelector
                                                                options={companyOptions}
                                                                value={selectedCompany}
                                                                onChange={selected => setSelectedCompany(selected)}
                                                                placeholder="Select Company"
                                                            />
                                                        </div>
                                                    </div>
                                                )}



                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">
                                                        <label
                                                        >
                                                            Generated Virtual Account Code
                                                            {/* <TooltipIcon message="Enter the full legel name of the beneficiary." /> */}
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            placeholder="Enter Generated Virtual Account Code"
                                                            // value={bankDetail.benficary_name}
                                                            // value={bankDetail.benficary_name} // Correct key
                                                            // onChange={(e) =>
                                                            //     handleInputChange(
                                                            //         e,
                                                            //         bankDetail.id,
                                                            //         "benficary_name"
                                                            //     )
                                                            // }
                                                            // disabled={!bankDetail.isNew}
                                                            disabled
                                                        />
                                                        {/* {bankDetail.isNew &&
                                                    errors.benficary_name &&
                                                    !bankDetail.benficary_name && (
                                                        <div className="ValidationColor">
                                                            {errors.benficary_name}
                                                        </div>
                                                    )} */}
                                                    </div>
                                                </div>


                                                {/* Cancelled Cheque / Bank Copy */}
                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">
                                                        <label

                                                        >
                                                            Cancelled Cheque / Bank Copy <span>*</span>
                                                            <TooltipIcon message="Provide a cancelled cheque or a bank statement copy that clearly displays your bank account details.This helps verify your account information. The document must be uploaded in PDF format" />
                                                        </label>

                                                        {/* Conditionally Render Existing File Download Link
                                                    Show download only when attachment has a server URL (attachment_url or file_url).
                                                    If the attachment is a user-selected file (has filename but no server URL) show filename as plain text. */}
                                                        {bankDetail?.attachment || bankAttachments[bankDetail.id] ? (
                                                            bankDetail?.attachment?.attachment_url || bankDetail?.attachment?.file_url ? (
                                                                <span className="ms-2">
                                                                    <a
                                                                        href={`${baseURL}${bankDetail.attachment.attachment_url || bankDetail.attachment.file_url}`}
                                                                        download
                                                                        className="text-primary d-flex align-items-center"
                                                                    >
                                                                        <span className="me-2">Existing File:</span>
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            width={24}
                                                                            height={24}
                                                                            fill="#DE7008"
                                                                            className="bi bi-download"
                                                                            viewBox="0 0 16 16"
                                                                        >
                                                                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                                                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                                                        </svg>
                                                                        {bankDetail?.attachment.filename || bankDetail?.attachment.document_name}
                                                                    </a>
                                                                </span>
                                                            ) :
                                                                (bankAttachments && bankAttachments[bankDetail.id]) ? (
                                                                    <span className=" d-flex align-items-center">
                                                                        <span className="me-2">Selected File:</span>
                                                                        <span className="text-muted">{bankAttachments[bankDetail.id]?.filename}</span>
                                                                    </span>
                                                                )

                                                                    : null
                                                        ) : null}


                                                        {/*  */}
                                                        {/* {console.log(" check bank",bankAttachments[bankDetail.id]?.filename)} */}
                                                        {/* File Input for Uploading New Attachments */}
                                                        <input
                                                            className="form-control mt-2"
                                                            type="file"
                                                            onChange={(e) =>
                                                                handleFileChangeBank(
                                                                    e.target.files[0],
                                                                    bankDetail.id
                                                                )
                                                            }
                                                            ref={fileInputRef}
                                                            multiple
                                                            accept=".pdf"
                                                            disabled={!bankDetail.isNew}
                                                        />


                                                        {bankDetail.isNew &&
                                                            bankErrors.cancelled_cheque &&
                                                            !bankDetail.attachment && (
                                                                <div className="ValidationColor">
                                                                    {bankErrors.cancelled_cheque}
                                                                </div>
                                                            )}
                                                    </div>
                                                </div>
                                                {/* Remark */}
                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">
                                                        <label>
                                                            Remark
                                                            {/* <span>*</span> */}
                                                        </label>
                                                        <textarea
                                                            className="form-control"
                                                            rows="3"
                                                            placeholder="Enter Remark"
                                                            value={bankDetail.remark}
                                                            onChange={(e) =>
                                                                handleInputChange(e, bankDetail.id, "remark")
                                                            }
                                                            disabled={!bankDetail.isNew}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </CollapsedCardKYC>
                                    ))}



                                    <div className="row mt-2 ms-2 justify-content-start">
                                        <div className="col-md-4">
                                            <button className="purple-btn1" onClick={addBankDetails}>
                                                Add Additional Bank Details
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            )}
                        </>
                    )}



                    {(normalize(steps[currentStep]?.label || '') === normalize('Additional Details')) && (
                        <div className="card mx-4 pb-4 mt-4">

                            {/* #1 */}
                            {
                                /* Show a note when fewer than 3 customers are present */
                            }

                            {/* {console.log("major customer:", majorCustomers)} */}
                            {isSectionVisible('major customers served by you') && (
                                <>
                                    {majorCustomers.filter(mc => mc._destroy !== true && mc._destroy !== "true").map((customer, idx) => (
                                        // <div className="card mx-3 pb-4 mt-4" key={customer.id}>
                                        <CollapsedCardKYC
                                            key={customer.id}
                                            title={`Client References${majorCustomers.length > 1 ? ` ${idx + 1}` : ''}`}
                                            onDelete={() => deleteMajorCustomer(customer.id)}
                                            showDelete={majorCustomers.length > 1}
                                            headerExtra={majorCustomers.length < 3 ? (<div className="ValidationColor">Please add a minimum of 3 client references.</div>) : null}
                                        >
                                            <div className="card-body mt-0">
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label className="mb-2">Site Type <span>*</span></label>
                                                            <div className="d-flex">
                                                                <label className="me-3 d-flex align-items-center">
                                                                    <input
                                                                        type="radio"
                                                                        name={`siteType_${customer.id}`}
                                                                        value="working"
                                                                        checked={customer.siteType === 'working'}
                                                                        onChange={() => handleMajorCustomerChange(idx, 'siteType', 'working')}
                                                                        style={{ width: '22px', height: '22px', accentColor: '#de7008' }}
                                                                    />{' '}
                                                                    <span className="ms-2">Working Site</span>
                                                                </label>
                                                                <label className="d-flex align-items-center">
                                                                    <input
                                                                        type="radio"
                                                                        name={`siteType_${customer.id}`}
                                                                        value="previous"
                                                                        checked={customer.siteType === 'previous'}
                                                                        onChange={() => handleMajorCustomerChange(idx, 'siteType', 'previous')}
                                                                        style={{ width: '22px', height: '22px', accentColor: '#de7008' }}
                                                                    />{' '}
                                                                    <span className="ms-2">Previous Site</span>
                                                                </label>
                                                            </div>
                                                            {majorCustomerErrors[idx]?.siteType && (
                                                                <div className="ValidationColor">{majorCustomerErrors[idx].siteType}</div>
                                                            )}
                                                        </div>
                                                    </div>


                                                    <div className="col-md-2 mt-2">
                                                        <div className="form-group">
                                                            <label>Service Provided From <span>*</span></label>
                                                            <input
                                                                className="form-control"
                                                                type="date"
                                                                max={new Date().toISOString().split('T')[0]}
                                                                value={customer.serviceFrom}
                                                                onChange={e => handleMajorCustomerDateChange(idx, 'serviceFrom', e.target.value)}
                                                            />
                                                            {majorCustomerErrors[idx]?.serviceFrom && (
                                                                <div className="ValidationColor">{majorCustomerErrors[idx].serviceFrom}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {customer.siteType === 'previous' && (
                                                        <div className="col-md-2 mt-2">
                                                            <div className="form-group">
                                                                <label>Service Provided To <span>*</span></label>
                                                                <input
                                                                    className="form-control"
                                                                    type="date"
                                                                    max={new Date().toISOString().split('T')[0]}
                                                                    value={customer.serviceTo}
                                                                    onChange={e => handleMajorCustomerDateChange(idx, 'serviceTo', e.target.value)}
                                                                />
                                                                {majorCustomerErrors[idx]?.serviceTo && (
                                                                    <div className="ValidationColor">{majorCustomerErrors[idx].serviceTo}</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="row mt-2">
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label>Client Name <span>*</span></label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                value={customer.companyName}
                                                                onChange={e => handleMajorCustomerChange(idx, 'companyName', e.target.value)}
                                                            />
                                                            {majorCustomerErrors[idx]?.companyName && (
                                                                <div className="ValidationColor">{majorCustomerErrors[idx].companyName}</div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label>Contact Person <span>*</span></label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                value={customer.contactPerson}
                                                                onChange={e => handleMajorCustomerChange(idx, 'contactPerson', e.target.value)}
                                                            />
                                                            {majorCustomerErrors[idx]?.contactPerson && (
                                                                <div className="ValidationColor">{majorCustomerErrors[idx].contactPerson}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {/* <div className="col-md-4  ">
                                                <div className="form-group">
                                                    <label>Designation <span>*</span></label>
                                                    <SingleSelector
                                                        options={[]}
                                                        value={customer.designation}
                                                        onChange={selected => handleMajorCustomerChange(idx, 'designation', selected)}
                                                    />
                                                    {majorCustomerErrors[idx]?.designation && (
                                                        <div className="ValidationColor">{majorCustomerErrors[idx].designation}</div>
                                                    )}
                                                </div>
                                            </div> */}
                                                    <div className="col-md-4  ">
                                                        <div className="form-group">
                                                            <label>Country <span>*</span></label>
                                                            <SingleSelector
                                                                options={countryOptions || []}
                                                                value={customer.country}
                                                                onChange={selected => handleMajorCustomerChange(idx, 'country', selected)}
                                                            />
                                                            {majorCustomerErrors[idx]?.country && (
                                                                <div className="ValidationColor">{majorCustomerErrors[idx].country}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {/* <div className="col-md-4">
                                                <div className="form-group">
                                                    <label>Phone No.</label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={customer.phone}
                                                        onChange={e => handleMajorCustomerChange(idx, 'phone', e.target.value)}
                                                    />
                                                </div>
                                            </div> */}
                                                    <div className="col-md-4 mt-2">
                                                        <div className="form-group">
                                                            <label>Contact No. <span>*</span></label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                value={customer.mobile}
                                                                maxLength={10}
                                                                onChange={e => {
                                                                    let newValue = e.target.value.replace(/[^0-9]/g, ''); // Only digits
                                                                    if (newValue.length > 10) {
                                                                        newValue = newValue.slice(0, 10);
                                                                    }
                                                                    handleMajorCustomerChange(idx, 'mobile', newValue);
                                                                    // Mobile number live validation
                                                                    let errorMsg = '';
                                                                    if (newValue && newValue.length !== 10) {
                                                                        errorMsg = 'Contact Number must be exactly 10 digits.';
                                                                    }
                                                                    setMajorCustomerErrors(prev => {
                                                                        const updated = [...prev];
                                                                        updated[idx] = {
                                                                            ...updated[idx],
                                                                            mobile: errorMsg
                                                                        };
                                                                        return updated;
                                                                    });
                                                                }}
                                                            />
                                                            {majorCustomerErrors[idx]?.mobile && (
                                                                <div className="ValidationColor">{majorCustomerErrors[idx].mobile}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {/* <div className="col-md-4">
                                                <div className="form-group">
                                                    <label>Year of Association <span>*</span></label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={customer.yearOfAssociation}
                                                        onChange={e => handleMajorCustomerChange(idx, 'yearOfAssociation', e.target.value)}
                                                    />
                                                    {majorCustomerErrors[idx]?.yearOfAssociation && (
                                                        <div className="ValidationColor">{majorCustomerErrors[idx].yearOfAssociation}</div>
                                                    )}
                                                </div>
                                            </div> */}
                                                    <div className="col-md-4 mt-2">
                                                        <div className="form-group">
                                                            <label>WO/PO Amount in Last 12 month in lacs <span>*</span></label>
                                                            <input
                                                                className="form-control"
                                                                type="number"
                                                                min={0}
                                                                value={customer.businessLast12Months}
                                                                onChange={e => {
                                                                    let newValue = e.target.value;
                                                                    // Prevent negative numbers and '-' sign
                                                                    if (newValue.includes('-')) {
                                                                        newValue = newValue.replace(/-/g, '');
                                                                    }
                                                                    if (Number(newValue) < 0) {
                                                                        newValue = '';
                                                                    }
                                                                    handleMajorCustomerChange(idx, 'businessLast12Months', newValue);
                                                                }}
                                                                onKeyDown={e => {
                                                                    if (e.key === '-' || e.key === 'Subtract') {
                                                                        e.preventDefault();
                                                                    }
                                                                }}
                                                            />
                                                            {majorCustomerErrors[idx]?.businessLast12Months && (
                                                                <div className="ValidationColor">{majorCustomerErrors[idx].businessLast12Months}</div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="col-md-4 mt-2">
                                                        <div className="form-group">
                                                            <label>Stage Of Project</label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                value={customer.stageOfProject}
                                                                onChange={e => handleMajorCustomerChange(idx, 'stageOfProject', e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                    {/* <div className="col-md-4">
                                                <div className="form-group">
                                                    <label>Major Competitors</label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={customer.majorCompetitors}
                                                        onChange={e => handleMajorCustomerChange(idx, 'majorCompetitors', e.target.value)}
                                                    />
                                                </div>
                                            </div> */}
                                                    {/* <div className="col-md-4">
                                                <div className="form-group">
                                                    <label>Attachment</label>
                                                    <input
                                                        className="form-control"
                                                        type="file"
                                                        onChange={e => handleMajorCustomerChange(idx, 'attachment', e.target.files[0])}
                                                    />
                                                </div>
                                            </div> */}


                                                    <div className="col-md-4 mt-2">
                                                        <div className="form-group">
                                                            <label> Product On Service Provided <span>*</span></label>
                                                            <textarea
                                                                className="form-control"
                                                                type="text"
                                                                value={customer.workDone}
                                                                onChange={e => handleMajorCustomerChange(idx, 'workDone', e.target.value)}
                                                            />
                                                            {majorCustomerErrors[idx]?.workDone && (
                                                                <div className="ValidationColor">{majorCustomerErrors[idx].workDone}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </CollapsedCardKYC>
                                        // </div>
                                    ))}
                                    <div className="row mt-2 ms-2 justify-content-start">
                                        <div className="col-md-4">
                                            <button className="purple-btn1" onClick={e => { e.preventDefault(); addMajorCustomer(); }}>
                                                Add Client References
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* #2 */}
                            {isSectionVisible('branch office') && (
                                <>
                                    {branchOffices.filter(mc => mc._destroy !== true && mc._destroy !== "true").map((branch, idx) => (
                                        // <div className="card mx-3 pb-4 mt-4" key={branch.id}>
                                        <CollapsedCardKYC
                                            key={branch.id}
                                            title={`Branch Office Details${branchOffices.length > 1 ? ` (${idx + 1})` : ''}`}
                                            onDelete={() => deleteBranchOffice(branch.id)}
                                            showDelete={branchOffices.length > 1}
                                        >
                                            <div className="card-body mt-0">
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label>Address <span>*</span></label>
                                                            <input className="form-control" type="text" value={branch.address} onChange={e => handleBranchChange(idx, 'address', e.target.value)} />
                                                            {branchErrors[idx]?.address && (
                                                                <div className="ValidationColor">{branchErrors[idx].address}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 ">
                                                        <div className="form-group">
                                                            <label>Country<span>*</span></label>
                                                            <SingleSelector
                                                                options={countries}
                                                                value={branch.country || null}
                                                                onChange={selected => handleBranchChange(idx, 'country', selected)}
                                                                placeholder="Select Country"
                                                            />
                                                            {branchErrors[idx]?.country && (
                                                                <div className="ValidationColor">{branchErrors[idx].country}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 ">
                                                        <div className="form-group">
                                                            <label>State <span>*</span></label>
                                                            <SingleSelector
                                                                options={states}
                                                                value={branch.state || null}
                                                                onChange={selected => handleBranchChange(idx, 'state', selected)}
                                                                placeholder="Select State"
                                                            />
                                                            {branchErrors[idx]?.state && (
                                                                <div className="ValidationColor">{branchErrors[idx].state}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 mt-2">
                                                        <div className="form-group">
                                                            <label>City <span>*</span></label>
                                                            <input className="form-control" type="text" value={branch.city} onChange={e => handleBranchChange(idx, 'city', e.target.value)} />
                                                            {branchErrors[idx]?.city && (
                                                                <div className="ValidationColor">{branchErrors[idx].city}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 mt-2">
                                                        <div className="form-group">
                                                            <label>Pin Code<span>*</span></label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                value={branch.pincode}
                                                                maxLength={6}
                                                                onChange={e => {
                                                                    let newValue = e.target.value;
                                                                    // Restrict to max 6 digits
                                                                    if (newValue.length > 6) {
                                                                        newValue = newValue.slice(0, 6);
                                                                    }
                                                                    handleBranchChange(idx, 'pincode', newValue);
                                                                    // Pin code live validation
                                                                    const pinCodeRegex = /^[1-9][0-9]{5}$/;
                                                                    let errorMsg = '';
                                                                    if (newValue && !pinCodeRegex.test(newValue)) {
                                                                        errorMsg = 'Pin Code must be a 6-digit number.';
                                                                    }
                                                                    // Update branchErrors for this branch
                                                                    setBranchErrors(prev => {
                                                                        const updated = [...prev];
                                                                        updated[idx] = {
                                                                            ...updated[idx],
                                                                            pincode: errorMsg
                                                                        };
                                                                        return updated;
                                                                    });
                                                                }}
                                                            />
                                                            {branchErrors[idx]?.pincode && (
                                                                <div className="ValidationColor">{branchErrors[idx].pincode}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {/* <div className="col-md-4 mt-2">
                                                <div className="form-group">
                                                    <label>Telephone Phone No.</label>
                                                    <input className="form-control" type="text" value={branch.telephone} onChange={e => handleBranchChange(idx, 'telephone', e.target.value)} />
                                                </div>
                                            </div> */}
                                                    <div className="col-md-4 mt-2">
                                                        <div className="form-group">
                                                            <label>Contact Number</label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                value={branch.mobile}
                                                                maxLength={10}
                                                                onChange={e => {
                                                                    let newValue = e.target.value.replace(/[^0-9]/g, ''); // Only digits
                                                                    if (newValue.length > 10) {
                                                                        newValue = newValue.slice(0, 10);
                                                                    }
                                                                    handleBranchChange(idx, 'mobile', newValue);
                                                                    // Mobile number live validation
                                                                    let errorMsg = '';
                                                                    if (newValue && newValue.length !== 10) {
                                                                        errorMsg = 'Contact Number must be exactly 10 digits.';
                                                                    }
                                                                    setBranchErrors(prev => {
                                                                        const updated = [...prev];
                                                                        updated[idx] = {
                                                                            ...updated[idx],
                                                                            mobile: errorMsg
                                                                        };
                                                                        return updated;
                                                                    });
                                                                }}
                                                            />
                                                            {branchErrors[idx]?.mobile && (
                                                                <div className="ValidationColor">{branchErrors[idx].mobile}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CollapsedCardKYC>
                                        // </div>
                                    ))}
                                    <div className="row mt-2 ms-2 justify-content-start">
                                        <div className="col-md-4">
                                            <button className="purple-btn1" onClick={e => { e.preventDefault(); addBranchOffice(); }}>
                                                Add Branch Office Details
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}


                            {/* #3 */}
                            {isSectionVisible('factory / warehouse details') && (
                                <>
                                    {warehouses.filter(mc => mc._destroy !== true && mc._destroy !== "true").map((warehouse, idx) => (
                                        // <div className="card mx-3 pb-4 mt-4" key={warehouse.id}>
                                        <CollapsedCardKYC
                                            key={warehouse.id}
                                            title={`Factory Warehouse${warehouses.length > 1 ? ` ${idx + 1}` : ''}`}
                                            onDelete={() => deleteWarehouse(warehouse.id)}
                                            showDelete={warehouses.length > 1}
                                        >
                                            <div className="card-body mt-0">
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label>Address <span>*</span></label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                value={warehouse.address}
                                                                onChange={e => handleWarehouseChange(idx, 'address', e.target.value)}
                                                            />
                                                            {warehouseErrors[idx]?.address && (
                                                                <div className="ValidationColor">{warehouseErrors[idx].address}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4  ">
                                                        <div className="form-group">
                                                            <label>Country<span>*</span></label>
                                                            <SingleSelector
                                                                options={countries || []}
                                                                value={warehouse.country}
                                                                onChange={selected => handleWarehouseChange(idx, 'country', selected)}
                                                            />
                                                            {warehouseErrors[idx]?.country && (
                                                                <div className="ValidationColor">{warehouseErrors[idx].country}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4  ">
                                                        <div className="form-group">
                                                            <label>State <span>*</span></label>
                                                            <SingleSelector
                                                                options={states || []}
                                                                value={warehouse.state}
                                                                onChange={selected => handleWarehouseChange(idx, 'state', selected)}
                                                            />
                                                            {warehouseErrors[idx]?.state && (
                                                                <div className="ValidationColor">{warehouseErrors[idx].state}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4  mt-2">
                                                        <div className="form-group">
                                                            <label>City <span>*</span></label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                value={warehouse.city}
                                                                onChange={e => handleWarehouseChange(idx, 'city', e.target.value)}
                                                            />
                                                            {warehouseErrors[idx]?.city && (
                                                                <div className="ValidationColor">{warehouseErrors[idx].city}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {/* <div className="col-md-4  mt-2">
                                                <div className="form-group">
                                                    <label>Telephone Phone No.</label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={warehouse.telephone}
                                                        onChange={e => handleWarehouseChange(idx, 'telephone', e.target.value)}
                                                    />
                                                </div>
                                            </div> */}
                                                    <div className="col-md-4  mt-2">
                                                        <div className="form-group">
                                                            <label>Contact Number <span>*</span></label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                value={warehouse.mobile}
                                                                onChange={e => {
                                                                    // Allow only digits and limit to 10 characters
                                                                    const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
                                                                    handleWarehouseChange(idx, 'mobile', digits);
                                                                }}
                                                                maxLength={10}
                                                            />
                                                            {warehouseErrors[idx]?.mobile && (
                                                                <div className="ValidationColor">{warehouseErrors[idx].mobile}</div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="col-md-4 mt-2">
                                                        <div className="form-group">
                                                            <label>Contact Person <span>*</span></label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                value={warehouse.contactPerson || ''}
                                                                onChange={e => handleWarehouseChange(idx, 'contactPerson', e.target.value)}
                                                            />
                                                            {warehouseErrors[idx]?.contactPerson && (
                                                                <div className="ValidationColor">{warehouseErrors[idx].contactPerson}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 mt-2">
                                                        <div className="form-group">
                                                            <label>Contact Person Email <span>*</span></label>
                                                            <input
                                                                className="form-control"
                                                                type="email"
                                                                placeholder="eg.: abc@gmail.com"
                                                                value={warehouse.contactPersonEmail || ''}
                                                                onChange={e => {
                                                                    const val = e.target.value;
                                                                    // update warehouse state
                                                                    handleWarehouseChange(idx, 'contactPersonEmail', val);
                                                                    // live-validate email format and set inline error
                                                                    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
                                                                    let errMsg = '';
                                                                    if (val && !emailRegex.test(val)) {
                                                                        errMsg = 'Invalid Email. eg.: abc@gmail.com';
                                                                    }
                                                                    setWarehouseErrors(prev => {
                                                                        const copy = Array.isArray(prev) ? [...prev] : [];
                                                                        // ensure index exists
                                                                        while (copy.length <= idx) copy.push({});
                                                                        copy[idx] = { ...copy[idx], contactPersonEmail: errMsg || undefined };
                                                                        return copy;
                                                                    });
                                                                }}
                                                            />
                                                            {warehouseErrors[idx]?.contactPersonEmail && (
                                                                <div className="ValidationColor">{warehouseErrors[idx].contactPersonEmail}</div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="col-md-4  mt-2">
                                                        <div className="form-group">
                                                            <label>Attachment</label>



                                                            {warehouse?.attachment ? (
                                                                warehouse?.attachment?.attachment_url || warehouse?.attachment?.file_url ? (
                                                                    <span className="ms-2">
                                                                        <a
                                                                            href={`${baseURL}${warehouse.attachment.attachment_url || warehouse.attachment.file_url}`}
                                                                            download
                                                                            className="text-primary d-flex align-items-center"
                                                                        >
                                                                            <span className="me-2">Existing File:</span>
                                                                            <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                width={24}
                                                                                height={24}
                                                                                fill="#DE7008"
                                                                                className="bi bi-download"
                                                                                viewBox="0 0 16 16"
                                                                            >
                                                                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                                                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                                                            </svg>
                                                                            {warehouse?.attachment.filename || warehouse?.attachment.document_name}
                                                                        </a>
                                                                    </span>
                                                                ) :
                                                                    (warehouse.attachment.filename) ? (
                                                                        <span className=" d-flex align-items-center">
                                                                            <span className="me-2">Selected File:</span>
                                                                            <span className="text-muted">{warehouse.attachment.filename}</span>
                                                                        </span>


                                                                    )

                                                                        : null
                                                            ) : null}
                                                            {/* {console.log("warehouse:******************************", warehouse?.attachment?.attachment_url)}  */}
                                                            <input
                                                                className="form-control"
                                                                type="file"
                                                                onChange={e => handleWarehouseChange(idx, 'attachment', e.target.files[0])}
                                                            />
                                                            {/* Show existing or selected file name/link */}




                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CollapsedCardKYC>
                                        // </div>
                                    ))}
                                    <div className="row mt-2 ms-2 justify-content-start">
                                        <div className="col-md-6">
                                            <button className="purple-btn1" onClick={e => { e.preventDefault(); addWarehouse(); }}>
                                                Add Manufacturing Factory / Plant Details
                                            </button>
                                        </div>
                                    </div>

                                </>
                            )}


                            {/* #4-------------------- */}
                            {isSectionVisible('contact person') && (
                                <>
                                    {contactPersons.filter(mc => mc._destroy !== true && mc._destroy !== "true").map((person, idx) => (

                                        <CollapsedCardKYC
                                            key={person.id}
                                            title={`Contact Person${contactPersons.length > 1 ? ` ${idx + 1}` : ""}`}
                                            onDelete={() => deleteContactPerson(person.id)}
                                            showDelete={contactPersons.length > 1}
                                        >
                                            <div className="card-body mt-0">
                                                <div className="row">
                                                    {/* Escalation Level */}
                                                    <div className="col-md-4  ">
                                                        <div className="form-group">
                                                            <label>
                                                                Escalation Level<span>*</span>
                                                                <TooltipIcon message="Select the escalation level for the contact person. This indicates the priority or seniority in the escalation process for any issues or concerns." />
                                                            </label>
                                                            <SingleSelector
                                                                options={escalationLevelOptions}
                                                                value={person.escalationLevel}
                                                                onChange={(selected) =>
                                                                    handleContactPersonChange(idx, "escalationLevel", selected)
                                                                }
                                                            />
                                                            {contactPersonErrors[idx]?.escalationLevel && (
                                                                <div className="ValidationColor">{contactPersonErrors[idx].escalationLevel}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {/* Name Title */}
                                                    <div className="col-md-4 ">
                                                        <div className="form-group">
                                                            <label>
                                                                Name Title <span>*</span>
                                                                <TooltipIcon message="Select the appropriate title for the employee (e.g. Mr., Mrs., Dr. Ms.). This helps in addressing the employee correctly in formal communications." />
                                                            </label>
                                                            <SingleSelector
                                                                options={nameTitleOptions}
                                                                value={person.nameTitle}
                                                                onChange={(selected) =>
                                                                    handleContactPersonChange(idx, "nameTitle", selected)
                                                                }
                                                            />
                                                            {contactPersonErrors[idx]?.nameTitle && (
                                                                <div className="ValidationColor">{contactPersonErrors[idx].nameTitle}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {/* First Name */}
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label>
                                                                First Name <span>*</span>
                                                                <TooltipIcon message="Please provide the first name Of the designated contact person for your organization. This is required for direct correspondence." />
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                value={person.firstName}
                                                                onChange={(e) =>
                                                                    handleContactPersonChange(idx, "firstName", e.target.value)
                                                                }
                                                            />
                                                            {contactPersonErrors[idx]?.firstName && (
                                                                <div className="ValidationColor">{contactPersonErrors[idx].firstName}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {/* Last Name */}
                                                    <div className="col-md-4 mt-2">
                                                        <div className="form-group">
                                                            <label>
                                                                Last Name<span>*</span>
                                                                <TooltipIcon message="Please provide the last name of the designated contact person for your organization. This is required for direct correspondence." />
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                value={person.lastName}
                                                                onChange={(e) =>
                                                                    handleContactPersonChange(idx, "lastName", e.target.value)
                                                                }
                                                            />
                                                            {contactPersonErrors[idx]?.lastName && (
                                                                <div className="ValidationColor">{contactPersonErrors[idx].lastName}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {/* Designation */}
                                                    <div className="col-md-4  mt-2">
                                                        <div className="form-group">
                                                            <label>
                                                                Designation<span>*</span>
                                                                <TooltipIcon message="Enter the official designation or job title of the contact person within the organization." />
                                                            </label>
                                                            <SingleSelector
                                                                options={designationOptions}
                                                                value={person.designation}
                                                                onChange={(selected) =>
                                                                    handleContactPersonChange(idx, "designation", selected)
                                                                }
                                                            />
                                                            {contactPersonErrors[idx]?.designation && (
                                                                <div className="ValidationColor">{contactPersonErrors[idx].designation}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {/* Primary Email */}
                                                    <div className="col-md-4  mt-2">
                                                        <div className="form-group">
                                                            <label>
                                                                Primary Email ID <span>*</span>
                                                                <TooltipIcon message=" Enter the primary email address of the contact person. This will be used for communication and correspondence." />
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                placeholder="eg.: abc@gmail.com"
                                                                value={person.primaryEmail}
                                                                onChange={(e) => {
                                                                    const val = e.target.value;
                                                                    handleContactPersonChange(idx, "primaryEmail", val);
                                                                    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
                                                                    let err = '';
                                                                    if (!val) {
                                                                        err = 'Primary Email is required.';
                                                                    } else if (!emailRegex.test(val)) {
                                                                        err = 'Invalid Email. eg.: abc@gmail.com';
                                                                    }
                                                                    setContactPersonErrors(prev => {
                                                                        const copy = Array.isArray(prev) ? [...prev] : [];
                                                                        while (copy.length <= idx) copy.push({});
                                                                        copy[idx] = { ...copy[idx], primaryEmail: err || undefined };
                                                                        return copy;
                                                                    });
                                                                }}
                                                            />
                                                            {contactPersonErrors[idx]?.primaryEmail && (
                                                                <div className="ValidationColor">{contactPersonErrors[idx].primaryEmail}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {/* Secondary Email */}
                                                    <div className="col-md-4  mt-2">
                                                        <div className="form-group">
                                                            <label>Secondary Email ID</label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                placeholder="eg.: abc@gmail.com"
                                                                value={person.secondaryEmail}
                                                                onChange={(e) => {
                                                                    const val = e.target.value;
                                                                    handleContactPersonChange(idx, "secondaryEmail", val);
                                                                    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
                                                                    let err = '';
                                                                    if (val && !emailRegex.test(val)) {
                                                                        err = 'Invalid Email. eg.: abc@gmail.com';
                                                                    }
                                                                    setContactPersonErrors(prev => {
                                                                        const copy = Array.isArray(prev) ? [...prev] : [];
                                                                        while (copy.length <= idx) copy.push({});
                                                                        copy[idx] = { ...copy[idx], secondaryEmail: err || undefined };
                                                                        return copy;
                                                                    });
                                                                }}
                                                            />
                                                            {contactPersonErrors[idx]?.secondaryEmail && (
                                                                <div className="ValidationColor">{contactPersonErrors[idx].secondaryEmail}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {/* Primary Mobile */}
                                                    <div className="col-md-4  mt-2">
                                                        <div className="form-group">
                                                            <label>
                                                                Primary Contact No. <span>*</span>
                                                                <TooltipIcon message="Enter the contact person's primary mobile number. This will be used for urgent communication and notifications." />
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                value={person.primaryMobile}
                                                                onChange={(e) =>
                                                                    handleContactPersonChange(idx, "primaryMobile", e.target.value)
                                                                }
                                                            />
                                                            {contactPersonErrors[idx]?.primaryMobile && (
                                                                <div className="ValidationColor">{contactPersonErrors[idx].primaryMobile}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {/* Secondary Mobile */}
                                                    <div className="col-md-4  mt-2">
                                                        <div className="form-group">
                                                            <label>Secondary Contact No.</label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                value={person.secondaryMobile}
                                                                onChange={(e) =>
                                                                    handleContactPersonChange(idx, "secondaryMobile", e.target.value)
                                                                }
                                                            />
                                                            {contactPersonErrors[idx]?.secondaryMobile && (
                                                                <div className="ValidationColor">{contactPersonErrors[idx].secondaryMobile}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {/* Nationality */}
                                                    <div className="col-md-4  mt-2">
                                                        <div className="form-group">
                                                            <label>Nationality</label>
                                                            <SingleSelector
                                                                options={[
                                                                    { label: 'Indian', value: 'Indian' },
                                                                    { label: 'Chinese', value: 'Chinese' },
                                                                    { label: 'American', value: 'American' }
                                                                ]}
                                                                value={person.nationality}
                                                                onChange={(selected) =>
                                                                    handleContactPersonChange(idx, "nationality", selected)
                                                                }
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Date of Birth */}
                                                    <div className="col-md-4  mt-2">
                                                        <div className="form-group">
                                                            <label>Date of Birth</label>
                                                            <input
                                                                className="form-control"
                                                                type="date"
                                                                value={person.dob}
                                                                onChange={(e) =>
                                                                    handleContactPersonChange(idx, "dob", e.target.value)
                                                                }
                                                            />
                                                            {contactPersonErrors[idx]?.dob && (
                                                                <div className="ValidationColor">{contactPersonErrors[idx].dob}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {/* Attachment */}
                                                    <div className="col-md-4  mt-2">
                                                        <div className="form-group">
                                                            <label>Attachment</label>



                                                            {person?.attachment ? (
                                                                person?.attachment?.attachment_url || person?.attachment?.file_url ? (
                                                                    <span className="ms-2">
                                                                        <a
                                                                            href={`${baseURL}${person.attachment.attachment_url || person.attachment.file_url}`}
                                                                            download
                                                                            className="text-primary d-flex align-items-center"
                                                                        >
                                                                            <span className="me-2">Existing File:</span>
                                                                            <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                width={24}
                                                                                height={24}
                                                                                fill="#DE7008"
                                                                                className="bi bi-download"
                                                                                viewBox="0 0 16 16"
                                                                            >
                                                                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                                                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                                                            </svg>
                                                                            {person?.attachment.filename || person?.attachment.document_name}
                                                                        </a>
                                                                    </span>
                                                                ) : person.attachment.filename ? (
                                                                    <span className="d-flex align-items-center">
                                                                        <span className="me-2">Selected File:</span>
                                                                        <span className="text-muted">{person.attachment.filename}</span>
                                                                    </span>
                                                                ) : null
                                                            ) : null}


                                                            <input
                                                                className="form-control"
                                                                type="file"
                                                                onChange={(e) =>
                                                                    handleContactPersonChange(idx, "attachment", e.target.files[0])
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CollapsedCardKYC>

                                    ))}
                                    <div className="row mt-2 ms-2 justify-content-start">
                                        <div className="col-md-4">
                                            <button
                                                className="purple-btn1"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    addContactPerson();
                                                }}
                                            >
                                                Add Contact Person Details
                                            </button>
                                        </div>
                                    </div>

                                </>
                            )}

                            {isSectionVisible('owners / directors information') && (
                                <>
                                    {owners.filter(mc => mc._destroy !== true && mc._destroy !== "true").map((owner, idx) => (

                                        <CollapsedCardKYC
                                            key={owner.id}
                                            title={`Owner / Director${owners.length > 1 ? ` ${idx + 1}` : ''}`}
                                            onDelete={() => deleteOwner(owner.id)}
                                            showDelete={owners.length > 1}
                                        >
                                            <div className="card-body mt-0">
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label>First Name <span>*</span></label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                value={owner.firstName}
                                                                onChange={e => handleOwnerChange(idx, 'firstName', e.target.value)}
                                                            />
                                                            {ownerErrors[idx]?.firstName && (
                                                                <div className="ValidationColor">{ownerErrors[idx].firstName}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label>Last Name <span>*</span></label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                value={owner.lastName}
                                                                onChange={e => handleOwnerChange(idx, 'lastName', e.target.value)}
                                                            />
                                                            {ownerErrors[idx]?.lastName && (
                                                                <div className="ValidationColor">{ownerErrors[idx].lastName}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4  ">
                                                        <div className="form-group">
                                                            <label>Designation <span>*</span></label>
                                                            <SingleSelector
                                                                options={designationOptions || []}
                                                                value={owner.designation}
                                                                onChange={selected => handleOwnerChange(idx, 'designation', selected)}
                                                            />
                                                            {ownerErrors[idx]?.designation && (
                                                                <div className="ValidationColor">{ownerErrors[idx].designation}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4  ">
                                                        <div className="form-group">
                                                            <label>Qualification</label>
                                                            <SingleSelector
                                                                options={qualificationOptions}
                                                                value={owner.qualification}
                                                                onChange={selected => handleOwnerChange(idx, 'qualification', selected)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label>Experience</label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                value={owner.experience}
                                                                onChange={e => handleOwnerChange(idx, 'experience', e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label>Email <span>*</span></label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                value={owner.email}
                                                                onChange={e => handleOwnerChange(idx, 'email', e.target.value)}
                                                            />
                                                            {ownerErrors[idx]?.email && (
                                                                <div className="ValidationColor">{ownerErrors[idx].email}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 mt-2">
                                                        <div className="form-group">
                                                            <label>Contact Number <span>*</span></label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                inputMode="numeric"
                                                                pattern="\\d*"
                                                                maxLength={10}
                                                                value={owner.mobile}
                                                                onChange={e => {
                                                                    const digits = (e.target.value || '').replace(/\D/g, '').slice(0, 10);
                                                                    handleOwnerChange(idx, 'mobile', digits);
                                                                }}
                                                            />
                                                            {ownerErrors[idx]?.mobile && (
                                                                <div className="ValidationColor">{ownerErrors[idx].mobile}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 mt-2">
                                                        <div className="form-group">
                                                            <label>Attachment</label>


                                                            {owner?.attachment ? (
                                                                owner?.attachment?.attachment_url || owner?.attachment?.file_url ? (
                                                                    <span className="ms-2">
                                                                        <a
                                                                            href={`${baseURL}${owner.attachment.attachment_url || owner.attachment.file_url}`}
                                                                            download
                                                                            className="text-primary d-flex align-items-center"
                                                                        >
                                                                            <span className="me-2">Existing File:</span>
                                                                            <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                width={24}
                                                                                height={24}
                                                                                fill="#DE7008"
                                                                                className="bi bi-download"
                                                                                viewBox="0 0 16 16"
                                                                            >
                                                                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                                                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                                                            </svg>
                                                                            {owner?.attachment.filename || owner?.attachment.document_name}
                                                                        </a>
                                                                    </span>
                                                                ) : owner.attachment.filename ? (
                                                                    <span className="d-flex align-items-center">
                                                                        <span className="me-2">Selected File:</span>
                                                                        <span className="text-muted">{owner.attachment.filename}</span>
                                                                    </span>
                                                                ) : null
                                                            ) : null}




                                                            <input
                                                                className="form-control"
                                                                type="file"
                                                                onChange={e => handleOwnerChange(idx, 'attachment', e.target.files[0])}
                                                            />

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CollapsedCardKYC>

                                    ))}
                                    <div className="row mt-2 ms-2 justify-content-start">
                                        <div className="col-md-4">
                                            <button className="purple-btn1" onClick={e => { e.preventDefault(); addOwner(); }}>
                                                Add Director Details
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}


                            {/* Turnover Table */}
                            {isSectionVisible('annual turnover') && (
                                <>
                                    <div className="mx-3 mt-4">
                                        <div className="col-md-12">
                                            <h5 className="mb-3">Annual Turnover
                                                <TooltipIcon message="Enter the value of Turnover in Lacs." />
                                            </h5>
                                        </div>
                                        <div className="tbl-container mt-3 ">
                                            <table className=" w-100">
                                                <thead>
                                                    <tr>
                                                        <th>FY</th>
                                                        <th>Turnover in Lacs</th>
                                                        <th>Attachment</th>
                                                        <th>Key Markets</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {annualTurnover.map((item, idx) => (
                                                        <tr key={item.year}>
                                                            <td>{item.year}</td>
                                                            <td>
                                                                {/* <input
                                                            className="form-control"
                                                            type="number"
                                                            placeholder="Enter Turnover"
                                                            value={item.turnover}
                                                            onChange={e => handleAnnualTurnoverChange(idx, 'turnover', e.target.value)}
                                                        /> */}


                                                                <input
                                                                    className="form-control"
                                                                    type="number"
                                                                    placeholder="Enter Turnover"
                                                                    value={item.turnover}
                                                                    min="0"
                                                                    onKeyDown={e => {
                                                                        if (e.key === '-' || e.key === 'e' || e.key === 'E' || e.key === '+') {
                                                                            e.preventDefault();
                                                                        }
                                                                    }}
                                                                    onChange={e => {
                                                                        const value = e.target.value;
                                                                        if (value < 0) return;
                                                                        handleAnnualTurnoverChange(idx, 'turnover', value);
                                                                    }}
                                                                />
                                                            </td>
                                                            <td>


                                                                {item?.attachment ? (
                                                                    item?.attachment?.attachment_url || item?.attachment?.file_url ? (
                                                                        <span className="">
                                                                            <a
                                                                                href={`${baseURL}${item.attachment.attachment_url || item.attachment.file_url}`}
                                                                                download
                                                                                className="text-primary d-flex align-items-center"
                                                                            >
                                                                                <span className="me-2">Existing File:</span>
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width={24}
                                                                                    height={24}
                                                                                    fill="#DE7008"
                                                                                    className="bi bi-download"
                                                                                    viewBox="0 0 16 16"
                                                                                >
                                                                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                                                                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                                                                </svg>
                                                                                {item?.attachment.filename || item?.attachment.document_name}
                                                                            </a>
                                                                        </span>
                                                                    ) : item.attachment.filename ? (
                                                                        <span className="d-flex align-items-center">
                                                                            <span className="me-2">Selected File:</span>
                                                                            <span className="text-muted">{item.attachment.filename}</span>
                                                                        </span>
                                                                    ) : null
                                                                ) : null}

                                                                <input
                                                                    className="form-control"
                                                                    type="file"
                                                                    onChange={e => handleAnnualTurnoverFileChange(idx, e.target.files[0])}
                                                                />
                                                                {turnoverErrors[item.year]?.attachment && (
                                                                    <div className="ValidationColor">{turnoverErrors[item.year].attachment}</div>
                                                                )}
                                                            </td>
                                                            <td>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    placeholder="Enter Key Markets"
                                                                    value={item.keyMarkets}
                                                                    onChange={e => handleAnnualTurnoverChange(idx, 'keyMarkets', e.target.value)}
                                                                />
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </>
                            )}

                        </div>
                    )}



                    {(normalize(steps[currentStep]?.label || '') === normalize('Statutory Details')) && (
                        <div className="card mx-4 pb-4 mt-4">
                            {isSectionVisible('statutory details') && (
                                <>
                                    <div className="row mt-4 mx-2">

                                        {statutoryDetails && statutoryDetails.length > 0 && (

                                            <div className="col-md-12">
                                                <h5 className="mb-3">Additional Vendor Statutory Details
                                                    <TooltipIcon message="If not applicable then keep The field blank Additional Vendor Statutory Details." />
                                                </h5>
                                            </div>
                                        )}

                                        {/* <div>{"*********************************************************"} </div> */}




                                        {statutoryDetails?.map((field, index) => (
                                            <div className="row" key={`${field.id}-${index}`}>
                                                <div className="col-md-6 mt-3">
                                                    <div className="form-group">
                                                        <label>{field.name}</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder={`Enter ${field.name}`}
                                                            // value={statutoryInputs[field.code]?.input || field.statutory_detail_value}
                                                            value={
                                                                statutoryInputs[field.code]?.input !== undefined
                                                                    ? statutoryInputs[field.code]?.input
                                                                    : field.statutory_detail_value || ""
                                                            }
                                                            onChange={(e) =>
                                                                handleStatutoryInputChange(field.code, e.target.value, field.id, field.statutory_detail_value)
                                                            }
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-md-6 mt-3">
                                                    <div className="form-group">
                                                        <div className="d-flex align-items-center mb-2">
                                                            <label className="mb-0">
                                                                Attachment
                                                                {shouldShowAttachmentStar(
                                                                    field.code,
                                                                    field.statutory_detail_value
                                                                ) && <span>  *</span>}
                                                            </label>
                                                            {field?.attachment_url && (
                                                                <span className="ms-2">
                                                                    <a
                                                                        href={`${baseURL}${field?.attachment_url}`}
                                                                        download
                                                                        className="text-primary d-flex align-items-center"
                                                                    >
                                                                        <span className="me-2 ms-3">Existing Files:</span>
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            width={24}
                                                                            height={24}
                                                                            fill="#DE7008"
                                                                            className="bi bi-download"
                                                                            viewBox="0 0 16 16"
                                                                        >
                                                                            <path
                                                                                d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"
                                                                            />
                                                                            <path
                                                                                d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"
                                                                            />
                                                                        </svg>
                                                                        {/* {field?.name ? field.name : "No Document Available"} */}
                                                                    </a>
                                                                </span>
                                                            )}
                                                        </div>
                                                        <input
                                                            type="file"
                                                            className="form-control"
                                                            accept=".pdf,.jpg,.jpeg,.png"
                                                            onChange={(e) =>
                                                                handleStatutoryFileChange(field.code, e.target.files[0], field.id, field.statutory_detail_value)
                                                            }
                                                        />
                                                        {statutoryErrors[field.code] && (
                                                            <div className="ValidationColor">
                                                                {statutoryErrors[field.code]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>)}


                            {isSectionVisible('questions & answers') && (
                                <>
                                    <div className="mb-3 mx-3 mt-5">
                                        <h5 className="mb-3">Questions</h5>
                                        <div className="row mb-3">
                                            <div className="col-md-12 mb-3">
                                                <label>Mention about your company expertise, briefly</label>
                                                <textarea
                                                    className="form-control"
                                                    rows="3"
                                                    placeholder="Describe your company expertise"
                                                    value={questions.expertise}
                                                    onChange={e => handleQuestionChange('expertise', e.target.value)}
                                                ></textarea>
                                            </div>
                                        </div>
                                        {/* <div className="row mb-3">
                                    <div className="col-md-4 offset-md-8 mb-3">
                                        <input
                                            className="form-control"
                                            type="file"
                                            onChange={e => handleQuestionFileChange(e.target.files[0])}
                                        />
                                    </div>
                                </div> */}
                                        <div className="row mb-3">
                                            <div className="col-md-12 mb-3">
                                                <label>What is the organization and structure of the company / firm?</label>
                                                <textarea
                                                    className="form-control"
                                                    rows="3"
                                                    placeholder="Describe the organization and structure"
                                                    value={questions.structure}
                                                    onChange={e => handleQuestionChange('structure', e.target.value)}
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </>)}
                        </div>
                    )}

                    {(normalize(steps[currentStep]?.label || '') === normalize('Prequalification')) && (
                        <div className="card mx-4 pb-4 mt-4">
                            {/* Financial Pre-Qualification Table */}
                            {isSectionVisible('prequalification') && (
                                <>

                                    {checklistConfig.filter(cat => cat.snag_cat_name === "Financial Pre-Qualification").map((cat, catIdx) => (
                                        <div className="card mx-3 pb-4 mt-4" key={cat.snag_category}>
                                            <div className="card-header3">
                                                <h3 className="card-title">{cat.snag_cat_name}</h3>
                                            </div>
                                            <div className="card-body mt-0">
                                                <div className="tbl-container mt-3 ">
                                                    <table className="w-100">
                                                        <thead>
                                                            <tr>
                                                                <th>Sr. No.</th>
                                                                <th>Particulars</th>
                                                                <th>Response</th>
                                                                <th>Required Documents</th>
                                                                <th>Remark if any</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {cat.subcats.map((subcat, subIdx) => (
                                                                <React.Fragment key={subcat.id}>
                                                                    <tr>
                                                                        <td>{subIdx + 1}</td>
                                                                        <td ><b>{subcat.name}</b></td>
                                                                        <td></td>
                                                                        <td></td>
                                                                        <td></td>
                                                                    </tr>
                                                                    {subcat.questions.map((q, qIdx) => {
                                                                        const qState = (checklistResponses[subcat.id]?.questions || [])[qIdx] || {};
                                                                        return (
                                                                            <tr key={q.id}>
                                                                                <td>{`${subIdx + 1}.${qIdx + 1}`}</td>
                                                                                <td>{q.descr}</td>
                                                                                <td>
                                                                                    {q.qtype === 'multiple' ? (
                                                                                        <SingleSelector
                                                                                            options={(q.options || []).map(opt => ({ label: opt.name, value: opt.value }))}
                                                                                            value={qState.selectedOption}
                                                                                            onChange={selected => handleChecklistOptionChange(subcat.id, q.id, selected)}
                                                                                            placeholder="Select"
                                                                                        />
                                                                                    ) : (
                                                                                        <input
                                                                                            className="form-control"
                                                                                            type="text"
                                                                                            placeholder="Enter response"
                                                                                            value={qState.value || ''}
                                                                                            onChange={e => handleChecklistResponseChange(subcat.id, q.id, 'value', e.target.value)}
                                                                                        />
                                                                                    )}
                                                                                </td>
                                                                                <td>
                                                                                    <input
                                                                                        className="form-control"
                                                                                        type="file"
                                                                                        onChange={e => handleChecklistFileChange(subcat.id, q.id, e.target.files[0])}
                                                                                    />
                                                                                    {/* Show uploaded file names or server-provided attachments with download link */}
                                                                                    {qState.files && qState.files.length > 0 && (
                                                                                        <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                                                                                            {(() => {
                                                                                                // Prefer user-selected local uploads (they won't have file_url)
                                                                                                const localFiles = qState.files.filter(f => !f.file_url);
                                                                                                const filesToShow = localFiles.length > 0 ? localFiles : qState.files;
                                                                                                return filesToShow.map((f, i) => {
                                                                                                    const href = f.file_url ? (String(f.file_url).startsWith('http') ? f.file_url : `${baseURL}${f.file_url}`) : null;
                                                                                                    return (
                                                                                                        <li key={i} style={{ marginBottom: 4 }}>
                                                                                                            {href ? (
                                                                                                                <a href={href} download className="text-primary d-flex align-items-center mt-1" style={{ gap: 6 }}>
                                                                                                                    <svg
                                                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                                                        width={24}
                                                                                                                        height={24}
                                                                                                                        fill="#DE7008"
                                                                                                                        className="bi bi-download"
                                                                                                                        viewBox="0 0 16 16"
                                                                                                                    >
                                                                                                                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                                                                                                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                                                                                                    </svg>
                                                                                                                    <span>{f.filename}</span>
                                                                                                                </a>
                                                                                                            ) : (
                                                                                                                <span className="mt-2">{f.filename}</span>
                                                                                                            )}
                                                                                                        </li>
                                                                                                    );
                                                                                                });
                                                                                            })()}
                                                                                        </ul>
                                                                                    )}
                                                                                </td>
                                                                                <td>
                                                                                    <textarea
                                                                                        className="form-control"
                                                                                        type="text"
                                                                                        placeholder=" Enter Remark"
                                                                                        value={qState.comments || ''}
                                                                                        onChange={e => handleChecklistResponseChange(subcat.id, q.id, 'comments', e.target.value)}
                                                                                    />
                                                                                </td>
                                                                            </tr>
                                                                        );
                                                                    })}
                                                                </React.Fragment>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Technical Pre-Qualification Table */}
                                    {checklistConfig.filter(cat => cat.snag_cat_name === "Technical Pre-Qualification").map((cat, catIdx) => (
                                        <div className="card mx-3 pb-4 mt-4" key={cat.snag_category}>
                                            <div className="card-header3">
                                                <h3 className="card-title">{cat.snag_cat_name}</h3>
                                            </div>
                                            <div className="card-body mt-0">
                                                <div className="tbl-container mt-3 ">
                                                    <table className="w-100">
                                                        <thead>
                                                            <tr>
                                                                <th>Sr. No.</th>
                                                                <th>Particulars</th>
                                                                <th>Response</th>
                                                                <th>Required Documents</th>
                                                                <th>Remark if any</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {cat.subcats.map((subcat, subIdx) => (
                                                                <React.Fragment key={subcat.id}>
                                                                    <tr>
                                                                        <td>{subIdx + 1}</td>
                                                                        <td><b>{subcat.name}</b></td>
                                                                        <td></td>
                                                                        <td></td>
                                                                        <td></td>
                                                                    </tr>
                                                                    {subcat.questions.map((q, qIdx) => {
                                                                        const qState = (checklistResponses[subcat.id]?.questions || [])[qIdx] || {};
                                                                        return (
                                                                            <tr key={q.id}>
                                                                                <td>{`${subIdx + 1}.${qIdx + 1}`}</td>
                                                                                <td>{q.descr}</td>
                                                                                <td style={{ minWidth: '150px' }}>
                                                                                    {q.qtype === 'multiple' ? (
                                                                                        <SingleSelector
                                                                                            options={(q.options || []).map(opt => ({ label: opt.name, value: opt.value }))}
                                                                                            value={qState.selectedOption}
                                                                                            onChange={selected => handleChecklistOptionChange(subcat.id, q.id, selected)}
                                                                                            placeholder="Select"
                                                                                        />
                                                                                    ) : (
                                                                                        <input
                                                                                            className="form-control"
                                                                                            type="text"
                                                                                            placeholder="Enter response"
                                                                                            value={qState.value || ''}
                                                                                            onChange={e => handleChecklistResponseChange(subcat.id, q.id, 'value', e.target.value)}
                                                                                        />
                                                                                    )}
                                                                                </td>
                                                                                <td>
                                                                                    <input
                                                                                        className="form-control"
                                                                                        type="file"
                                                                                        onChange={e => handleChecklistFileChange(subcat.id, q.id, e.target.files[0])}
                                                                                    />
                                                                                    {qState.files && qState.files.length > 0 && (
                                                                                        <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                                                                                            {(() => {
                                                                                                const localFiles = qState.files.filter(f => !f.file_url);
                                                                                                const filesToShow = localFiles.length > 0 ? localFiles : qState.files;
                                                                                                return filesToShow.map((f, i) => {
                                                                                                    const href = f.file_url ? (String(f.file_url).startsWith('http') ? f.file_url : `${baseURL}${f.file_url}`) : null;
                                                                                                    return (
                                                                                                        <li key={i} style={{ marginBottom: 4 }}>
                                                                                                            {href ? (
                                                                                                                <a href={href} download className="text-primary d-flex align-items-center mt-1" style={{ gap: 6 }}>
                                                                                                                    <svg
                                                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                                                        width={20}
                                                                                                                        height={20}
                                                                                                                        fill="#DE7008"
                                                                                                                        className="bi bi-download"
                                                                                                                        viewBox="0 0 16 16"
                                                                                                                    >
                                                                                                                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                                                                                                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                                                                                                    </svg>
                                                                                                                    <span style={{ fontSize: 12 }}>{f.filename}</span>
                                                                                                                </a>
                                                                                                            ) : (
                                                                                                                <span style={{ fontSize: 12 }}>{f.filename}{!f.file_url ? ' (uploaded)' : ''}</span>
                                                                                                            )}
                                                                                                        </li>
                                                                                                    );
                                                                                                });
                                                                                            })()}
                                                                                        </ul>
                                                                                    )}
                                                                                </td>
                                                                                <td>
                                                                                    <textarea
                                                                                        className="form-control"
                                                                                        type="text"
                                                                                        placeholder=" Enter Remark"
                                                                                        value={qState.comments || ''}
                                                                                        onChange={e => handleChecklistResponseChange(subcat.id, q.id, 'comments', e.target.value)}
                                                                                    />
                                                                                </td>
                                                                            </tr>
                                                                        );
                                                                    })}
                                                                </React.Fragment>
                                                            ))}
                                                            {/* Show checklistPayload for review */}
                                                            {/* <div className="mt-4 mx-3">
                <h5>Checklist Payload Preview</h5>
                <pre style={{ background: '#f8f9fa', padding: '12px', fontSize: '12px', maxHeight: '300px', overflow: 'auto' }}>{JSON.stringify(checklistPayload, null, 2)}</pre>
            </div> */}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                </>)}
                        </div>
                    )}


                    {(normalize(steps[currentStep]?.label || '') === normalize('Preview & Declarations')) && (
                        <>
                            <div className="card mx-4 pb-4 mt-4">
                                <div className="card mx-4 pb-4 mt-4 mt-5">
                                    <div className="card-header3">
                                        <h3 className="card-title">Organization Details</h3>
                                    </div>
                                    <div className="card-body mt-0">
                                        <div className="row px-3">
                                            <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                                                <div className="col-6 ">
                                                    <label>Company</label>
                                                </div>
                                                <div className="col-6">
                                                    <label className="text">
                                                        <span className="me-3">
                                                            <span className="text-dark">:</span>
                                                        </span>
                                                        {supplierShowData?.organization_name || "-"}
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                                                <div className="col-6 ">
                                                    <label>Certifying Company GSTIN</label>
                                                </div>
                                                <div className="col-6">
                                                    <label className="text">
                                                        <span className="me-3">
                                                            <span className="text-dark">:</span>
                                                        </span>
                                                        {supplierShowData?.gstin || "-"}
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                                                <div className="col-6 ">
                                                    <label>Site</label>
                                                </div>
                                                <div className="col-6">
                                                    <label className="text">
                                                        <span className="me-3">
                                                            <span className="text-dark">:</span>
                                                        </span>
                                                        {supplierShowData?.site_name || "-"}
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                                                <div className="col-6 ">
                                                    <label>Department</label>
                                                </div>
                                                <div className="col-6">
                                                    <label className="text">
                                                        <span className="me-3">
                                                            <span className="text-dark">:</span>
                                                        </span>
                                                        {supplierShowData?.department_name || "-"}
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                                                <div className="col-6 ">
                                                    <label>Invited By</label>
                                                </div>
                                                <div className="col-6">
                                                    <label className="text">
                                                        <span className="me-3">
                                                            <span className="text-dark">:</span>
                                                        </span>
                                                        {supplierShowData?.invited_by_name || "-"}
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                                                <div className="col-6 ">
                                                    <label>Contact Number</label>
                                                </div>
                                                <div className="col-6">
                                                    <label className="text">
                                                        <span className="me-3">
                                                            <span className="text-dark">:</span>
                                                        </span>
                                                        {supplierShowData?.mobile || "-"}
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Step 1: Basic Info Card (readonly, full UI) */}

                                {isSectionVisible('basic details') && (
                                    <div className="card mx-4 pb-4 mt-5">
                                        <div className="card-header3">
                                            <h3 className="card-title">Basic Information</h3>
                                        </div>
                                        <div className="card-body mt-0">
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>
                                                            Vendor Organization Name <span>*</span>
                                                            <TooltipIcon message="Enter the full legal name of the vendor organization." />
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            value={basicInfo.vendorOrganizationName}
                                                            disabled
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>
                                                            Type of Organization <span>*</span>
                                                            <TooltipIcon message="Choose the type of your organization from the options provided to help us better understand your profile." />
                                                        </label>
                                                        <SingleSelector
                                                            options={organizationTypeOptions}
                                                            placeholder="Select Organization Type"
                                                            value={basicInfo.organizationType}
                                                            onChange={() => { }}
                                                            isDisabled={true}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>
                                                            Nature of Business <span>*</span>
                                                        </label>
                                                        <SingleSelector
                                                            options={[{ label: 'Finance Vendor', value: 'finance_vendor' }]}
                                                            placeholder="Select Nature of Business"
                                                            value={basicInfo.natureOfBusiness}
                                                            onChange={() => { }}
                                                            isDisabled={true}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">
                                                        <label>
                                                            Vendor Type  <span>*</span>
                                                        </label>
                                                        <SingleSelector
                                                            options={[{ label: 'Import Supplier', value: 'import_supplier' }]}
                                                            placeholder="Select Vendor Type"
                                                            value={basicInfo.vendorType}
                                                            onChange={() => { }}
                                                            isDisabled={true}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">
                                                        <label>
                                                            Type of Industry  <span>*</span>
                                                            <TooltipIcon message="Choose the industry that your organization operates in. This helps us better understand your sector." />
                                                        </label>
                                                        <SingleSelector
                                                            options={industryTypeOptions || []}
                                                            placeholder="Select Type of Industry"
                                                            value={basicInfo.industryType}
                                                            onChange={() => { }}
                                                            isDisabled={true}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">
                                                        <label>
                                                            Type of Work (Scope of work with Panchshil)<span>*</span>
                                                            <TooltipIcon message="Write the Type of Work that your organization operates in.This helps us better understand your sector." />
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            placeholder="Enter Address"
                                                            value={basicInfo.typeOfWork}
                                                            disabled
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">
                                                        <label>
                                                            Full Name  <span>*</span>
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            value={basicInfo.fullName}
                                                            disabled
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">
                                                        <label>
                                                            Email <span>*</span>
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            value={basicInfo.email}
                                                            disabled
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">
                                                        <label>
                                                            Mobile <span>*</span>
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            value={basicInfo.mobile}
                                                            disabled
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">
                                                        <label>
                                                            Key Market <span>*</span>
                                                            <TooltipIcon message="Write the Key Market that your organization operates in. This helps us better understand your sector." />
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            value={basicInfo.keyMarket}
                                                            disabled
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">
                                                        <label>
                                                            PAN No. <span>*</span>
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            value={basicInfo.panNo}
                                                            disabled
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">
                                                        <label>
                                                            PAN Attachment <span>*</span>
                                                            <TooltipIcon message="Please attach a clear PDF of your organization's PAN certificate. This is required for identity and tax verification." />
                                                        </label>
                                                        {/* Show existing PAN attachment when provided by API (file_url). If a local file object exists, show its filename. Input remains disabled in read-only preview. */}
                                                        {basicInfo?.panAttachmentObj?.file_url ? (
                                                            <span className="ms-2">
                                                                <a
                                                                    href={`${baseURL}${basicInfo.panAttachmentObj.file_url}`}
                                                                    download
                                                                    className="text-primary d-flex align-items-center"
                                                                >
                                                                    <span className="me-2">Existing File:</span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="#DE7008" className="bi bi-download" viewBox="0 0 16 16">
                                                                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                                                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                                                    </svg>
                                                                    {basicInfo.panAttachmentObj.filename}
                                                                </a>
                                                            </span>
                                                        ) : basicInfo?.panAttachmentObj?.filename ? (
                                                            <span className="ms-2 d-flex align-items-center">
                                                                <span className="me-2">Selected File:</span>
                                                                <span className="text-muted">{basicInfo.panAttachmentObj.filename}</span>
                                                            </span>
                                                        ) : null}
                                                        <input
                                                            className="form-control mt-2"
                                                            type="file"
                                                            accept=".pdf"
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">
                                                        <label>
                                                            Schema Group
                                                        </label>
                                                        <SingleSelector
                                                            options={[{ label: 'Domestic', value: 'domestic' }]}
                                                            value={basicInfo.schemaGroup}
                                                            onChange={() => { }}
                                                            placeholder="Select Schema Group"
                                                            isDisabled={true}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">
                                                        <label>
                                                            Date of Incorporation
                                                            <TooltipIcon message="Provide the date when your organization was officially incorporated. Use the format (DD-MM-YYYY) and refer to your incorporation certificate if needed." />
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="date"
                                                            value={basicInfo.dateOfIncorporation}
                                                            disabled
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>
                                                {(basicInfo?.organizationType?.label === 'Private Limited' || basicInfo?.organizationType?.label === 'Public Limited') && (
                                                    <>
                                                        <div className="col-md-4 mt-2">
                                                            <div className="form-group">
                                                                <label>
                                                                    Corporate Identification Number <span>*</span>
                                                                    <TooltipIcon message="Enter your organization's Corporate Identification Number\n(MCA), which is issued by the Ministry of Corporate Affairs\n(MCA) in India. This number uniquely identifies\u00A0your\u00A0company." />
                                                                </label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    value={basicInfo.cin}
                                                                    disabled
                                                                    readOnly
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4 mt-2">
                                                            <div className="form-group">
                                                                <label>
                                                                    Corporate Identification Number Attachment  <span>*</span>
                                                                    <TooltipIcon message="Upload the official document or certificate to verify the details you have submitted. The document must be uploaded in PDF format.\nCorporate Identification Number\u00A0Attachment." />
                                                                </label>
                                                                {/* Show existing CIN attachment when provided by API; display selected filename when present. Input is disabled in preview. */}
                                                                {basicInfo?.cinAttachmentObj?.file_url ? (
                                                                    <span className="ms-2">
                                                                        <a
                                                                            href={`${baseURL}${basicInfo.cinAttachmentObj.file_url}`}
                                                                            download
                                                                            className="text-primary d-flex align-items-center"
                                                                        >
                                                                            <span className="me-2">Existing File:</span>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="#DE7008" className="bi bi-download" viewBox="0 0 16 16">
                                                                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                                                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                                                            </svg>
                                                                            {basicInfo.cinAttachmentObj.filename}
                                                                        </a>
                                                                    </span>
                                                                ) : basicInfo?.cinAttachmentObj?.filename ? (
                                                                    <span className="ms-2 d-flex align-items-center">
                                                                        <span className="me-2">Selected File:</span>
                                                                        <span className="text-muted">{basicInfo.cinAttachmentObj.filename}</span>
                                                                    </span>
                                                                ) : null}
                                                                <input
                                                                    className="form-control mt-2"
                                                                    type="file"
                                                                    accept="application/pdf"
                                                                    disabled
                                                                />
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                                {(basicInfo?.organizationType?.label === 'Limited Liability Partnership (LLP)') && (
                                                    <>
                                                        <div className="col-md-4 mt-2">
                                                            <div className="form-group">
                                                                <label>
                                                                    LLP No. <span>*</span>
                                                                    <TooltipIcon message="Enter your organization's Corporate Identification Number\n(MCA), which is issued by the Ministry of Corporate Affairs\n(MCA) in India. This number uniquely identifies\u00A0your\u00A0company." />
                                                                </label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    value={basicInfo.llp}
                                                                    disabled
                                                                    readOnly
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4 mt-2">
                                                            <div className="form-group">
                                                                <label>
                                                                    LLP No. Attachment  <span>*</span>
                                                                    <TooltipIcon message="Upload the official document or certificate to verify the details you have submitted. The document must be uploaded in PDF format.\nCorporate Identification Number\u00A0Attachment." />
                                                                </label>
                                                                {/* Show existing LLP attachment when provided by API; display selected filename when present. Input is disabled in preview. */}
                                                                {basicInfo?.llpAttachmentObj?.file_url ? (
                                                                    <span className="ms-2">
                                                                        <a
                                                                            href={`${baseURL}${basicInfo.llpAttachmentObj.file_url}`}
                                                                            download
                                                                            className="text-primary d-flex align-items-center"
                                                                        >
                                                                            <span className="me-2">Existing File:</span>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="#DE7008" className="bi bi-download" viewBox="0 0 16 16">
                                                                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                                                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                                                            </svg>
                                                                            {basicInfo.llpAttachmentObj.filename}
                                                                        </a>
                                                                    </span>
                                                                ) : basicInfo?.llpAttachmentObj?.filename ? (
                                                                    <span className="ms-2 d-flex align-items-center">
                                                                        <span className="me-2">Selected File:</span>
                                                                        <span className="text-muted">{basicInfo.llpAttachmentObj.filename}</span>
                                                                    </span>
                                                                ) : null}
                                                                <input
                                                                    className="form-control mt-2"
                                                                    type="file"
                                                                    accept="application/pdf"
                                                                    disabled
                                                                />
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">
                                                        <label>
                                                            GSTIN Applicable <span>*</span>
                                                            <TooltipIcon message="Indicate whether your organization is registered under the Goods and Services Tax (GST) Act. Select 'Yes' if GSTIN is applicable to your organization" />
                                                        </label>
                                                        <SingleSelector
                                                            placeholder="Select Yes or No"
                                                            options={gstinApplicableOptions}
                                                            value={basicInfo.gstinApplicable}
                                                            onChange={() => { }}
                                                            isDisabled={true}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">
                                                        <label>
                                                            GSTIN Classification
                                                        </label>
                                                        <SingleSelector
                                                            value={basicInfo.gstinClassification}
                                                            onChange={() => { }}
                                                            placeholder="Select Country"
                                                            isDisabled={true}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    {basicInfo.gstinApplicable.label === 'Yes' && (
                                                        <>
                                                            <div className="col-md-4 mt-2">
                                                                <div className="form-group">
                                                                    <label>
                                                                        GSTIN No. <span>*</span>
                                                                    </label>
                                                                    <input
                                                                        className="form-control"
                                                                        type="text"
                                                                        value={basicInfo.gstinNo}
                                                                        disabled
                                                                        readOnly
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4 mt-2">
                                                                <div className="form-group">
                                                                    <label>
                                                                        GSTIN Attachment <span>*</span>
                                                                        <TooltipIcon message="Upload a digital copy of the official GSTIN certificate or document showing your GST registration number. Ensure the document is legible and valid." />
                                                                    </label>
                                                                    {/* Show existing GSTIN attachment when provided by API; display selected filename when present. Keep input disabled in preview. */}
                                                                    {basicInfo?.gstinAttachmentObj?.file_url ? (
                                                                        <span className="ms-2">
                                                                            <a
                                                                                href={`${baseURL}${basicInfo.gstinAttachmentObj.file_url}`}
                                                                                download
                                                                                className="text-primary d-flex align-items-center"
                                                                            >
                                                                                <span className="me-2">Existing File:</span>
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="#DE7008" className="bi bi-download" viewBox="0 0 16 16">
                                                                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                                                                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                                                                </svg>
                                                                                {basicInfo.gstinAttachmentObj.filename}
                                                                            </a>
                                                                        </span>
                                                                    ) : basicInfo?.gstinAttachmentObj?.filename ? (
                                                                        <span className="ms-2 d-flex align-items-center">
                                                                            <span className="me-2">Selected File:</span>
                                                                            <span className="text-muted">{basicInfo.gstinAttachmentObj.filename}</span>
                                                                        </span>
                                                                    ) : null}
                                                                    <input
                                                                        className="form-control mt-2"
                                                                        type="file"
                                                                        disabled
                                                                    />
                                                                </div>
                                                            </div>
                                                        </>
                                                    )}
                                                    {basicInfo.gstinApplicable.label === 'No' && (
                                                        <>
                                                            <div className="col-md-4 mt-2">
                                                                <div className="form-group">
                                                                    <label>
                                                                        Download Specimen
                                                                    </label>
                                                                    <span className="ms-2">
                                                                        <a download className="text-primary d-flex align-items-center">
                                                                            <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                width={24}
                                                                                height={24}
                                                                                fill="#DE7008"
                                                                                className="bi bi-download"
                                                                                viewBox="0 0 16 16"
                                                                            >
                                                                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                                                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                                                            </svg>
                                                                        </a>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4 mt-2">
                                                                <div className="form-group">
                                                                    <label>
                                                                        Upload GSTIN Declaration  <span>*</span>
                                                                    </label>
                                                                    {/* Show existing GSTIN Declaration when provided by API; display selected filename when present. Keep input disabled in preview. */}
                                                                    {basicInfo?.gstinDeclarationObj?.file_url ? (
                                                                        <span className="ms-2">
                                                                            <a
                                                                                href={`${baseURL}${basicInfo.gstinDeclarationObj.file_url}`}
                                                                                download
                                                                                className="text-primary d-flex align-items-center"
                                                                            >
                                                                                <span className="me-2">Existing File:</span>
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="#DE7008" className="bi bi-download" viewBox="0 0 16 16">
                                                                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                                                                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                                                                </svg>
                                                                                {basicInfo?.gstinDeclarationObj?.filename || basicInfo?.gstinAttachmentObj?.filename}
                                                                            </a>
                                                                        </span>
                                                                    ) : basicInfo?.gstinDeclarationObj?.filename ? (
                                                                        <span className="ms-2 d-flex align-items-center">
                                                                            <span className="me-2">Selected File:</span>
                                                                            <span className="text-muted">{basicInfo.gstinDeclarationObj.filename}</span>
                                                                        </span>
                                                                    ) : null}
                                                                    <input
                                                                        className="form-control mt-2"
                                                                        type="file"
                                                                        disabled
                                                                    />
                                                                </div>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Step 2: Additional Details Card (readonly) */}
                                {isSectionVisible('additional vendor details') && (
                                    <div className="card mx-4 pb-4 mt-4">
                                        <div className="card-header3">
                                            <h3 className="card-title">Additional Vendor Details</h3>
                                        </div>




                                        <div className="card-body mt-0">
                                            <div className="row">

                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>
                                                            Delivery Lead Period (In Days)
                                                            <TooltipIcon message="Enter the number of days required to deliver the product or service from the date of order confirmation." />
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            value={additionalDetails.deliveryLeadPeriod}
                                                            onChange={e => updateAdditionalDetails('deliveryLeadPeriod', e.target.value)}
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">



                                                    <div className="form-group">
                                                        <label>
                                                            Specify Warranty Period (In Years)
                                                            <TooltipIcon message="Enter the duration of the warranty for the product or service, in years. This is the period during which the item will be covered for repairs or replacement." />
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            value={additionalDetails.warrantyPeriod}
                                                            onChange={e => updateAdditionalDetails('warrantyPeriod', e.target.value)}
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">

                                                        <label>
                                                            AMC Provided
                                                            <TooltipIcon message="Please specify if an Annual Maintenance Contract (AMC) is included with the product or service. Select 'Yes if AMC is provided." />
                                                        </label>
                                                        <SingleSelector
                                                            options={gstinApplicableOptions}
                                                            value={additionalDetails.amcProvided}
                                                            onChange={val => updateAdditionalDetails('amcProvided', val)}
                                                            isDisabled={true}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">
                                                        <label>
                                                            Website
                                                            <TooltipIcon message="Enter the URL of your company's website where users can lear more about your products or services." />
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            value={additionalDetails.website}
                                                            onChange={e => updateAdditionalDetails('website', e.target.value)}
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-4  mt-2">
                                                    <div className="form-group">
                                                        {/* Label with Tooltip */}
                                                        <label>
                                                            Currency Type <span>*</span>
                                                            {/* <TooltipIcon message="Please choose your country from the list" /> */}
                                                        </label>
                                                        <SingleSelector
                                                            options={currencyOptions}
                                                            placeholder="Select Currency Type"
                                                            value={additionalDetails.currencyType}
                                                            onChange={val => updateAdditionalDetails('currencyType', val)}
                                                            isDisabled={true}
                                                        />
                                                        {errors.currencyType && (
                                                            <div className="ValidationColor">{errors.currencyType}</div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">

                                                        <label>
                                                            MSME/Udyam Number Applicable  <span>*</span>
                                                            <TooltipIcon message="Select whether your organization is registered under the MSME (Micro, Small, and Medium Enterprises) or Udyam scheme. Choose 'Yes' if applicable, otherwise select 'No.' By selecting 'No,' you confirm that your organization does not hold a valid MSME/Udyam registration number. A declaration is required, and this response will be timestamped to record the submission date and time." />
                                                        </label>
                                                        <SingleSelector
                                                            value={additionalDetails.msmeUdyamApplicable}
                                                            onChange={val => updateAdditionalDetails('msmeUdyamApplicable', val)}
                                                            options={options}
                                                            className="form-control"
                                                            placeholder="Select MSME/Udyam Number Applicable"
                                                            isDisabled={true}
                                                        />
                                                        {errors.msmeUdyamApplicable && (
                                                            <div className="ValidationColor">{errors.msmeUdyamApplicable}</div>
                                                        )}

                                                    </div>
                                                </div>

                                                {additionalDetails.msmeUdyamApplicable?.value === "Yes" && (
                                                    <div className="col-md-4 mt-2">
                                                        <div className="form-group">
                                                            <label

                                                            >
                                                                MSME/Udyam Number <span>*</span>
                                                                <TooltipIcon message="Enter your organization's valid MSME or Udyam registration number. This number is issued by the Ministry of Micro, Small, and Medium Enterprises (MSME) under the Udyam registration scheme" />
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="name"
                                                                placeholder=""
                                                                value={additionalDetails.msmeNo}
                                                                onChange={e => updateAdditionalDetails('msmeNo', e.target.value)}
                                                                disabled
                                                            // value={supplierData?.msme_details?.msme_no}
                                                            />
                                                            {errors.msmeNo && (
                                                                <div className="ValidationColor">{errors.msmeNo}</div>
                                                            )}
                                                            {/* Show error */}
                                                        </div>
                                                    </div>
                                                )}

                                                {additionalDetails.msmeUdyamApplicable?.value === "Yes" && (
                                                    <div className="col-md-4 mt-2">
                                                        <div className="form-group">
                                                            <label >
                                                                Classifiction Year <span>*</span>
                                                            </label>

                                                            <SingleSelector
                                                                value={additionalDetails.classificationYear}
                                                                onChange={val => updateAdditionalDetails('classificationYear', val)}
                                                                options={optionsClassificationYear}
                                                                className="form-control"
                                                                placeholder="Select Classification Year"
                                                                isDisabled={true}
                                                            />

                                                            {/* Show error */}
                                                            {errors.classificationYear && (
                                                                <div className="ValidationColor">
                                                                    {errors.classificationYear}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}


                                                {additionalDetails.msmeUdyamApplicable?.value === "Yes" && (
                                                    <div className="col-md-4 mt-2">
                                                        <div className="form-group">
                                                            <label>
                                                                Major Activity <span>*</span>
                                                            </label>


                                                            <SingleSelector
                                                                value={additionalDetails.majorActivity}
                                                                onChange={val => updateAdditionalDetails('majorActivity', val)}
                                                                options={optionsMajorActivity}
                                                                className="form-control"
                                                                placeholder="Select Major Activity"
                                                                isDisabled={true}
                                                            />
                                                            {/* {console.log("majorActivity", majorActivity)} */}

                                                            {errors.majorActivity && (
                                                                <div className="ValidationColor">
                                                                    {errors.majorActivity}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* MSME/Udyam Valid From */}
                                                {additionalDetails.msmeUdyamApplicable?.value === "Yes" && (
                                                    <div className="col-md-4 mt-2">
                                                        <div className="form-group">
                                                            <label >
                                                                MSME/Udyam Valid From <span>*</span>
                                                                <TooltipIcon message="Enter the date when your MSME/Udyam registration became valid. This is the start date mentioned on your MSME/Udyam registration certificate for the financial year." />
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="date"
                                                                name="name"
                                                                placeholder=""
                                                                value={additionalDetails.validFrom}
                                                                disabled={!!additionalDetails.classificationYear}
                                                                onChange={e => updateAdditionalDetails('validFrom', e.target.value)}

                                                            // value={supplierData?.msme_details?.valid_from}
                                                            />
                                                            {errors.validFrom && (
                                                                <div className="ValidationColor">
                                                                    {errors.validFrom}
                                                                </div>
                                                            )}
                                                            {/* Show error */}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* MSME/Udyam Valid Till */}
                                                {additionalDetails.msmeUdyamApplicable?.value === "Yes" && (
                                                    <div className="col-md-4 mt-2">
                                                        <div className="form-group">
                                                            <label >
                                                                MSME/Udyam Valid Till <span>*</span>
                                                                <TooltipIcon message="Enter the date when your MSME/Udyam registration became valid. This is the end date mentioned on your MSME/Udyam registration certificate for the financial year." />
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="date"
                                                                name="name"
                                                                placeholder=""
                                                                value={additionalDetails.validTill}
                                                                disabled={!!additionalDetails.classificationYear}
                                                                onChange={e => updateAdditionalDetails('validTill', e.target.value)}
                                                            // value={supplierData?.msme_details?.valid_till}
                                                            />
                                                            {errors.validTill && (
                                                                <div className="ValidationColor">
                                                                    {errors.validTill}
                                                                </div>
                                                            )}
                                                            {/* Show error */}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* MSME Enterprise Type */}
                                                {additionalDetails.msmeUdyamApplicable?.value === "Yes" && (
                                                    <div className="col-md-4 mt-2">
                                                        <div className="form-group">
                                                            <label  >
                                                                MSME Enterprise Type <span>*</span>
                                                                <TooltipIcon message="Select the type of your organization under the MSME (Micro, Small, and Medium Enterprises) scheme. Choose from 'Micro,'Small,' or 'Medium' based on your organization's annual turnover and investment in plant and machinery." />
                                                            </label>

                                                            <SingleSelector
                                                                value={additionalDetails.msmeEnterpriseType}
                                                                onChange={val => updateAdditionalDetails('msmeEnterpriseType', val)}
                                                                options={optionsEnterPrise}
                                                                className="form-control"
                                                                placeholder="Select option..."
                                                                isDisabled={true}
                                                            />
                                                            {errors.msmeEnterpriseType && (
                                                                <div className="ValidationColor">
                                                                    {errors.msmeEnterpriseType}
                                                                </div>
                                                            )}
                                                            {/* Show error */}
                                                        </div>
                                                    </div>
                                                )}



                                                {/*  */}
                                                {additionalDetails.msmeUdyamApplicable?.value === "Yes" && (
                                                    <div className="col-md-4 mt-2">
                                                        <div className="form-group">
                                                            <label>
                                                                Download Specimen <span>*</span>
                                                            </label>
                                                            <a
                                                                download="Specimen_E-Invoicing_Declaration.docx"
                                                                className="text-primary d-flex align-items-center"
                                                                href={`${baseURL}/assets/Yes%20_%20msme.pdf`}
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width={24}
                                                                    height={24}
                                                                    fill="#DE7008"
                                                                    className="bi bi-download"
                                                                    viewBox="0 0 16 16"
                                                                >
                                                                    <path
                                                                        d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"
                                                                        style={{ fill: "#de7008!important" }}
                                                                    />
                                                                    <path
                                                                        d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"
                                                                        style={{ fill: "#de7008!important" }}
                                                                    />
                                                                </svg>
                                                                <span className="mt-2 ms-2">
                                                                    Specimen For Yes Msme.pdf
                                                                </span>
                                                            </a>
                                                            {/* Show MSME attachment (server) or selected filename in preview */}
                                                            {additionalDetails?.msmeAttachmentObj?.file_url ? (
                                                                <div className="mt-2">
                                                                    <a
                                                                        href={`${additionalDetails.msmeAttachmentObj.file_url.startsWith('http') ? additionalDetails.msmeAttachmentObj.file_url : `${baseURL}${additionalDetails.msmeAttachmentObj.file_url}`}`}
                                                                        download
                                                                        className="text-primary d-flex align-items-center"
                                                                    >
                                                                        <span className="me-2">Existing MSME File:</span>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="#DE7008" className="bi bi-download" viewBox="0 0 16 16">
                                                                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                                                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                                                        </svg>
                                                                        <span className="ms-2">{additionalDetails.msmeAttachmentObj.filename}</span>
                                                                    </a>
                                                                </div>
                                                            ) : additionalDetails?.msmeAttachmentObj?.filename ? (
                                                                <div className="mt-2 d-flex align-items-center">
                                                                    <span className="me-2">Selected MSME File:</span>
                                                                    <span className="text-muted">{additionalDetails.msmeAttachmentObj.filename}</span>
                                                                </div>
                                                            ) : null}
                                                            <input className="form-control mt-2" type="file" disabled />
                                                        </div>
                                                    </div>
                                                )}
                                                {/* MSME/Udyam Attachment */}
                                                {additionalDetails.msmeUdyamApplicable?.value === "Yes" && (


                                                    // MSME/Udyam Attachment field (show only from additionalDetails.msmeAttachmentObj)
                                                    <div className="col-md-4 mt-2">
                                                        <div className="form-group">
                                                            <label>
                                                                MSME/Udyam Attachment <span>*</span>
                                                                <TooltipIcon message="Attach a clear, scanned copy or digital image of your MSME/Udyam registration certificate to verify your organization's classification under the MSME scheme. The document must be uploaded in PDF format." />
                                                            </label>
                                                            {/* Show MSME/Udyam attachment only when it comes from the API (has a file_url).
                                                        If the user picks a new file via input we store filename/content and should NOT show download link —
                                                        instead render the selected filename as plain text. */}
                                                            {additionalDetails?.msmeAttachmentObj?.file_url ? (
                                                                <span className="ms-2">
                                                                    <a
                                                                        href={`${baseURL}${additionalDetails.msmeAttachmentObj.file_url}`}
                                                                        download
                                                                        className="text-primary d-flex align-items-center"
                                                                    >
                                                                        <span className="me-2">Uploaded File:</span>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="#DE7008" className="bi bi-download" viewBox="0 0 16 16">
                                                                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                                                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                                                        </svg>
                                                                        {additionalDetails.msmeAttachmentObj.filename}
                                                                    </a>
                                                                </span>
                                                            ) : additionalDetails?.msmeAttachmentObj?.filename ? (
                                                                <span className="ms-2 d-flex align-items-center">
                                                                    <span className="me-2">Selected File:</span>
                                                                    <span className="text-muted">{additionalDetails.msmeAttachmentObj.filename}</span>
                                                                </span>
                                                            ) : null}
                                                            <input
                                                                className="form-control mt-2"
                                                                type="file"
                                                                onChange={e => {
                                                                    const file = e.target.files[0];
                                                                    if (file) {
                                                                        const reader = new FileReader();
                                                                        reader.onload = function (ev) {
                                                                            updateAdditionalDetails('msmeAttachmentObj', {
                                                                                filename: file.name,
                                                                                content: ev.target.result.split(',')[1],
                                                                                content_type: file.type,
                                                                            });
                                                                        };
                                                                        reader.readAsDataURL(file);
                                                                    }
                                                                }}
                                                                ref={fileInputRef}
                                                                multiple
                                                                accept=".pdf"
                                                                disabled
                                                            />
                                                            {errors.msmeAttachments && (
                                                                <div className="ValidationColor">
                                                                    {errors.msmeAttachments}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}


                                                <div className="row">
                                                    {additionalDetails.msmeUdyamApplicable?.value === "No" && (
                                                        <div className="col-md-4 mt-2 ms-3">
                                                            <div className="form-group">
                                                                <label
                                                                >
                                                                    Download Specimen <span>*</span>
                                                                </label>
                                                                <TooltipIcon message="If you choose 'No' for e-invoicing, a specimen format will be available for download. This is for businesses not subject to e-invoicing under GST regulations. Please upload a signed declaration stating that your organization is not registered.The document must be uploaded in PDF format" />
                                                                <a
                                                                    download="Specimen_E-Invoicing_Declaration.docx"
                                                                    className="text-primary d-flex align-items-center"
                                                                    href={`${baseURL}/assets/NO_%20MSME.pdf`}
                                                                    onClick={(e) => {
                                                                        // Force navigation in the same tab to avoid any target/_blank behavior
                                                                        e.preventDefault();
                                                                        window.location.href = `${baseURL}/assets/NO_%20MSME.pdf`;
                                                                    }}
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width={24}
                                                                        height={24}
                                                                        fill="#DE7008"
                                                                        className="bi bi-download"
                                                                        viewBox="0 0 16 16"
                                                                    >
                                                                        <path
                                                                            d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"
                                                                            style={{ fill: "#de7008!important" }}
                                                                        />
                                                                        <path
                                                                            d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"
                                                                            style={{ fill: "#de7008!important" }}
                                                                        />
                                                                    </svg>

                                                                    <span className="mt-2 ms-2">
                                                                        Specimen For No Msme.pdf
                                                                    </span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {additionalDetails.msmeUdyamApplicable?.value === "No" && (


                                                        // MSME Declaration Upload Section
                                                        <div className="col-md-4 mt-2">
                                                            <div className="form-group">
                                                                <label>
                                                                    Upload Declaration <span>*</span>
                                                                </label>
                                                                <TooltipIcon message="If you choose E-Invoice applicable 'No', please upload a signed declaration document to verify the details you have submitted. The document must be uploaded in PDF format. Ensure that the document is clear, legible, and properly signed." />
                                                                {/* Show MSME Declaration only when it comes from the API (has a file_url).
                                                            If the user picks a new file via input we store filename/content and should NOT show download link —
                                                            instead render the selected filename as plain text. */}
                                                                {additionalDetails?.msmeDeclarationObj?.file_url ? (
                                                                    <span className="ms-2">
                                                                        <a
                                                                            href={`${baseURL}${additionalDetails.msmeDeclarationObj.file_url}`}
                                                                            download
                                                                            className="text-primary d-flex align-items-center"
                                                                        >
                                                                            <span className="me-2">Uploaded Declaration:</span>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="#DE7008" className="bi bi-download" viewBox="0 0 16 16">
                                                                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                                                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                                                            </svg>
                                                                            {additionalDetails?.msmeDeclarationObj?.filename || additionalDetails?.msmeAttachmentObj?.filename}
                                                                        </a>
                                                                    </span>
                                                                ) : additionalDetails?.msmeDeclarationObj?.filename ? (
                                                                    <span className="ms-2 d-flex align-items-center">
                                                                        <span className="me-2">Selected File:</span>
                                                                        <span className="text-muted">{additionalDetails.msmeDeclarationObj.filename}</span>
                                                                    </span>
                                                                ) : null}
                                                                <input
                                                                    className="form-control"
                                                                    type="file"
                                                                    accept=".pdf"
                                                                    name=""
                                                                    onChange={e => {
                                                                        const file = e.target.files[0];
                                                                        if (file) {
                                                                            const reader = new FileReader();
                                                                            reader.onload = function (ev) {
                                                                                updateAdditionalDetails('msmeDeclarationObj', {
                                                                                    filename: file.name,
                                                                                    content: ev.target.result.split(',')[1],
                                                                                    content_type: file.type,
                                                                                });
                                                                            };
                                                                            reader.readAsDataURL(file);
                                                                        }
                                                                    }}
                                                                />
                                                                {errors.msmeDeclaration && (
                                                                    <div className="ValidationColor">{errors.msmeDeclaration}</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>


                                                {basicInfo.gstinApplicable.label === 'Yes' && (
                                                    <div className="col-md-4 mt-2">
                                                        <div className="form-group">

                                                            <label>
                                                                E-invoicing Applicable  <span>*</span>
                                                                {/* <TooltipIcon message="Select whether your organization is registered under the MSME (Micro, Small, and Medium Enterprises) or Udyam scheme. Choose 'Yes' if applicable, otherwise select 'No.' By selecting 'No,' you confirm that your organization does not hold a valid MSME/Udyam registration number. A declaration is required, and this response will be timestamped to record the submission date and time." /> */}
                                                            </label>
                                                            <SingleSelector
                                                                value={additionalDetails.einvoice}
                                                                onChange={val => updateAdditionalDetails('einvoice', val)}
                                                                options={options}
                                                                className="form-control"
                                                                placeholder="Selec E-invoicing Applicable ."
                                                                isDisabled={true}
                                                            />
                                                            {errors.einvoice && (
                                                                <div className="ValidationColor">{errors.einvoice}</div>
                                                            )}

                                                        </div>
                                                    </div>
                                                )}
                                                <div className="row">
                                                    {additionalDetails.einvoice?.value === "No" && (
                                                        <div className="col-md-4 mt-2 ms-3">
                                                            <div className="form-group">
                                                                <label
                                                                >
                                                                    Download Specimen <span>*</span>
                                                                </label>
                                                                <TooltipIcon message="If you choose 'No' for e-invoicing, a specimen format will be available for download. This is for businesses not subject to e-invoicing under GST regulations. Please upload a signed declaration stating that your organization is not registered.The document must be uploaded in PDF format" />
                                                                <a
                                                                    download="Specimen_E-Invoicing_Declaration.docx"
                                                                    className="text-primary d-flex align-items-center"
                                                                    href={`${baseURL}/assets/NO_%20MSME.pdf`}
                                                                    target="_self" // Ensure it doesn't open in a new tab
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width={24}
                                                                        height={24}
                                                                        fill="#DE7008"
                                                                        className="bi bi-download"
                                                                        viewBox="0 0 16 16"
                                                                    >
                                                                        <path
                                                                            d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"
                                                                            style={{ fill: "#de7008!important" }}
                                                                        />
                                                                        <path
                                                                            d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"
                                                                            style={{ fill: "#de7008!important" }}
                                                                        />
                                                                    </svg>

                                                                    <span className="mt-2 ms-2">
                                                                        Specimen For No E-invoicing.pdf
                                                                    </span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {additionalDetails.einvoice?.value === "No" && (
                                                        <div className="col-md-4 mt-2">
                                                            <div className="form-group">
                                                                <label>
                                                                    Upload Declaration <span>*</span>
                                                                </label>


                                                                <TooltipIcon message="If you choose E-Invoice applicable 'No', please upload a signed declaration document to verify the details you have submitted. The document must be uploaded in PDF format.Ensure that the document is clear, legible, and properly signed." />

                                                                {/* Show existing server file or uploaded file preview */}
                                                                {/* {additionalDetails.einvoiceDeclaration && (
                                                            <div style={{ marginTop: 6 }}>
                                                                {additionalDetails.einvoiceDeclaration.file_url ? (
                                                                    <a
                                                                        href={String(additionalDetails.einvoiceDeclaration.file_url).startsWith('http') ? additionalDetails.einvoiceDeclaration.file_url : `${baseURL}${additionalDetails.einvoiceDeclaration.file_url}`}
                                                                        download
                                                                        className="text-primary d-flex align-items-center mt-1"
                                                                        style={{ gap: 6 }}
                                                                    >
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            width={20}
                                                                            height={20}
                                                                            fill="#DE7008"
                                                                            className="bi bi-download"
                                                                            viewBox="0 0 16 16"
                                                                        >
                                                                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                                                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                                                        </svg>
                                                                        <span style={{ fontSize: 12 }}>{additionalDetails.einvoiceDeclaration.filename}</span>
                                                                    </a>
                                                                ) : (
                                                                    <span style={{ fontSize: 12 }}>{additionalDetails.einvoiceDeclaration.filename} (uploaded)</span>
                                                                )}
                                                            </div>
                                                        )} */}
                                                                {additionalDetails.einvoiceDeclaration && (
                                                                    additionalDetails.einvoiceDeclaration.file_url ? (
                                                                        <span className="ms-2">
                                                                            <a
                                                                                href={String(additionalDetails.einvoiceDeclaration.file_url).startsWith('http') ? additionalDetails.einvoiceDeclaration.file_url : `${baseURL}${additionalDetails.einvoiceDeclaration.file_url}`}
                                                                                download
                                                                                className="text-primary d-flex align-items-center"
                                                                            >
                                                                                <span className="me-2">Uploaded Declaration:</span>
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="#DE7008" className="bi bi-download" viewBox="0 0 16 16">
                                                                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                                                                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                                                                </svg>
                                                                                {additionalDetails.einvoiceDeclaration.filename}
                                                                            </a>
                                                                        </span>
                                                                    ) : additionalDetails.einvoiceDeclaration.filename ? (
                                                                        <span className="ms-2 d-flex align-items-center">
                                                                            <span className="me-2">Selected File:</span>
                                                                            <span className="text-muted">{additionalDetails.einvoiceDeclaration.filename}</span>
                                                                        </span>
                                                                    ) : null
                                                                )}

                                                                <input
                                                                    className="form-control"
                                                                    type="file"
                                                                    accept=".pdf"
                                                                    name=""
                                                                    onChange={e => handleEinvoiceDeclarationFileChange(e.target.files[0])}
                                                                    disabled
                                                                />
                                                                {errors.einvoiceDeclaration && (
                                                                    <div className="ValidationColor">{errors.einvoiceDeclaration}</div>
                                                                )}

                                                            </div>
                                                        </div>
                                                    )}
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                )}

                                {isSectionVisible('reg. office') && (
                                    <div className="card mx-3 pb-4 mt-4">
                                        <div className="card-header3">
                                            <h3 className="card-title">Billing / Registered Office</h3>
                                        </div>
                                        <div className="card-body mt-0">
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>
                                                            Address <span>*</span>
                                                            <TooltipIcon message="Please enter your address using a maximum of 40 characters." />
                                                        </label>
                                                        <input className="form-control" type="text" value={registeredAddress.address1 || ''} disabled readOnly />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>
                                                            Address Line 2
                                                            <TooltipIcon message="Please enter your address line 2 using a maximum of 40 characters." />
                                                        </label>
                                                        <input className="form-control" type="text" value={registeredAddress.address2 || ''} disabled readOnly />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>
                                                            Address Line 3
                                                            <TooltipIcon message="Please enter your address line 3 using a maximum of 40 characters." />
                                                        </label>
                                                        <input className="form-control" type="text" value={registeredAddress.address3 || ''} disabled readOnly />
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">
                                                        <label>
                                                            Address Line 4
                                                            <TooltipIcon message=" Please enter your address line 4 using a maximum of 40 characters." />
                                                        </label>
                                                        <input className="form-control" type="text" value={registeredAddress.address4 || ''} disabled readOnly />
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">
                                                        <label>
                                                            Address Line 5
                                                            <TooltipIcon message=" Please enter your address line 5 using a maximum of 40 characters." />
                                                        </label>
                                                        <input className="form-control" type="text" value={registeredAddress.address5 || ''} disabled readOnly />
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">
                                                        <label>
                                                            Country<span>*</span>
                                                            <TooltipIcon message="Please choose your country from the list. This helps us identify the location of your organization." />
                                                        </label>
                                                        <SingleSelector options={countryOptions} value={registeredAddress.country} isDisabled={true} />
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">
                                                        <label>
                                                            State <span>*</span>
                                                            <TooltipIcon message="Please choose your state from the list. This helps us determine your organization's regional location." />
                                                        </label>
                                                        <SingleSelector options={stateOptions} value={registeredAddress.state} isDisabled={true} />
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">
                                                        <label>
                                                            City <span>*</span>
                                                            <TooltipIcon message="Please provide the name of the city where your business is based." />
                                                        </label>
                                                        <input className="form-control" type="text" value={registeredAddress.city || ''} disabled readOnly />
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">
                                                        <label>
                                                            Pin Code<span>*</span>
                                                            <TooltipIcon message="Enter the postal code (Pin Code) for your organization's location. This is required for address verification." />
                                                        </label>
                                                        <input className="form-control" type="text" value={registeredAddress.pincode || ''} disabled readOnly />
                                                    </div>
                                                </div>

                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">
                                                        <label>
                                                            Contact Number <span>*</span>
                                                            <TooltipIcon message="Please provide the full mobile number, including the country code. Ensure the number is correct and formatted properly.." />
                                                        </label>
                                                        <input className="form-control" type="text" value={registeredAddress.mobile || ''} disabled readOnly />
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">
                                                        <label>
                                                            Ordering Email ID <span>*</span>
                                                            <TooltipIcon message="Please provide the email address used by your organization for processing orders. Make sure the email ID is accurate and valid ." />
                                                        </label>
                                                        <input className="form-control" type="text" value={registeredAddress.orderingEmail || ''} disabled readOnly />
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">
                                                        <label>
                                                            Billing & Accounting Email ID
                                                            <TooltipIcon message="Enter the email address your organization uses for billing and accounting communications. Ensure it is a valid email format (e.g., example@domain.com)." />
                                                        </label>
                                                        <input className="form-control" type="text" value={registeredAddress.billingEmail || ''} disabled readOnly />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>



                                    </div>
                                )}

                                {isSectionVisible('communication address') && (
                                    <div className="card mx-3 pb-4 mt-4">
                                        <div className="card-header3">
                                            <h3 className="card-title">Communication Address</h3>
                                        </div>
                                        <div className="card-body mt-0">
                                            <div className="row ms-1">
                                                <div className="form-check mb-2">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="sameAsRegisteredAddress"
                                                        checked={sameAsRegistered}
                                                        disabled
                                                    />
                                                    <label className="form-check-label" htmlFor="sameAsRegisteredAddress">
                                                        Same as Registered Address
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>
                                                            Address <span>*</span>
                                                            <TooltipIcon message="Please enter your address using a maximum of 40 characters." />
                                                        </label>
                                                        <input className="form-control" type="text" value={communicationAddress.address1 || ''} disabled readOnly />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>
                                                            Address Line 2
                                                            <TooltipIcon message="Please enter your address line 2 using a maximum of 40 characters." />
                                                        </label>
                                                        <input className="form-control" type="text" value={communicationAddress.address2 || ''} disabled readOnly />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>
                                                            Address Line 3
                                                            <TooltipIcon message="Please enter your address line 3 using a maximum of 40 characters." />
                                                        </label>
                                                        <input className="form-control" type="text" value={communicationAddress.address3 || ''} disabled readOnly />
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">
                                                        <label>
                                                            Address Line 4
                                                            <TooltipIcon message=" Please enter your address line 4 using a maximum of 40 characters." />
                                                        </label>
                                                        <input className="form-control" type="text" value={communicationAddress.address4 || ''} disabled readOnly />
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">
                                                        <label>
                                                            Address Line 5
                                                            <TooltipIcon message=" Please enter your address line 5 using a maximum of 40 characters." />
                                                        </label>
                                                        <input className="form-control" type="text" value={communicationAddress.address5 || ''} disabled readOnly />
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">
                                                        <label>
                                                            Country<span>*</span>
                                                        </label>
                                                        <SingleSelector options={countryOptions} value={communicationAddress.country} isDisabled={true} />
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">
                                                        <label>
                                                            State <span>*</span>
                                                        </label>
                                                        <SingleSelector options={commStateOptions} value={communicationAddress.state} isDisabled={true} />
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">
                                                        <label>
                                                            City <span>*</span>
                                                        </label>
                                                        <input className="form-control" type="text" value={communicationAddress.city || ''} disabled readOnly />
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">
                                                        <label>
                                                            Pin Code<span>*</span>
                                                        </label>
                                                        <input className="form-control" type="text" value={communicationAddress.pincode || ''} disabled readOnly />
                                                    </div>
                                                </div>

                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">
                                                        <label>
                                                            Contact Number <span>*</span>
                                                        </label>
                                                        <input className="form-control" type="text" value={communicationAddress.mobile || ''} disabled readOnly />
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">
                                                        <label>
                                                            Email ID <span>*</span>
                                                        </label>
                                                        <input className="form-control" type="text" value={communicationAddress.orderingEmail || ''} disabled readOnly />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}


                                {/* <div className="card mx-4 pb-4 mt-4"> */}
                                {isSectionVisible('bank detail') && (
                                    <>
                                        {bankDetailsList?.map((bankDetail) => (
                                            <CollapsedCardKYC
                                                key={bankDetail.id}
                                                title="Bank Details"
                                            // No delete in preview
                                            >
                                                <div className="row">
                                                    {/* Bank Name */}
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label>
                                                                Bank Name <span>*</span>
                                                                <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                            </label>
                                                            <input className="form-control" type="text" value={bankDetail.bank_name || ''} disabled readOnly />
                                                        </div>
                                                    </div>
                                                    {/* Address */}
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label>
                                                                Address <span>*</span>
                                                                <TooltipIcon message="Please provide the complete address of your bank branch,including the street address,city and postal code." />
                                                            </label>
                                                            <input className="form-control" type="text" value={bankDetail.address || ''} disabled readOnly />
                                                        </div>
                                                    </div>
                                                    {/* Country */}
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label>
                                                                Country <span>*</span>
                                                                <TooltipIcon message="Please choose your country from the list" />
                                                            </label>
                                                            <SingleSelector
                                                                options={countries}
                                                                value={countries.find((c) => c.value === bankDetail.country_id) || null}
                                                                isDisabled={true}
                                                            />
                                                        </div>
                                                    </div>
                                                    {/* State */}
                                                    <div className="col-md-4">
                                                        <div className="form-group mt-2">
                                                            <label>
                                                                State <span>*</span>
                                                                <TooltipIcon message="Please choose your State from the list" />
                                                            </label>
                                                            <SingleSelector
                                                                options={states}
                                                                value={states.find((s) => s.value === bankDetail.state_id) || null}
                                                                isDisabled={true}
                                                            />
                                                        </div>
                                                    </div>
                                                    {/* City */}
                                                    <div className="col-md-4 mt-2">
                                                        <div className="form-group">
                                                            <label>
                                                                City <span>*</span>
                                                                <TooltipIcon message="Enter the city where your bank branch is located" />
                                                            </label>
                                                            <input className="form-control" type="text" value={bankDetail.city_name || ''} disabled readOnly />
                                                        </div>
                                                    </div>
                                                    {/* Pin Code */}
                                                    <div className="col-md-4 mt-2">
                                                        <div className="form-group">
                                                            <label>
                                                                Pin Code <span>*</span>
                                                                <TooltipIcon message="Enter the postal code (Pin Code) for the bank branch location" />
                                                            </label>
                                                            <input className="form-control" type="text" value={bankDetail.pincode || ''} disabled readOnly />
                                                        </div>
                                                    </div>
                                                    {/* Account Type */}
                                                    <div className="col-md-4 mt-2">
                                                        <div className="form-group">
                                                            <label>
                                                                Account Type <span>*</span>
                                                                <TooltipIcon message="Select the type of bank account your organization holds,such as Savings,Current,or any other relevant type" />
                                                            </label>
                                                            <SingleSelector
                                                                options={accountTypeOptions}
                                                                value={accountTypeOptions.find((option) => option.value === bankDetail.account_type) || null}
                                                                isDisabled={true}
                                                            />
                                                        </div>
                                                    </div>
                                                    {/* Account Number */}
                                                    <div className="col-md-4 mt-2">
                                                        <div className="form-group">
                                                            <label>
                                                                Account Number <span>*</span>
                                                                <TooltipIcon message="Please provide your organization's bank account number.Make sure it is correct and matches the details at your bank" />
                                                            </label>
                                                            <input className="form-control" type="text" value={bankDetail.account_number || ''} disabled readOnly />
                                                        </div>
                                                    </div>
                                                    {/* Confirm Account Number */}
                                                    <div className="col-md-4 mt-2">
                                                        <div className="form-group">
                                                            <label>
                                                                Confirm Account Number <span>*</span>
                                                                <TooltipIcon message="Re-enter the bank account number to confirm accuracy. Ensure it matches the original account number entered above." />
                                                            </label>
                                                            <input className="form-control" type="text" value={bankDetail.confirm_account_number || ''} disabled readOnly />
                                                        </div>
                                                    </div>
                                                    {/* Branch Name */}
                                                    <div className="col-md-4 mt-2">
                                                        <div className="form-group">
                                                            <label>
                                                                Branch Name <span>*</span>
                                                                <TooltipIcon message="Enter the name of the bank branch where your organization's account is held. " />
                                                            </label>
                                                            <input className="form-control" type="text" value={bankDetail.branch_name || ''} disabled readOnly />
                                                        </div>
                                                    </div>
                                                    {/* MICR No. */}
                                                    <div className="col-md-4 mt-2">
                                                        <div className="form-group">
                                                            <label>
                                                                MICR No. <span>*</span>
                                                                <TooltipIcon message="MICR: Enter the MICR (Magnetic Ink Character Recognition) number of your  bank branch. This number is typically found on your cheque leaf" />
                                                            </label>
                                                            <input className="form-control" type="text" value={bankDetail.micr_number || ''} disabled readOnly />
                                                        </div>
                                                    </div>
                                                    {/* IFSC Code */}
                                                    <div className="col-md-4 mt-2">
                                                        <div className="form-group">
                                                            <label>
                                                                IFSC Code <span>*</span>
                                                                <TooltipIcon message="Enter the IFSC (Indian Financial System Code) of your bank branch. This is required for electronic fund transfers like NEFT and RTGS" />
                                                            </label>
                                                            <input className="form-control" type="text" value={bankDetail.ifsc_code || ''} maxLength={11} disabled readOnly />
                                                        </div>
                                                    </div>
                                                    {/* Beneficiary Name */}
                                                    <div className="col-md-4 mt-2">
                                                        <div className="form-group">
                                                            <label>
                                                                Beneficiary Name <span>*</span>
                                                                <TooltipIcon message="Enter the full legel name of the beneficiary." />
                                                            </label>
                                                            <input className="form-control" type="text" value={bankDetail.benficary_name || ''} disabled readOnly />
                                                        </div>
                                                    </div>
                                                    {/* Virtual Account */}
                                                    <div className="col-md-4 mt-2">
                                                        <div className="form-group">
                                                            <label>
                                                                Virtual Account
                                                            </label>
                                                            <SingleSelector
                                                                options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]}
                                                                value={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }].find(opt => opt.value === virtualAccount) || null}
                                                                isDisabled={true}
                                                            />
                                                        </div>
                                                    </div>
                                                    {/* Select Company (if Virtual Account is Yes) */}
                                                    {virtualAccount === 'Yes' && (
                                                        <div className="col-md-4 mt-2">
                                                            <div className="form-group">
                                                                <label>
                                                                    Select Company <span>*</span>
                                                                </label>
                                                                <SingleSelector
                                                                    options={companyOptions}
                                                                    value={selectedCompany}
                                                                    isDisabled={true}
                                                                />
                                                            </div>
                                                        </div>
                                                    )}
                                                    {/* Generated Virtual Account Code */}
                                                    <div className="col-md-4 mt-2">
                                                        <div className="form-group">
                                                            <label>
                                                                Generated Virtual Account Code
                                                            </label>
                                                            <input className="form-control" type="text" value={bankDetail.generated_virtual_account_code || ''} disabled readOnly />
                                                        </div>
                                                    </div>


                                                    {/* Cancelled Cheque / Bank Copy */}
                                                    <div className="col-md-4 mt-2">
                                                        <div className="form-group">
                                                            <label

                                                            >
                                                                Cancelled Cheque / Bank Copy <span>*</span>
                                                                <TooltipIcon message="Provide a cancelled cheque or a bank statement copy that clearly displays your bank account details.This helps verify your account information. The document must be uploaded in PDF format" />
                                                            </label>

                                                            {/* Conditionally Render Existing File Download Link
                                                    Show download only when attachment has a server URL (attachment_url or file_url).
                                                    If the attachment is a user-selected file (has filename but no server URL) show filename as plain text. */}



                                                            {bankDetail?.attachment || bankAttachments[bankDetail.id] ? (
                                                                bankDetail?.attachment?.attachment_url || bankDetail?.attachment?.file_url ? (
                                                                    <span className="ms-2">
                                                                        <a
                                                                            href={`${baseURL}${bankDetail.attachment.attachment_url || bankDetail.attachment.file_url}`}
                                                                            download
                                                                            className="text-primary d-flex align-items-center"
                                                                        >
                                                                            <span className="me-2">Existing File:</span>
                                                                            <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                width={24}
                                                                                height={24}
                                                                                fill="#DE7008"
                                                                                className="bi bi-download"
                                                                                viewBox="0 0 16 16"
                                                                            >
                                                                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                                                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                                                            </svg>
                                                                            {bankDetail?.attachment.filename || bankDetail?.attachment.document_name}
                                                                        </a>
                                                                    </span>
                                                                ) :
                                                                    (bankAttachments && bankAttachments[bankDetail.id]) ? (
                                                                        <span className=" d-flex align-items-center">
                                                                            <span className="me-2">Selected File:</span>
                                                                            <span className="text-muted">{bankAttachments[bankDetail.id]?.filename}</span>
                                                                        </span>
                                                                    )

                                                                        : null
                                                            ) : null}

                                                            {/* File Input for Uploading New Attachments */}
                                                            <input
                                                                className="form-control mt-2"
                                                                type="file"
                                                                onChange={(e) =>
                                                                    handleFileChangeBank(
                                                                        e.target.files[0],
                                                                        bankDetail.id
                                                                    )
                                                                }
                                                                ref={fileInputRef}
                                                                multiple
                                                                accept=".pdf"
                                                                // disabled={!bankDetail.isNew}
                                                                disabled
                                                            />

                                                        </div>
                                                    </div>
                                                    {/* Remark */}
                                                    <div className="col-md-4 mt-2">
                                                        <div className="form-group">
                                                            <label>
                                                                Remark
                                                            </label>
                                                            <textarea className="form-control" rows="3" value={bankDetail.remark || ''} disabled readOnly />
                                                        </div>
                                                    </div>
                                                </div>
                                            </CollapsedCardKYC>
                                        ))}

                                    </>
                                )}
                                {/* </div> */}


                                {isSectionVisible('major customers served by you') && (
                                    <>
                                        {majorCustomers.filter(mc => mc._destroy !== true && mc._destroy !== "true").map((customer, idx) => (
                                            <CollapsedCardKYC
                                                key={customer.id}
                                                title={`Client References${majorCustomers.length > 1 ? ` ${idx + 1}` : ''}`}
                                            >

                                                <div className="card-body mt-0">
                                                    <div className="row">
                                                        <div className="col-md-4">
                                                            <div className="form-group">
                                                                <label className="mb-2">Site Type <span>*</span></label>
                                                                <div className="d-flex">
                                                                    <label className="me-3 d-flex align-items-center">
                                                                        <input
                                                                            type="radio"
                                                                            name={`siteType_${customer.id}`}
                                                                            value="working"
                                                                            checked={customer.siteType === 'working'}
                                                                            onChange={() => handleMajorCustomerChange(idx, 'siteType', 'working')}
                                                                            style={{ width: '22px', height: '22px', accentColor: '#de7008' }}
                                                                            disabled
                                                                        />{' '}
                                                                        <span className="ms-2">Working Site</span>
                                                                    </label>
                                                                    <label className="d-flex align-items-center">
                                                                        <input
                                                                            type="radio"
                                                                            name={`siteType_${customer.id}`}
                                                                            value="previous"
                                                                            checked={customer.siteType === 'previous'}
                                                                            onChange={() => handleMajorCustomerChange(idx, 'siteType', 'previous')}
                                                                            style={{ width: '22px', height: '22px', accentColor: '#de7008' }}
                                                                            disabled
                                                                        />{' '}
                                                                        <span className="ms-2">Previous Site</span>
                                                                    </label>
                                                                </div>
                                                                {majorCustomerErrors[idx]?.siteType && (
                                                                    <div className="ValidationColor">{majorCustomerErrors[idx].siteType}</div>
                                                                )}
                                                            </div>
                                                        </div>


                                                        <div className="col-md-2 mt-2">
                                                            <div className="form-group">
                                                                <label>Service Provided From <span>*</span></label>
                                                                <input
                                                                    className="form-control"
                                                                    type="date"
                                                                    max={new Date().toISOString().split('T')[0]}
                                                                    value={customer.serviceFrom}
                                                                    onChange={e => handleMajorCustomerDateChange(idx, 'serviceFrom', e.target.value)}
                                                                    disabled
                                                                />
                                                                {majorCustomerErrors[idx]?.serviceFrom && (
                                                                    <div className="ValidationColor">{majorCustomerErrors[idx].serviceFrom}</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        {customer.siteType === 'previous' && (
                                                            <div className="col-md-2 mt-2">
                                                                <div className="form-group">
                                                                    <label>Service Provided To <span>*</span></label>
                                                                    <input
                                                                        className="form-control"
                                                                        type="date"
                                                                        max={new Date().toISOString().split('T')[0]}
                                                                        value={customer.serviceTo}
                                                                        onChange={e => handleMajorCustomerDateChange(idx, 'serviceTo', e.target.value)}
                                                                        disabled
                                                                    />
                                                                    {majorCustomerErrors[idx]?.serviceTo && (
                                                                        <div className="ValidationColor">{majorCustomerErrors[idx].serviceTo}</div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="row mt-2">
                                                        <div className="col-md-4">
                                                            <div className="form-group">
                                                                <label>Client Name <span>*</span></label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    value={customer.companyName}
                                                                    onChange={e => handleMajorCustomerChange(idx, 'companyName', e.target.value)}
                                                                    disabled
                                                                />
                                                                {majorCustomerErrors[idx]?.companyName && (
                                                                    <div className="ValidationColor">{majorCustomerErrors[idx].companyName}</div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="col-md-4">
                                                            <div className="form-group">
                                                                <label>Contact Person <span>*</span></label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    value={customer.contactPerson}
                                                                    onChange={e => handleMajorCustomerChange(idx, 'contactPerson', e.target.value)}
                                                                    disabled
                                                                />
                                                                {majorCustomerErrors[idx]?.contactPerson && (
                                                                    <div className="ValidationColor">{majorCustomerErrors[idx].contactPerson}</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        {/* <div className="col-md-4  ">
                                                <div className="form-group">
                                                    <label>Designation <span>*</span></label>
                                                    <SingleSelector
                                                        options={[]}
                                                        value={customer.designation}
                                                        onChange={selected => handleMajorCustomerChange(idx, 'designation', selected)}
                                                    />
                                                    {majorCustomerErrors[idx]?.designation && (
                                                        <div className="ValidationColor">{majorCustomerErrors[idx].designation}</div>
                                                    )}
                                                </div>
                                            </div> */}
                                                        <div className="col-md-4  ">
                                                            <div className="form-group">
                                                                <label>Country <span>*</span></label>
                                                                <SingleSelector
                                                                    options={countryOptions || []}
                                                                    value={customer.country}
                                                                    onChange={selected => handleMajorCustomerChange(idx, 'country', selected)}
                                                                    isDisabled={true}
                                                                />
                                                                {majorCustomerErrors[idx]?.country && (
                                                                    <div className="ValidationColor">{majorCustomerErrors[idx].country}</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        {/* <div className="col-md-4">
                                                <div className="form-group">
                                                    <label>Phone No.</label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={customer.phone}
                                                        onChange={e => handleMajorCustomerChange(idx, 'phone', e.target.value)}
                                                    />
                                                </div>
                                            </div> */}
                                                        <div className="col-md-4 mt-2">
                                                            <div className="form-group">
                                                                <label>Contact No. <span>*</span></label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    value={customer.mobile}
                                                                    maxLength={10}
                                                                    disabled
                                                                    onChange={e => {
                                                                        let newValue = e.target.value.replace(/[^0-9]/g, ''); // Only digits
                                                                        if (newValue.length > 10) {
                                                                            newValue = newValue.slice(0, 10);
                                                                        }
                                                                        handleMajorCustomerChange(idx, 'mobile', newValue);
                                                                        // Mobile number live validation
                                                                        let errorMsg = '';
                                                                        if (newValue && newValue.length !== 10) {
                                                                            errorMsg = 'Contact Number must be exactly 10 digits.';
                                                                        }
                                                                        setMajorCustomerErrors(prev => {
                                                                            const updated = [...prev];
                                                                            updated[idx] = {
                                                                                ...updated[idx],
                                                                                mobile: errorMsg
                                                                            };
                                                                            return updated;
                                                                        });
                                                                    }}
                                                                />
                                                                {majorCustomerErrors[idx]?.mobile && (
                                                                    <div className="ValidationColor">{majorCustomerErrors[idx].mobile}</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        {/* <div className="col-md-4">
                                                <div className="form-group">
                                                    <label>Year of Association <span>*</span></label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={customer.yearOfAssociation}
                                                        onChange={e => handleMajorCustomerChange(idx, 'yearOfAssociation', e.target.value)}
                                                    />
                                                    {majorCustomerErrors[idx]?.yearOfAssociation && (
                                                        <div className="ValidationColor">{majorCustomerErrors[idx].yearOfAssociation}</div>
                                                    )}
                                                </div>
                                            </div> */}
                                                        <div className="col-md-4 mt-2">
                                                            <div className="form-group">
                                                                <label>WO/PO Amount in Last 12 month in lacs <span>*</span></label>
                                                                <input
                                                                    className="form-control"
                                                                    disabled
                                                                    type="number"
                                                                    min={0}
                                                                    value={customer.businessLast12Months}
                                                                    onChange={e => {
                                                                        let newValue = e.target.value;
                                                                        // Prevent negative numbers and '-' sign
                                                                        if (newValue.includes('-')) {
                                                                            newValue = newValue.replace(/-/g, '');
                                                                        }
                                                                        if (Number(newValue) < 0) {
                                                                            newValue = '';
                                                                        }
                                                                        handleMajorCustomerChange(idx, 'businessLast12Months', newValue);
                                                                    }}
                                                                    onKeyDown={e => {
                                                                        if (e.key === '-' || e.key === 'Subtract') {
                                                                            e.preventDefault();
                                                                        }
                                                                    }}
                                                                />
                                                                {majorCustomerErrors[idx]?.businessLast12Months && (
                                                                    <div className="ValidationColor">{majorCustomerErrors[idx].businessLast12Months}</div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="col-md-4 mt-2">
                                                            <div className="form-group">
                                                                <label>Stage Of Project</label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    value={customer.stageOfProject}
                                                                    onChange={e => handleMajorCustomerChange(idx, 'stageOfProject', e.target.value)}
                                                                    disabled
                                                                />
                                                            </div>
                                                        </div>
                                                        {/* <div className="col-md-4">
                                                <div className="form-group">
                                                    <label>Major Competitors</label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={customer.majorCompetitors}
                                                        onChange={e => handleMajorCustomerChange(idx, 'majorCompetitors', e.target.value)}
                                                    />
                                                </div>
                                            </div> */}
                                                        {/* <div className="col-md-4">
                                                <div className="form-group">
                                                    <label>Attachment</label>
                                                    <input
                                                        className="form-control"
                                                        type="file"
                                                        onChange={e => handleMajorCustomerChange(idx, 'attachment', e.target.files[0])}
                                                    />
                                                </div>
                                            </div> */}


                                                        <div className="col-md-4 mt-2">
                                                            <div className="form-group">
                                                                <label> Product On Service Provided <span>*</span></label>
                                                                <textarea
                                                                    className="form-control"
                                                                    type="text"
                                                                    value={customer.workDone}
                                                                    onChange={e => handleMajorCustomerChange(idx, 'workDone', e.target.value)}
                                                                    disabled
                                                                />
                                                                {majorCustomerErrors[idx]?.workDone && (
                                                                    <div className="ValidationColor">{majorCustomerErrors[idx].workDone}</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </CollapsedCardKYC>
                                        ))}
                                    </>
                                )}


                                {isSectionVisible('branch office') && (
                                    <>
                                        {branchOffices.filter(mc => mc._destroy !== true && mc._destroy !== "true").map((branch, idx) => (
                                            <CollapsedCardKYC
                                                showDelete={false}
                                                key={branch.id}
                                                title={`Branch Office${branchOffices.length > 1 ? ` (${idx + 1})` : ''}`}
                                            >

                                                <div className="card-body mt-0">
                                                    <div className="row">
                                                        <div className="col-md-4">
                                                            <div className="form-group">
                                                                <label>Address <span>*</span></label>
                                                                <input className="form-control" type="text" value={branch.address} onChange={e => handleBranchChange(idx, 'address', e.target.value)} disabled />
                                                                {branchErrors[idx]?.address && (
                                                                    <div className="ValidationColor">{branchErrors[idx].address}</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4 ">
                                                            <div className="form-group">
                                                                <label>Country<span>*</span></label>
                                                                <SingleSelector
                                                                    options={countries}
                                                                    value={branch.country || null}
                                                                    onChange={selected => handleBranchChange(idx, 'country', selected)}
                                                                    placeholder="Select Country"
                                                                    isDisabled={true}
                                                                />
                                                                {branchErrors[idx]?.country && (
                                                                    <div className="ValidationColor">{branchErrors[idx].country}</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4 ">
                                                            <div className="form-group">
                                                                <label>State <span>*</span></label>
                                                                <SingleSelector
                                                                    options={states}
                                                                    value={branch.state || null}
                                                                    onChange={selected => handleBranchChange(idx, 'state', selected)}
                                                                    placeholder="Select State"
                                                                    isDisabled={true}
                                                                />
                                                                {branchErrors[idx]?.state && (
                                                                    <div className="ValidationColor">{branchErrors[idx].state}</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4 mt-2">
                                                            <div className="form-group">
                                                                <label>City <span>*</span></label>
                                                                <input className="form-control" type="text" disabled value={branch.city} onChange={e => handleBranchChange(idx, 'city', e.target.value)} />
                                                                {branchErrors[idx]?.city && (
                                                                    <div className="ValidationColor">{branchErrors[idx].city}</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4 mt-2">
                                                            <div className="form-group">
                                                                <label>Pin Code<span>*</span></label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    value={branch.pincode}
                                                                    maxLength={6}
                                                                    disabled
                                                                    onChange={e => {
                                                                        let newValue = e.target.value;
                                                                        // Restrict to max 6 digits
                                                                        if (newValue.length > 6) {
                                                                            newValue = newValue.slice(0, 6);
                                                                        }
                                                                        handleBranchChange(idx, 'pincode', newValue);
                                                                        // Pin code live validation
                                                                        const pinCodeRegex = /^[1-9][0-9]{5}$/;
                                                                        let errorMsg = '';
                                                                        if (newValue && !pinCodeRegex.test(newValue)) {
                                                                            errorMsg = 'Pin Code must be a 6-digit number.';
                                                                        }
                                                                        // Update branchErrors for this branch
                                                                        setBranchErrors(prev => {
                                                                            const updated = [...prev];
                                                                            updated[idx] = {
                                                                                ...updated[idx],
                                                                                pincode: errorMsg
                                                                            };
                                                                            return updated;
                                                                        });
                                                                    }}
                                                                />
                                                                {branchErrors[idx]?.pincode && (
                                                                    <div className="ValidationColor">{branchErrors[idx].pincode}</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        {/* <div className="col-md-4 mt-2">
                                                <div className="form-group">
                                                    <label>Telephone Phone No.</label>
                                                    <input className="form-control" type="text" value={branch.telephone} onChange={e => handleBranchChange(idx, 'telephone', e.target.value)} />
                                                </div>
                                            </div> */}
                                                        <div className="col-md-4 mt-2">
                                                            <div className="form-group">
                                                                <label>Contact Number</label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    value={branch.mobile}
                                                                    disabled
                                                                    maxLength={10}
                                                                    onChange={e => {
                                                                        let newValue = e.target.value.replace(/[^0-9]/g, ''); // Only digits
                                                                        if (newValue.length > 10) {
                                                                            newValue = newValue.slice(0, 10);
                                                                        }
                                                                        handleBranchChange(idx, 'mobile', newValue);
                                                                        // Mobile number live validation
                                                                        let errorMsg = '';
                                                                        if (newValue && newValue.length !== 10) {
                                                                            errorMsg = 'Contact Number must be exactly 10 digits.';
                                                                        }
                                                                        setBranchErrors(prev => {
                                                                            const updated = [...prev];
                                                                            updated[idx] = {
                                                                                ...updated[idx],
                                                                                mobile: errorMsg
                                                                            };
                                                                            return updated;
                                                                        });
                                                                    }}
                                                                />
                                                                {branchErrors[idx]?.mobile && (
                                                                    <div className="ValidationColor">{branchErrors[idx].mobile}</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>


                                            </CollapsedCardKYC>
                                        ))}
                                    </>)}

                                {isSectionVisible('factory / warehouse details') && (
                                    <>
                                        {warehouses.filter(mc => mc._destroy !== true && mc._destroy !== "true").map((warehouse, idx) => (
                                            <CollapsedCardKYC
                                                key={warehouse.id}
                                                title={`Factory Warehouse${warehouses.length > 1 ? ` ${idx + 1}` : ''}`}
                                            >

                                                <div className="card-body mt-0">
                                                    <div className="row">
                                                        <div className="col-md-4">
                                                            <div className="form-group">
                                                                <label>Address <span>*</span></label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    value={warehouse.address}
                                                                    onChange={e => handleWarehouseChange(idx, 'address', e.target.value)}
                                                                    disabled
                                                                />
                                                                {warehouseErrors[idx]?.address && (
                                                                    <div className="ValidationColor">{warehouseErrors[idx].address}</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4  ">
                                                            <div className="form-group">
                                                                <label>Country<span>*</span></label>
                                                                <SingleSelector
                                                                    options={countries || []}
                                                                    value={warehouse.country}
                                                                    onChange={selected => handleWarehouseChange(idx, 'country', selected)}
                                                                    isDisabled={true}
                                                                />
                                                                {warehouseErrors[idx]?.country && (
                                                                    <div className="ValidationColor">{warehouseErrors[idx].country}</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4  ">
                                                            <div className="form-group">
                                                                <label>State <span>*</span></label>
                                                                <SingleSelector
                                                                    options={states || []}
                                                                    value={warehouse.state}
                                                                    onChange={selected => handleWarehouseChange(idx, 'state', selected)}
                                                                    isDisabled={true}
                                                                />
                                                                {warehouseErrors[idx]?.state && (
                                                                    <div className="ValidationColor">{warehouseErrors[idx].state}</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4  mt-2">
                                                            <div className="form-group">
                                                                <label>City <span>*</span></label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    value={warehouse.city}
                                                                    onChange={e => handleWarehouseChange(idx, 'city', e.target.value)}
                                                                    disabled
                                                                />
                                                                {warehouseErrors[idx]?.city && (
                                                                    <div className="ValidationColor">{warehouseErrors[idx].city}</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        {/* <div className="col-md-4  mt-2">
                                                <div className="form-group">
                                                    <label>Telephone Phone No.</label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={warehouse.telephone}
                                                        onChange={e => handleWarehouseChange(idx, 'telephone', e.target.value)}
                                                    />
                                                </div>
                                            </div> */}
                                                        <div className="col-md-4  mt-2">
                                                            <div className="form-group">
                                                                <label>Contact Number <span>*</span></label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    value={warehouse.mobile}
                                                                    onChange={e => {
                                                                        // Allow only digits and limit to 10 characters
                                                                        const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
                                                                        handleWarehouseChange(idx, 'mobile', digits);
                                                                    }}
                                                                    maxLength={10}
                                                                    disabled
                                                                />
                                                                {warehouseErrors[idx]?.mobile && (
                                                                    <div className="ValidationColor">{warehouseErrors[idx].mobile}</div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="col-md-4 mt-2">
                                                            <div className="form-group">
                                                                <label>Contact Person <span>*</span></label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    value={warehouse.contactPerson || ''}
                                                                    onChange={e => handleWarehouseChange(idx, 'contactPerson', e.target.value)}
                                                                    disabled
                                                                />
                                                                {warehouseErrors[idx]?.contactPerson && (
                                                                    <div className="ValidationColor">{warehouseErrors[idx].contactPerson}</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4 mt-2">
                                                            <div className="form-group">
                                                                <label>Contact Person Email <span>*</span></label>
                                                                <input
                                                                    className="form-control"
                                                                    type="email"
                                                                    placeholder="eg.: abc@gmail.com"
                                                                    value={warehouse.contactPersonEmail || ''}
                                                                    disabled
                                                                    onChange={e => {
                                                                        const val = e.target.value;
                                                                        // update warehouse state
                                                                        handleWarehouseChange(idx, 'contactPersonEmail', val);
                                                                        // live-validate email format and set inline error
                                                                        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
                                                                        let errMsg = '';
                                                                        if (val && !emailRegex.test(val)) {
                                                                            errMsg = 'Invalid Email. eg.: abc@gmail.com';
                                                                        }
                                                                        setWarehouseErrors(prev => {
                                                                            const copy = Array.isArray(prev) ? [...prev] : [];
                                                                            // ensure index exists
                                                                            while (copy.length <= idx) copy.push({});
                                                                            copy[idx] = { ...copy[idx], contactPersonEmail: errMsg || undefined };
                                                                            return copy;
                                                                        });
                                                                    }}
                                                                />
                                                                {warehouseErrors[idx]?.contactPersonEmail && (
                                                                    <div className="ValidationColor">{warehouseErrors[idx].contactPersonEmail}</div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="col-md-4  mt-2">
                                                            <div className="form-group">
                                                                <label>Attachment</label>


                                                                {warehouse?.attachment ? (
                                                                    warehouse?.attachment?.attachment_url || warehouse?.attachment?.file_url ? (
                                                                        <span className="ms-2">
                                                                            <a
                                                                                href={`${baseURL}${warehouse.attachment.attachment_url || warehouse.attachment.file_url}`}
                                                                                download
                                                                                className="text-primary d-flex align-items-center"
                                                                            >
                                                                                <span className="me-2">Existing File:</span>
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width={24}
                                                                                    height={24}
                                                                                    fill="#DE7008"
                                                                                    className="bi bi-download"
                                                                                    viewBox="0 0 16 16"
                                                                                >
                                                                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                                                                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                                                                </svg>
                                                                                {warehouse?.attachment.filename || warehouse?.attachment.document_name}
                                                                            </a>
                                                                        </span>
                                                                    ) :
                                                                        (warehouse.attachment.filename) ? (
                                                                            <span className=" d-flex align-items-center">
                                                                                <span className="me-2">Selected File:</span>
                                                                                <span className="text-muted">{warehouse.attachment.filename}</span>
                                                                            </span>


                                                                        )

                                                                            : null
                                                                ) : null}
                                                                <input
                                                                    className="form-control"
                                                                    disabled
                                                                    type="file"
                                                                    onChange={e => handleWarehouseChange(idx, 'attachment', e.target.files[0])}
                                                                />
                                                                {/* Show existing or selected file name/link */}

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CollapsedCardKYC>
                                        ))}
                                    </>)}


                                {isSectionVisible('contact person') && (
                                    <>

                                        {contactPersons.filter(mc => mc._destroy !== true && mc._destroy !== "true").map((person, idx) => (
                                            <CollapsedCardKYC
                                                key={person.id}
                                                title={`Contact Person${contactPersons.length > 1 ? ` ${idx + 1}` : ""}`}
                                            >

                                                <div className="card-body mt-0">
                                                    <div className="row">
                                                        {/* Escalation Level */}
                                                        <div className="col-md-4  ">
                                                            <div className="form-group">
                                                                <label>
                                                                    Escalation Level<span>*</span>
                                                                    <TooltipIcon message="Select the escalation level for the contact person. This indicates the priority or seniority in the escalation process for any issues or concerns." />
                                                                </label>
                                                                <SingleSelector
                                                                    options={escalationLevelOptions}
                                                                    value={person.escalationLevel}
                                                                    onChange={(selected) =>
                                                                        handleContactPersonChange(idx, "escalationLevel", selected)
                                                                    }
                                                                    isDisabled={true}
                                                                />
                                                                {contactPersonErrors[idx]?.escalationLevel && (
                                                                    <div className="ValidationColor">{contactPersonErrors[idx].escalationLevel}</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        {/* Name Title */}
                                                        <div className="col-md-4 ">
                                                            <div className="form-group">
                                                                <label>
                                                                    Name Title <span>*</span>
                                                                    <TooltipIcon message="Select the appropriate title for the employee (e.g. Mr., Mrs., Dr. Ms.). This helps in addressing the employee correctly in formal communications." />
                                                                </label>
                                                                <SingleSelector
                                                                    options={nameTitleOptions}
                                                                    value={person.nameTitle}
                                                                    onChange={(selected) =>
                                                                        handleContactPersonChange(idx, "nameTitle", selected)
                                                                    }
                                                                    isDisabled={true}
                                                                />
                                                                {contactPersonErrors[idx]?.nameTitle && (
                                                                    <div className="ValidationColor">{contactPersonErrors[idx].nameTitle}</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        {/* First Name */}
                                                        <div className="col-md-4">
                                                            <div className="form-group">
                                                                <label>
                                                                    First Name <span>*</span>
                                                                    <TooltipIcon message="Please provide the first name Of the designated contact person for your organization. This is required for direct correspondence." />
                                                                </label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    value={person.firstName}
                                                                    onChange={(e) =>
                                                                        handleContactPersonChange(idx, "firstName", e.target.value)
                                                                    }
                                                                    disabled
                                                                />
                                                                {contactPersonErrors[idx]?.firstName && (
                                                                    <div className="ValidationColor">{contactPersonErrors[idx].firstName}</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        {/* Last Name */}
                                                        <div className="col-md-4 mt-2">
                                                            <div className="form-group">
                                                                <label>
                                                                    Last Name<span>*</span>
                                                                    <TooltipIcon message="Please provide the last name of the designated contact person for your organization. This is required for direct correspondence." />
                                                                </label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    value={person.lastName}
                                                                    onChange={(e) =>
                                                                        handleContactPersonChange(idx, "lastName", e.target.value)
                                                                    }
                                                                    disabled
                                                                />
                                                                {contactPersonErrors[idx]?.lastName && (
                                                                    <div className="ValidationColor">{contactPersonErrors[idx].lastName}</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        {/* Designation */}
                                                        <div className="col-md-4  mt-2">
                                                            <div className="form-group">
                                                                <label>
                                                                    Designation<span>*</span>
                                                                    <TooltipIcon message="Enter the official designation or job title of the contact person within the organization." />
                                                                </label>
                                                                <SingleSelector
                                                                    options={designationOptions}
                                                                    value={person.designation}
                                                                    onChange={(selected) =>
                                                                        handleContactPersonChange(idx, "designation", selected)
                                                                    }
                                                                    isDisabled={true}
                                                                />
                                                                {contactPersonErrors[idx]?.designation && (
                                                                    <div className="ValidationColor">{contactPersonErrors[idx].designation}</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        {/* Primary Email */}
                                                        <div className="col-md-4  mt-2">
                                                            <div className="form-group">
                                                                <label>
                                                                    Primary Email ID <span>*</span>
                                                                    <TooltipIcon message=" Enter the primary email address of the contact person. This will be used for communication and correspondence." />
                                                                </label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    placeholder="eg.: abc@gmail.com"
                                                                    value={person.primaryEmail}
                                                                    disabled
                                                                    onChange={(e) => {
                                                                        const val = e.target.value;
                                                                        handleContactPersonChange(idx, "primaryEmail", val);
                                                                        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
                                                                        let err = '';
                                                                        if (!val) {
                                                                            err = 'Primary Email is required.';
                                                                        } else if (!emailRegex.test(val)) {
                                                                            err = 'Invalid Email. eg.: abc@gmail.com';
                                                                        }
                                                                        setContactPersonErrors(prev => {
                                                                            const copy = Array.isArray(prev) ? [...prev] : [];
                                                                            while (copy.length <= idx) copy.push({});
                                                                            copy[idx] = { ...copy[idx], primaryEmail: err || undefined };
                                                                            return copy;
                                                                        });
                                                                    }}
                                                                />
                                                                {contactPersonErrors[idx]?.primaryEmail && (
                                                                    <div className="ValidationColor">{contactPersonErrors[idx].primaryEmail}</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        {/* Secondary Email */}
                                                        <div className="col-md-4  mt-2">
                                                            <div className="form-group">
                                                                <label>Secondary Email ID</label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    disabled
                                                                    placeholder="eg.: abc@gmail.com"
                                                                    value={person.secondaryEmail}
                                                                    onChange={(e) => {
                                                                        const val = e.target.value;
                                                                        handleContactPersonChange(idx, "secondaryEmail", val);
                                                                        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
                                                                        let err = '';
                                                                        if (val && !emailRegex.test(val)) {
                                                                            err = 'Invalid Email. eg.: abc@gmail.com';
                                                                        }
                                                                        setContactPersonErrors(prev => {
                                                                            const copy = Array.isArray(prev) ? [...prev] : [];
                                                                            while (copy.length <= idx) copy.push({});
                                                                            copy[idx] = { ...copy[idx], secondaryEmail: err || undefined };
                                                                            return copy;
                                                                        });
                                                                    }}
                                                                />
                                                                {contactPersonErrors[idx]?.secondaryEmail && (
                                                                    <div className="ValidationColor">{contactPersonErrors[idx].secondaryEmail}</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        {/* Primary Mobile */}
                                                        <div className="col-md-4  mt-2">
                                                            <div className="form-group">
                                                                <label>
                                                                    Primary Contact No. <span>*</span>
                                                                    <TooltipIcon message="Enter the contact person's primary mobile number. This will be used for urgent communication and notifications." />
                                                                </label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    value={person.primaryMobile}
                                                                    onChange={(e) =>
                                                                        handleContactPersonChange(idx, "primaryMobile", e.target.value)
                                                                    }
                                                                    disabled
                                                                />
                                                                {contactPersonErrors[idx]?.primaryMobile && (
                                                                    <div className="ValidationColor">{contactPersonErrors[idx].primaryMobile}</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        {/* Secondary Mobile */}
                                                        <div className="col-md-4  mt-2">
                                                            <div className="form-group">
                                                                <label>Secondary Contact No.</label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    value={person.secondaryMobile}
                                                                    onChange={(e) =>
                                                                        handleContactPersonChange(idx, "secondaryMobile", e.target.value)
                                                                    }
                                                                    disabled
                                                                />
                                                                {contactPersonErrors[idx]?.secondaryMobile && (
                                                                    <div className="ValidationColor">{contactPersonErrors[idx].secondaryMobile}</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        {/* Nationality */}
                                                        <div className="col-md-4  mt-2">
                                                            <div className="form-group">
                                                                <label>Nationality</label>
                                                                <SingleSelector
                                                                    options={[
                                                                        { label: 'Indian', value: 'Indian' },
                                                                        { label: 'Chinese', value: 'Chinese' },
                                                                        { label: 'American', value: 'American' }
                                                                    ]}
                                                                    value={person.nationality}
                                                                    onChange={(selected) =>
                                                                        handleContactPersonChange(idx, "nationality", selected)
                                                                    }
                                                                    isDisabled={true}
                                                                />
                                                            </div>
                                                        </div>

                                                        {/* Date of Birth */}
                                                        <div className="col-md-4  mt-2">
                                                            <div className="form-group">
                                                                <label>Date of Birth</label>
                                                                <input
                                                                    className="form-control"
                                                                    type="date"
                                                                    value={person.dob}
                                                                    disabled
                                                                    onChange={(e) =>
                                                                        handleContactPersonChange(idx, "dob", e.target.value)
                                                                    }
                                                                />
                                                                {contactPersonErrors[idx]?.dob && (
                                                                    <div className="ValidationColor">{contactPersonErrors[idx].dob}</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        {/* Attachment */}
                                                        <div className="col-md-4  mt-2">
                                                            <div className="form-group">
                                                                <label>Attachment</label>



                                                                {person?.attachment ? (
                                                                    person?.attachment?.attachment_url || person?.attachment?.file_url ? (
                                                                        <span className="ms-2">
                                                                            <a
                                                                                href={`${baseURL}${person.attachment.attachment_url || person.attachment.file_url}`}
                                                                                download
                                                                                className="text-primary d-flex align-items-center"
                                                                            >
                                                                                <span className="me-2">Existing File:</span>
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width={24}
                                                                                    height={24}
                                                                                    fill="#DE7008"
                                                                                    className="bi bi-download"
                                                                                    viewBox="0 0 16 16"
                                                                                >
                                                                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                                                                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                                                                </svg>
                                                                                {person?.attachment.filename || person?.attachment.document_name}
                                                                            </a>
                                                                        </span>
                                                                    ) : person.attachment.filename ? (
                                                                        <span className="d-flex align-items-center">
                                                                            <span className="me-2">Selected File:</span>
                                                                            <span className="text-muted">{person.attachment.filename}</span>
                                                                        </span>
                                                                    ) : null
                                                                ) : null}


                                                                <input
                                                                    className="form-control"
                                                                    disabled
                                                                    type="file"
                                                                    onChange={(e) =>
                                                                        handleContactPersonChange(idx, "attachment", e.target.files[0])
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CollapsedCardKYC>
                                        ))}

                                    </>)}




                                {isSectionVisible('owners / directors information') && (
                                    <>
                                        {owners.filter(mc => mc._destroy !== true && mc._destroy !== "true").map((owner, idx) => (
                                            <CollapsedCardKYC
                                                key={owner.id}
                                                title={`Owner / Director${owners.length > 1 ? ` ${idx + 1}` : ''}`}
                                            >
                                                <div className="card-body mt-0">
                                                    <div className="row">
                                                        <div className="col-md-4">
                                                            <div className="form-group">
                                                                <label>First Name <span>*</span></label>
                                                                <input className="form-control" type="text" value={owner.firstName || ''} disabled readOnly />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group">
                                                                <label>Last Name <span>*</span></label>
                                                                <input className="form-control" type="text" value={owner.lastName || ''} disabled readOnly />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4  ">
                                                            <div className="form-group">
                                                                <label>Designation <span>*</span></label>
                                                                <SingleSelector options={[]} value={owner.designation} isDisabled={true} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4  ">
                                                            <div className="form-group">
                                                                <label>Qualification</label>
                                                                <SingleSelector options={[]} value={owner.qualification} isDisabled={true} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group">
                                                                <label>Experience</label>
                                                                <input className="form-control" type="text" value={owner.experience || ''} disabled readOnly />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group">
                                                                <label>Email <span>*</span></label>
                                                                <input className="form-control" type="text" value={owner.email || ''} disabled readOnly />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4 mt-2">
                                                            <div className="form-group">
                                                                <label>Contact Number <span>*</span></label>
                                                                <input className="form-control" type="text" value={owner.mobile || ''} disabled readOnly />
                                                            </div>
                                                        </div>


                                                        <div className="col-md-4 mt-2">
                                                            <div className="form-group">
                                                                <label>Attachment</label>


                                                                {owner?.attachment ? (
                                                                    owner?.attachment?.attachment_url || owner?.attachment?.file_url ? (
                                                                        <span className="ms-2">
                                                                            <a
                                                                                href={`${baseURL}${owner.attachment.attachment_url || owner.attachment.file_url}`}
                                                                                download
                                                                                className="text-primary d-flex align-items-center"
                                                                            >
                                                                                <span className="me-2">Existing File:</span>
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width={24}
                                                                                    height={24}
                                                                                    fill="#DE7008"
                                                                                    className="bi bi-download"
                                                                                    viewBox="0 0 16 16"
                                                                                >
                                                                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                                                                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                                                                </svg>
                                                                                {owner?.attachment.filename || owner?.attachment.document_name}
                                                                            </a>
                                                                        </span>
                                                                    ) : owner.attachment.filename ? (
                                                                        <span className="d-flex align-items-center">
                                                                            <span className="me-2">Selected File:</span>
                                                                            <span className="text-muted">{owner.attachment.filename}</span>
                                                                        </span>
                                                                    ) : null
                                                                ) : null}

                                                                <input
                                                                    className="form-control"
                                                                    disabled
                                                                    type="file"
                                                                    onChange={e => handleOwnerChange(idx, 'attachment', e.target.files[0])}
                                                                />

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </CollapsedCardKYC>
                                        ))}
                                    </>)}






                                {/* Preview: Product & Services (readonly) */}

                                {/* <div className="row mb-3 mx-2 mt-4">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Product & Services </label>
                                            <MultiSelector options={[]}
                                                // value={selectedProductServices || []} 
                                                isDisabled={true} placeholder="Select Product & Services" />
                                        </div>
                                    </div>
                                </div> */}


                                {/* Preview: Turnover Table (readonly) */}

                                {isSectionVisible('annual turnover') && (
                                    <>
                                        <div className="mx-3 mt-4">
                                            <div className="col-md-12">
                                                <h5 className="mb-3">Annual Turnover
                                                    <TooltipIcon message="Enter the value of Turnover in Lacs." />
                                                </h5>
                                            </div>
                                            <div className="tbl-container mt-3 ">
                                                <table className=" w-100">
                                                    <thead>
                                                        <tr>
                                                            <th>FY</th>
                                                            <th>Turnover in Lacs</th>
                                                            <th>Attachment</th>
                                                            <th>Key Markets</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {annualTurnover.map((item, idx) => (
                                                            <tr key={item.year}>
                                                                <td>{item.year}</td>
                                                                <td>
                                                                    <input
                                                                        disabled
                                                                        className="form-control"
                                                                        type="number"
                                                                        placeholder="Enter Turnover"
                                                                        value={item.turnover}
                                                                        onChange={e => handleAnnualTurnoverChange(idx, 'turnover', e.target.value)}
                                                                    />
                                                                </td>
                                                                <td>


                                                                        {item?.attachment ? (
                                                                    item?.attachment?.attachment_url || item?.attachment?.file_url ? (
                                                                        <span className="">
                                                                            <a
                                                                                href={`${baseURL}${item.attachment.attachment_url || item.attachment.file_url}`}
                                                                                download
                                                                                className="text-primary d-flex align-items-center"
                                                                            >
                                                                                <span className="me-2">Existing File:</span>
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width={24}
                                                                                    height={24}
                                                                                    fill="#DE7008"
                                                                                    className="bi bi-download"
                                                                                    viewBox="0 0 16 16"
                                                                                >
                                                                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                                                                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                                                                </svg>
                                                                                {item?.attachment.filename || item?.attachment.document_name}
                                                                            </a>
                                                                        </span>
                                                                    ) : item.attachment.filename ? (
                                                                        <span className="d-flex align-items-center">
                                                                            <span className="me-2">Selected File:</span>
                                                                            <span className="text-muted">{item.attachment.filename}</span>
                                                                        </span>
                                                                    ) : null
                                                                ) : null}
                                                                    <input
                                                                        className="form-control"
                                                                        type="file"
                                                                        disabled
                                                                        onChange={e => handleAnnualTurnoverFileChange(idx, e.target.files[0])}
                                                                    />
                                                                    {turnoverErrors[item.year]?.attachment && (
                                                                        <div className="ValidationColor">{turnoverErrors[item.year].attachment}</div>
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    <input
                                                                        className="form-control"
                                                                        type="text"
                                                                        placeholder="Enter Key Markets"
                                                                        value={item.keyMarkets}
                                                                        disabled
                                                                        onChange={e => handleAnnualTurnoverChange(idx, 'keyMarkets', e.target.value)}
                                                                    />
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </>)}

                                {/* ****** */}

                                <div className="card mx-4 pb-4 mt-4">
                                    {isSectionVisible('statutory details') && (
                                        <div className="row mt-4 mx-2">

                                            {statutoryDetails && statutoryDetails.length > 0 && (

                                                <div className="col-md-12">
                                                    <h5 className="mb-3">Additional Vendor Statutory Details
                                                        <TooltipIcon message="If not applicable then keep The field blank Additional Vendor Statutory Details." />
                                                    </h5>
                                                </div>
                                            )}

                                            {/* <div>{"*********************************************************"} </div> */}




                                            {statutoryDetails?.map((field, index) => (
                                                <div className="row" key={`${field.id}-${index}`}>
                                                    <div className="col-md-6 mt-3">
                                                        <div className="form-group">
                                                            <label>{field.name}</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder={`Enter ${field.name}`}
                                                                // value={statutoryInputs[field.code]?.input || field.statutory_detail_value}
                                                                value={
                                                                    statutoryInputs[field.code]?.input !== undefined
                                                                        ? statutoryInputs[field.code]?.input
                                                                        : field.statutory_detail_value || ""
                                                                }
                                                                onChange={(e) =>
                                                                    handleStatutoryInputChange(field.code, e.target.value, field.id, field.statutory_detail_value)
                                                                }
                                                                disabled
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6 mt-3">
                                                        <div className="form-group">
                                                            <div className="d-flex align-items-center mb-2">
                                                                <label className="mb-0">
                                                                    Attachment
                                                                    {shouldShowAttachmentStar(
                                                                        field.code,
                                                                        field.statutory_detail_value
                                                                    ) && <span>  *</span>}
                                                                </label>
                                                                {field?.attachment_url && (
                                                                    <span className="ms-2">
                                                                        <a
                                                                            href={`${baseURL}${field?.attachment_url}`}
                                                                            download
                                                                            className="text-primary d-flex align-items-center"
                                                                        >
                                                                            <span className="me-2 ms-3">Existing Files:</span>
                                                                            <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                width={24}
                                                                                height={24}
                                                                                fill="#DE7008"
                                                                                className="bi bi-download"
                                                                                viewBox="0 0 16 16"
                                                                            >
                                                                                <path
                                                                                    d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"
                                                                                />
                                                                                <path
                                                                                    d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"
                                                                                />
                                                                            </svg>
                                                                            {/* {field?.name ? field.name : "No Document Available"} */}
                                                                        </a>
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <input
                                                                type="file"
                                                                disabled
                                                                className="form-control"
                                                                accept=".pdf,.jpg,.jpeg,.png"
                                                                onChange={(e) =>
                                                                    handleStatutoryFileChange(field.code, e.target.files[0], field.id, field.statutory_detail_value)
                                                                }
                                                            />
                                                            {statutoryErrors[field.code] && (
                                                                <div className="ValidationColor">
                                                                    {statutoryErrors[field.code]}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}



                                    {isSectionVisible('questions & answers') && (
                                        <div className="mb-3 mx-3 mt-5">
                                            <h5 className="mb-3">Questions</h5>
                                            <div className="row mb-3">
                                                <div className="col-md-12 mb-3">
                                                    <label>Mention about your company expertise, briefly</label>
                                                    <textarea
                                                        className="form-control"
                                                        rows="3"
                                                        placeholder="Describe your company expertise"
                                                        value={questions.expertise}
                                                        disabled
                                                        onChange={e => handleQuestionChange('expertise', e.target.value)}
                                                    ></textarea>
                                                </div>
                                            </div>
                                            {/* <div className="row mb-3">
                                    <div className="col-md-4 offset-md-8 mb-3">
                                        <input
                                            className="form-control"
                                            type="file"
                                            onChange={e => handleQuestionFileChange(e.target.files[0])}
                                        />
                                    </div>
                                </div> */}
                                            <div className="row mb-3">
                                                <div className="col-md-12 mb-3">
                                                    <label>What is the organization and structure of the company / firm?</label>
                                                    <textarea
                                                        className="form-control"
                                                        rows="3"
                                                        placeholder="Describe the organization and structure"
                                                        value={questions.structure}
                                                        disabled
                                                        onChange={e => handleQuestionChange('structure', e.target.value)}
                                                    ></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* ...existing code... */}
                                {isSectionVisible('prequalification') && (
                                    <>
                                        {checklistConfig.filter(cat => cat.snag_cat_name === "Financial Pre-Qualification").map((cat, catIdx) => (
                                            <div className="card mx-3 pb-4 mt-4" key={cat.snag_category}>
                                                <div className="card-header3">
                                                    <h3 className="card-title">{cat.snag_cat_name} (Preview)</h3>
                                                </div>
                                                <div className="card-body mt-0">
                                                    <div className="tbl-container mt-3 ">
                                                        <table className="w-100">
                                                            <thead>
                                                                <tr>
                                                                    <th>Sr. No.</th>
                                                                    <th>Particulars</th>
                                                                    <th>Response</th>
                                                                    <th>Required Documents</th>
                                                                    <th>Remark if any</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {cat.subcats.map((subcat, subIdx) => (
                                                                    <React.Fragment key={subcat.id}>
                                                                        <tr>
                                                                            <td>{subIdx + 1}</td>
                                                                            <td ><b>{subcat.name}</b></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                        </tr>
                                                                        {subcat.questions.map((q, qIdx) => {
                                                                            const qState = (checklistResponses[subcat.id]?.questions || [])[qIdx] || {};
                                                                            return (
                                                                                <tr key={q.id}>
                                                                                    <td>{`${subIdx + 1}.${qIdx + 1}`}</td>
                                                                                    <td>{q.descr}</td>
                                                                                    <td>
                                                                                        {q.qtype === 'multiple' ? (
                                                                                            <SingleSelector
                                                                                                options={(q.options || []).map(opt => ({ label: opt.name, value: opt.value }))}
                                                                                                value={qState.selectedOption}
                                                                                                onChange={selected => handleChecklistOptionChange(subcat.id, q.id, selected)}
                                                                                                placeholder="Select"
                                                                                                isDisabled={true}
                                                                                            />
                                                                                        ) : (
                                                                                            <input
                                                                                                className="form-control"
                                                                                                type="text"
                                                                                                placeholder="Enter response"
                                                                                                value={qState.value || ''}
                                                                                                disabled
                                                                                                onChange={e => handleChecklistResponseChange(subcat.id, q.id, 'value', e.target.value)}
                                                                                            />
                                                                                        )}
                                                                                    </td>
                                                                                    <td>
                                                                                        <input
                                                                                            className="form-control"
                                                                                            type="file"
                                                                                            disabled
                                                                                            onChange={e => handleChecklistFileChange(subcat.id, q.id, e.target.files[0])}
                                                                                        />
                                                                                        {/* Show uploaded file names or server-provided attachments with download link */}
                                                                                        {qState.files && qState.files.length > 0 && (
                                                                                            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                                                                                                {(() => {
                                                                                                    // Prefer user-selected local uploads (they won't have file_url)
                                                                                                    const localFiles = qState.files.filter(f => !f.file_url);
                                                                                                    const filesToShow = localFiles.length > 0 ? localFiles : qState.files;
                                                                                                    return filesToShow.map((f, i) => {
                                                                                                        const href = f.file_url ? (String(f.file_url).startsWith('http') ? f.file_url : `${baseURL}${f.file_url}`) : null;
                                                                                                        return (
                                                                                                            <li key={i} style={{ marginBottom: 4 }}>
                                                                                                                {href ? (
                                                                                                                    <a href={href} download className="text-primary d-flex align-items-center mt-1" style={{ gap: 6 }}>
                                                                                                                        <svg
                                                                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                                                                            width={24}
                                                                                                                            height={24}
                                                                                                                            fill="#DE7008"
                                                                                                                            className="bi bi-download"
                                                                                                                            viewBox="0 0 16 16"
                                                                                                                        >
                                                                                                                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                                                                                                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                                                                                                        </svg>
                                                                                                                        <span>{f.filename}</span>
                                                                                                                    </a>
                                                                                                                ) : (
                                                                                                                    <span className="mt-2">{f.filename}</span>
                                                                                                                )}
                                                                                                            </li>
                                                                                                        );
                                                                                                    });
                                                                                                })()}
                                                                                            </ul>
                                                                                        )}
                                                                                    </td>
                                                                                    <td>
                                                                                        <textarea
                                                                                            className="form-control"
                                                                                            type="text"
                                                                                            disabled
                                                                                            placeholder=" Enter Remark"
                                                                                            value={qState.comments || ''}
                                                                                            onChange={e => handleChecklistResponseChange(subcat.id, q.id, 'comments', e.target.value)}
                                                                                        />
                                                                                    </td>
                                                                                </tr>
                                                                            );
                                                                        })}
                                                                    </React.Fragment>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        {/* Technical Pre-Qualification Table */}
                                        {checklistConfig.filter(cat => cat.snag_cat_name === "Technical Pre-Qualification").map((cat, catIdx) => (
                                            <div className="card mx-3 pb-4 mt-4" key={cat.snag_category}>
                                                <div className="card-header3">
                                                    <h3 className="card-title">{cat.snag_cat_name} (Preview)</h3>
                                                </div>
                                                <div className="card-body mt-0">
                                                    <div className="tbl-container mt-3 ">
                                                        <table className="w-100">
                                                            <thead>
                                                                <tr>
                                                                    <th>Sr. No.</th>
                                                                    <th>Particulars</th>
                                                                    <th>Response</th>
                                                                    <th>Required Documents</th>
                                                                    <th>Remark if any</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {cat.subcats.map((subcat, subIdx) => (
                                                                    <React.Fragment key={subcat.id}>
                                                                        <tr>
                                                                            <td>{subIdx + 1}</td>
                                                                            <td><b>{subcat.name}</b></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                        </tr>
                                                                        {subcat.questions.map((q, qIdx) => {
                                                                            const qState = (checklistResponses[subcat.id]?.questions || [])[qIdx] || {};
                                                                            return (
                                                                                <tr key={q.id}>
                                                                                    <td>{`${subIdx + 1}.${qIdx + 1}`}</td>
                                                                                    <td>{q.descr}</td>
                                                                                    <td style={{ minWidth: '150px' }}>
                                                                                        {q.qtype === 'multiple' ? (
                                                                                            <SingleSelector
                                                                                                options={(q.options || []).map(opt => ({ label: opt.name, value: opt.value }))}
                                                                                                value={qState.selectedOption}
                                                                                                onChange={selected => handleChecklistOptionChange(subcat.id, q.id, selected)}
                                                                                                placeholder="Select"
                                                                                                isDisabled={true}
                                                                                            />
                                                                                        ) : (
                                                                                            <input
                                                                                                className="form-control"
                                                                                                type="text"
                                                                                                placeholder="Enter response"
                                                                                                value={qState.value || ''}
                                                                                                disabled
                                                                                                onChange={e => handleChecklistResponseChange(subcat.id, q.id, 'value', e.target.value)}
                                                                                            />
                                                                                        )}
                                                                                    </td>
                                                                                    <td>
                                                                                        <input
                                                                                            className="form-control"
                                                                                            type="file"
                                                                                            disabled
                                                                                            onChange={e => handleChecklistFileChange(subcat.id, q.id, e.target.files[0])}
                                                                                        />
                                                                                        {qState.files && qState.files.length > 0 && (
                                                                                            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                                                                                                {(() => {
                                                                                                    const localFiles = qState.files.filter(f => !f.file_url);
                                                                                                    const filesToShow = localFiles.length > 0 ? localFiles : qState.files;
                                                                                                    return filesToShow.map((f, i) => {
                                                                                                        const href = f.file_url ? (String(f.file_url).startsWith('http') ? f.file_url : `${baseURL}${f.file_url}`) : null;
                                                                                                        return (
                                                                                                            <li key={i} style={{ marginBottom: 4 }}>
                                                                                                                {href ? (
                                                                                                                    <a href={href} download className="text-primary d-flex align-items-center mt-1" style={{ gap: 6 }}>
                                                                                                                        <svg
                                                                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                                                                            width={20}
                                                                                                                            height={20}
                                                                                                                            fill="#DE7008"
                                                                                                                            className="bi bi-download"
                                                                                                                            viewBox="0 0 16 16"
                                                                                                                        >
                                                                                                                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                                                                                                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                                                                                                        </svg>
                                                                                                                        <span style={{ fontSize: 12 }}>{f.filename}</span>
                                                                                                                    </a>
                                                                                                                ) : (
                                                                                                                    <span style={{ fontSize: 12 }}>{f.filename}{!f.file_url ? ' (uploaded)' : ''}</span>
                                                                                                                )}
                                                                                                            </li>
                                                                                                        );
                                                                                                    });
                                                                                                })()}
                                                                                            </ul>
                                                                                        )}
                                                                                    </td>
                                                                                    <td>
                                                                                        <textarea
                                                                                            className="form-control"
                                                                                            type="text"
                                                                                            placeholder=" Enter Remark"
                                                                                            disabled
                                                                                            value={qState.comments || ''}
                                                                                            onChange={e => handleChecklistResponseChange(subcat.id, q.id, 'comments', e.target.value)}
                                                                                        />
                                                                                    </td>
                                                                                </tr>
                                                                            );
                                                                        })}
                                                                    </React.Fragment>
                                                                ))}
                                                                {/* Show checklistPayload for review */}
                                                                {/* <div className="mt-4 mx-3">
                <h5>Checklist Payload Preview</h5>
                <pre style={{ background: '#f8f9fa', padding: '12px', fontSize: '12px', maxHeight: '300px', overflow: 'auto' }}>{JSON.stringify(checklistPayload, null, 2)}</pre>
            </div> */}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </>)}



                                {/* Repeat for all other dynamic sections: relatedEmployees, groupCompanies, supervisoryManpower, majorCustomers, workingSites, etc. Use the same card structure as in the form, with all fields disabled and filled. */}
                                {/* --- Declaration Section --- */}
                                <div className="card mx-4 pb-4 mt-4">
                                    <div className="row mt-4 mx-3">
                                        <div className="col-md-12">
                                            <h5 className=" ">Declaration <span style={{ color: " #DE7008" }}>*</span></h5>

                                            {/* Additional Declaration Questions (from API) */}
                                            {supplierDeclarations.map((d) => (
                                                <div className="mb-3" key={d.question_id}>
                                                    <p>{d.question_number}. {d.question_text}</p>
                                                    <div className="d-flex align-items-center mb-2">
                                                        {(d.options || []).map((opt) => (
                                                            <div className="form-check me-3" key={opt.value}>
                                                                <input
                                                                    className="form-check-input"
                                                                    type="radio"
                                                                    name={`declaration_${d.question_id}`}
                                                                    id={`declaration-${d.question_id}-${opt.value}`}
                                                                    value={opt.name}
                                                                    checked={d.selected_option === opt.name}
                                                                    onChange={() => handleDeclarationOptionChange(d.question_id, opt)}
                                                                />
                                                                <label className="form-check-label ms-1" htmlFor={`declaration-${d.question_id}-${opt.value}`}>{opt.name}</label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    {/* per-question inline error */}
                                                    {errors.declarationQuestions && errors.declarationQuestions[d.question_id] && (
                                                        <div className="ValidationColor mb-2">{errors.declarationQuestions[d.question_id]}</div>
                                                    )}
                                                    {/* explanation: only for question 1 and 2 */}
                                                    {([1, 2].includes(Number(d.question_number)) && d.selected_option === 'Yes') && (
                                                        <textarea
                                                            className="form-control mb-2"
                                                            placeholder="Explain if yes"
                                                            style={{ minHeight: '40px' }}
                                                            value={d.explanation || ''}
                                                            onChange={e => handleDeclarationExplanationChange(d.question_id, e.target.value)}
                                                        />
                                                    )}
                                                </div>
                                            ))}

                                            {/* Main Declaration Checkbox and Statement */}
                                            <p>
                                                <span className="me-2 mt-2">
                                                    <input
                                                        type="checkbox"
                                                        id="declaration-checkbox"
                                                        required=""
                                                        checked={isChecked}
                                                        onChange={handleCheckboxChange}
                                                    />
                                                </span>
                                                6. I, undersigned, on behalf of M/S Test 20/9/2025/ new hereby certify that the information provided in this documents are the best of my knowledge & particulars given in this submission are true and correct. I authorize M/S A2Z Online Services Private Limited to make direct inquiries and references to any person, firm, public official or organization named in this Form to verify information submitted herein or regarding the competence of the Organization.
                                            </p>
                                            {errors.declaration && (
                                                <div className="ValidationColor">{errors.declaration}</div>
                                            )}
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </>
                    )}



                    {/* Navigation buttons */}
                    {currentStep !== 0 && (
                        <div className="d-flex justify-content-center mt-4" style={{ gap: '1rem' }}>
                            {(currentStep > 1) && (
                                <button
                                    className="purple-btn1"
                                    onClick={() => {
                                        setCompleted((arr) => {
                                            const copy = [...arr];
                                            copy[currentStep - 1] = false;
                                            return copy;
                                        });
                                        setCurrentStep((s) => Math.max(s - 1, 0));
                                    }}
                                    disabled={normalize(steps[currentStep]?.label || '') === normalize('OTP Verification')}
                                >
                                    Back
                                </button>
                            )}

                            {currentStep !== 7 && (
                                <button
                                    className="purple-btn2 me-2"
                                    // onClick={() => {
                                    //     setCompleted((arr) => {
                                    //         const copy = [...arr];
                                    //         copy[currentStep] = true;
                                    //         return copy;
                                    //     });
                                    //     setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
                                    // }}


                                    onClick={() => {
                                        // Step-wise validation logic
                                        let isValid = true;
                                        if ((normalize(steps[currentStep]?.label || '') === normalize('Organization Detail'))) {
                                            isValid = validateBasicInfo();
                                            if (!isValid) return;
                                        }
                                        // Add more step validations as needed
                                        else
                                            if ((normalize(steps[currentStep]?.label || '') === normalize('Communication & Register Address'))) {
                                                isValid = validateStep2();
                                                if (!isValid) return;
                                            }
                                            else
                                                if ((normalize(steps[currentStep]?.label || '') === normalize('Bank Details'))) {
                                                    isValid = validateStep3();
                                                    if (!isValid) return;
                                                }
                                                else
                                                    if ((normalize(steps[currentStep]?.label || '') === normalize('Additional Details'))) {
                                                        isValid = validateStep4();
                                                        if (!isValid) return;
                                                    }
                                                    else
                                                        if ((normalize(steps[currentStep]?.label || '') === normalize('Statutory Details'))) {
                                                            isValid = validateStep5();
                                                            if (!isValid) return;
                                                        }
                                        // // ...
                                        // Save
                                        // //  as draft logic
                                        // if (typeof saveDraft === 'function') {
                                        //     saveDraft();
                                        // }
                                        setCompleted((arr) => {
                                            const copy = [...arr];
                                            copy[currentStep] = true;
                                            return copy;
                                        });
                                        setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
                                    }}
                                    disabled={currentStep === steps.length - 1}
                                >
                                    Next
                                </button>
                            )}

                            {currentStep === steps.length - 1 ? (
                                <button
                                    className="purple-btn2"
                                    onClick={async () => {
                                        // Final submit on last step
                                        // You can add final-step validation here if needed before calling handleUpdate
                                        // setLoading(true);
                                        await handleUpdate();
                                    }}
                                >
                                    Submit
                                </button>
                            ) : (
                                <button
                                    className="purple-btn2"
                                    onClick={async () => {
                                        // Step-wise validation logic
                                        let isValid = true;
                                        if ((normalize(steps[currentStep]?.label || '') === normalize('Organization Detail'))) {
                                            isValid = validateBasicInfo();
                                            if (!isValid) return;
                                            await saveDraftStep1();

                                        }
                                        // Add more step validations as needed
                                        else
                                            if ((normalize(steps[currentStep]?.label || '') === normalize('Communication & Register Address'))) {
                                                isValid = validateStep2();
                                                if (!isValid) return;
                                                await saveDraftStep2();
                                            }
                                            else
                                                if ((normalize(steps[currentStep]?.label || '') === normalize('Bank Details'))) {
                                                    isValid = validateStep3();
                                                    if (!isValid) return;
                                                    await saveDraftStep3();
                                                }
                                                else
                                                    if ((normalize(steps[currentStep]?.label || '') === normalize('Additional Details'))) {
                                                        isValid = validateStep4();
                                                        if (!isValid) return;
                                                        await saveDraftStep4()
                                                    }

                                                    else
                                                        if ((normalize(steps[currentStep]?.label || '') === normalize('Statutory Details'))) {
                                                            isValid = validateStep5();
                                                            if (!isValid) return;
                                                            await saveDraftStep5()
                                                        }
                                                        else
                                                            if ((normalize(steps[currentStep]?.label || '') === normalize('Prequalification'))) {
                                                                // isValid = validateStep4();
                                                                if (!isValid) return;
                                                                await saveDraftStep6()
                                                            }

                                        setCompleted((arr) => {
                                            const copy = [...arr];
                                            copy[currentStep] = true;
                                            return copy;
                                        });
                                        // setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
                                    }}
                                >
                                    Save as Draft & Next
                                </button>
                            )}
                        </div>
                    )}
                </div>











                <div className=" d-flex justify-content-center">
                    <div className="col-md-2">
                        {loading && (
                            <div className="loader-container">
                                <div className="lds-ring">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                                <p>Updating...</p>
                            </div>
                        )}
                        {/* <button className="purple-btn1" >
              Save as Draft
            </button>
            <button className="purple-btn2" onClick={handleUpdate}>
              Submit
            </button> */}
                    </div>
                </div>
            </div>

            {loading2 && (
                <div className="loader-container">
                    <div className="lds-ring">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <p>Loading...</p>
                </div>
            )}

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
};

export default VendorRegistrationStepByStepForm;



