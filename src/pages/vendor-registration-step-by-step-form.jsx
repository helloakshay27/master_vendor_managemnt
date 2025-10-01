       
       
       
       


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
    // Name Title options for contact person
    const nameTitleOptions = [
        { label: 'Select', value: '' },
        { label: 'Mr', value: 'Mr' },
        { label: 'Ms', value: 'Ms' },
        { label: 'Mrs', value: 'Mrs' },
        { label: 'Dr', value: 'Dr' },
        { label: 'M/s', value: 'M/s' },
        { label: 'Company', value: 'Company' },
    ];
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
    // Major Customer Served by You dynamic section state and handlers


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
    const [loading2, setLoading2] = useState(true);
    const [contactNumber, setContactNumber] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [organizationName, setOrganizationName] = useState(""); // Pre-fill this from API on load
    const [statutoryDetails, setStatutoryDetails] = useState(null);
    const [rekycStatus, setRekycStatus] = useState(null);

    const [statutoryInputs, setStatutoryInputs] = useState({});
    const [statutoryErrors, setStatutoryErrors] = useState({});

    // Check if the rekycType array is null or empty
    const isRekycTypeEmpty = !rekycType || rekycType.length === 0;

    // Check if rekycType is null, empty, or contains "MSME Rekyc"
    const isMsmeRekyc =
        rekycType &&
        rekycType.includes(
            "MSME Rekyc"
            // "MSME Re-kyc"
        );

    // Check if 'E-invoicing Rekyc' is in the rekycType array
    const isEnvoiceRekyc = rekycType && rekycType.includes("E-invoicing Rekyc");

    // Check if 'Bank Rekyc' is in the rekycType array
    const isBankRekyc = rekycType && rekycType.includes("Bank Rekyc");
    // console.log("bank re:", isBankRekyc);
    const isGstinRekyc = rekycType && rekycType.includes("GSTIN Rekyc");
    // new option name 
    const isNameRekyc = rekycType && rekycType.includes("Name Rekyc");

    // !rekycType ||

    // console.log(" re kyc type:", rekycType);

    // ***********************************

    const [basicInfo, setBasicInfo] = useState({
        vendorOrganizationName: "",
        organizationType: "",
        cin: "",
        cinAttachment: null,
        llp: "",
        llpAttachment: null,
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
        schemaGroup: "",
        dateOfIncorporation: "",
        gstinApplicable: "",
        gstinClassification: "",
        gstinNo: "",
        gstinAttachment: null,
        gstinDeclaration: null,
    });

    const updateBasicInfo = (field, value) => {
        setBasicInfo(prev => ({ ...prev, [field]: value }));
    };

    // console.log("basic info:", basicInfo)

    const gstinApplicableOptions = [
        { label: 'Yes', value: 'Yes' },
        { label: 'No', value: 'No' }
    ];
    const [gstinApplicable, setGstinApplicable] = useState('');
    const [emailOtp, setEmailOtp] = useState("");
    const [mobileOtp, setMobileOtp] = useState("");

    const handleOtpSubmit = () => {
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
        setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
    };

    const [supplierShowData, setSupplierShowData] = useState(null);
    const [bankDetailsList, setBankDetailsList] = useState([]);
    useEffect(() => {
        const fetchSupplierShowData = async () => {
            try {
                const response = await axios.get('https://vendors.lockated.com/pms/suppliers/4009/supplier_show.json');
                setSupplierShowData(response.data);
                  setBankDetailsList(response.data?.bank_details || [])
            } catch (error) {
                console.error('Error fetching supplier show data:', error);
            }
        };
        fetchSupplierShowData();
    }, []);
    console.log("supplier data bankDetailsList:", bankDetailsList)


    // Map supplierShowData to basicInfo when supplierShowData changes
    useEffect(() => {
        if (!supplierShowData) return;
        setBasicInfo(prev => ({
            ...prev,
            vendorOrganizationName: supplierShowData.organization_name || "",
            organizationType: supplierShowData.company_type || "",
            cin: supplierShowData.cin_number || "",
            panNo: supplierShowData.pan_number || "",
            fullName: supplierShowData.full_name || "",
            email: supplierShowData.email || "",
            mobile: supplierShowData.mobile || "",
            dateOfIncorporation: supplierShowData.date_of_incorporation || "",
            schemaGroup: supplierShowData.schema_group_id || "",
            gstinNo: supplierShowData.gstin || "",
            gstinApplicable: supplierShowData.gstin_applicable || "",
            // Add more mappings as needed
            llp: supplierShowData.llp_number || "",
            natureOfBusiness: null
            // supplierShowData.nature_of_business_id || null,
            // Attachments: just set filenames for now (handle upload separately)
            // panAttachment: supplierShowData.pan_attachments?.[0]?.document_name || null,
            // cinAttachment: supplierShowData.cin_number_attachments?.[0]?.document_name || null,
            // gstinAttachment: supplierShowData.gstin_attachments?.[0]?.document_name || null,
            // gstinDeclaration: supplierShowData.gstin_declaration_attachments?.[0]?.document_name || null,
            // ...other fields as needed
        }));
    }, [supplierShowData]);


    // Additional Vendor Details state (all fields in one object)
    const [additionalDetails, setAdditionalDetails] = useState({
        deliveryLeadPeriod: "",
        warrantyPeriod: "",
        amcProvided: null,
        website: "",
        currencyType: null,
        msmeUdyamApplicable: null,
        einvoice: null,
        einvoiceDeclaration: null,
        msmeNo: "",
        classificationYear: null,
        majorActivity: null,
        validFrom: "",
        validTill: "",
        msmeEnterpriseType: null,
        msmeAttachment: null,
        msmeDeclaration: null,
    });

    // Helper to update additional details fields
    const updateAdditionalDetails = (field, value) => {
        setAdditionalDetails(prev => ({ ...prev, [field]: value }));
    };

    // console.log("additional details:", additionalDetails)


    const [organizationTypeOptions, setOrganizationTypeOptions] = useState([]);
    useEffect(() => {
        const fetchOrganizationTypes = async () => {
            try {
                const response = await axios.get('https://vendors.lockated.com/pms/suppliers/type_of_organization_list');
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
                const response = await axios.get('https://vendors.lockated.com/pms/suppliers/type_of_industry_list');
                const options = (response.data?.type_of_industry || []).map(item => ({ label: item.name, value: item.id }));
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
    console.log("gst att:",basicInfo.gstinAttachment)

    const validateBasicInfo = () => {
        // Validate basic info fields
        const errors = {};
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
            }
            if (!basicInfo.gstinAttachment) {
                errors.gstinAttachment = 'This field is required.';
            }
        } else if (gstinApplicableLabel === 'No') {
            if (!basicInfo.gstinDeclaration) {
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
            if (!basicInfo.cinAttachment) errors.cinAttachment = 'This field is required';
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
            if (!basicInfo.llpAttachment) errors.llpAttachment = 'This field is required.';
        }

        console.log("errors***************:",errors)
        setBasicInfoErrors(errors);

        // --- Additional Vendor Details validation (for * fields) ---
        const additionalErrors = {};
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
            if (!additionalDetails.msmeAttachment) additionalErrors.msmeAttachments = 'This field is required.';
        }
        // If MSME/Udyam is No, declaration required
        if (additionalDetails.msmeUdyamApplicable?.value === 'No') {
            if (!additionalDetails.msmeDeclaration) additionalErrors.msmeDeclaration = 'This field is required.';
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

        console.log("additional errors:", additionalErrors)
        setErrors(additionalErrors);

        // Return false if either section has errors
        return Object.keys(errors).length === 0 && Object.keys(additionalErrors).length === 0;
    };



    // Country options for address selectors
    const [countryOptions, setCountryOptions] = useState([]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('https://vendors.lockated.com/pms/suppliers/pms_country_list');
                // Assuming response.data is an array of country objects with id and name
                const options = (response.data.pms_country || []).map(country => ({
                    label: country.name,
                    value: country.value
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
        orderingEmail:""
    });

    console.log("reg add :",registeredAddress)
    console.log("comm add:",communicationAddress)


    // State options for address selectors
    const [stateOptions, setStateOptions] = useState([]);

    useEffect(() => {
        if (!registeredAddress.country || !registeredAddress.country.value) {
            setStateOptions([]);
            return;
        }
        const fetchStates = async () => {
            try {
                const response = await axios.get('https://vendors.lockated.com/pms/suppliers/pms_state_list', {
                    params: { country_id: registeredAddress.country.value }
                });
                // Assuming response.data is an array of state objects with id and name
                const options = (response.data.pms_state || []).map(state => ({
                    label: state.name,
                    value: state.value
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
                const response = await axios.get('https://vendors.lockated.com/pms/suppliers/pms_state_list', {
                    params: { country_id: communicationAddress.country.value }
                });
                const options = (response.data.pms_state || []).map(state => ({
                    label: state.name,
                    value: state.value
                }));
                setCommStateOptions(options);
            } catch (error) {
                console.error('Error fetching state list (communication):', error);
            }
        };
        fetchStates();
    }, [communicationAddress.country]);
    

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
        const regFields = [
            { key: 'address1', label: 'Address' },
            { key: 'country', label: 'Country' },
            { key: 'state', label: 'State' },
            { key: 'city', label: 'City' },
            { key: 'pincode', label: 'Pin Code' },
            { key: 'mobile', label: 'Mobile Number' },
            { key: 'orderingEmail', label: 'Ordering Email ID' },
        ];
        const commFields = [
            { key: 'address1', label: 'Address' },
            { key: 'country', label: 'Country' },
            { key: 'state', label: 'State' },
            { key: 'city', label: 'City' },
            { key: 'pincode', label: 'Pin Code' },
            { key: 'mobile', label: 'Mobile Number' },
            { key: 'orderingEmail', label: 'Email ID' },
        ];
        const regErrs = {};
        const commErrs = {};
        regFields.forEach(f => {
            const val = registeredAddress[f.key];
            if (!val || (typeof val === 'object' && (!val.value && !val.label))) {
                regErrs[f.key] = `${f.label} is required.`;
            }
        });
        commFields.forEach(f => {
            const val = communicationAddress[f.key];
            if (!val || (typeof val === 'object' && (!val.value && !val.label))) {
                commErrs[f.key] = `${f.label} is required.`;
            }
        });
        setAddressErrors({ registered: regErrs, communication: commErrs });
        return Object.keys(regErrs).length === 0 && Object.keys(commErrs).length === 0;
    };
    

    const [virtualAccount, setVirtualAccount] = useState("");
    const [selectedCompany, setSelectedCompany] = useState(null);
    // Company options fetched from API
    const [companyOptions, setCompanyOptions] = useState([]);
    useEffect(() => {
        const fetchCompanyOptions = async () => {
            try {
                const response = await axios.get("https://vendors.lockated.com/pms/suppliers/pms_company_list");
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
        let validationErrors = {};
        if (isRekycTypeEmpty || isBankRekyc) {
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
        }
        setBankErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };
   





    const [branchOffices, setBranchOffices] = useState([]);

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
        setBranchOffices(prev => prev.map((b, i) => i === idx ? { ...b, [field]: value } : b));
    };

    const deleteBranchOffice = (id) => {
        // setBranchOffices(prev => prev.length === 1 ? prev : prev.filter(branch => branch.id !== id));
        setBranchOffices(prev => prev.length === 0 ? prev : prev.filter(branch => branch.id !== id));
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
        setContactPersons((prev) =>
            prev.map((p, i) => (i === idx ? { ...p, [field]: value } : p))
        );
    };

    const deleteContactPerson = (id) => {
        setContactPersons((prev) =>
            prev.length === 0 ? prev : prev.filter((person) => person.id !== id)
        );
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
        setOwners(prev => prev.map((o, i) => i === idx ? { ...o, [field]: value } : o));
    };

    const deleteOwner = (id) => {
        setOwners(prev => prev.length === 0 ? prev : prev.filter(o => o.id !== id));
    };
    // Factory Warehouse Details dynamic section state and handlers
    const [warehouses, setWarehouses] = useState([
        
    ]);

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
        setWarehouses(prev => prev.map((w, i) => i === idx ? { ...w, [field]: value } : w));
    };

    const deleteWarehouse = (id) => {
        setWarehouses(prev => prev.length === 0 ? prev : prev.filter(w => w.id !== id));
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

    const deleteMajorCustomer = (id) => {
        setMajorCustomers(prev => prev.length === 0 ? prev : prev.filter(c => c.id !== id));
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
     // --- Step 4 (cont): Owners, Related Employees, Group Companies, Supervisory Manpower, Major Customers, Working Sites ---
    const [ownerErrors, setOwnerErrors] = useState([]);
    const [relatedEmployeeErrors, setRelatedEmployeeErrors] = useState([]);
    const [groupCompanyErrors, setGroupCompanyErrors] = useState([]);
    const [supervisoryManpowerErrors, setSupervisoryManpowerErrors] = useState([]);
    const [majorCustomerErrors, setMajorCustomerErrors] = useState([]);
    const [workingSiteErrors, setWorkingSiteErrors] = useState([]);



     

    const validateStep4 = () => {
        // Branch Offices
        const branchErrs = branchOffices.map(branch => {
            const err = {};
            if (!branch.country) err.country = 'Country is required.';
            if (!branch.state) err.state = 'State is required.';
            if (!branch.city) err.city = 'City is required.';
            if (!branch.pincode) err.pincode = 'Pin Code is required.';
            return err;
        });
        setBranchErrors(branchErrs);

        // Contact Persons
        const contactErrs = contactPersons.map(person => {
            const err = {};
            if (!person.escalationLevel) err.escalationLevel = 'Escalation Level is required.';
            if (!person.nameTitle) err.nameTitle = 'Name Title is required.';
            if (!person.firstName) err.firstName = 'First Name is required.';
            if (!person.lastName) err.lastName = 'Last Name is required.';
            if (!person.designation) err.designation = 'Designation is required.';
            if (!person.primaryEmail) err.primaryEmail = 'Primary Email is required.';
            if (!person.primaryMobile) err.primaryMobile = 'Primary Mobile is required.';
            return err;
        });
        setContactPersonErrors(contactErrs);

        // Warehouses
        const warehouseErrs = warehouses.map(warehouse => {
            const err = {};
            if (!warehouse.country) err.country = 'Country is required.';
            if (!warehouse.state) err.state = 'State is required.';
            if (!warehouse.city) err.city = 'City is required.';
            return err;
        });
        setWarehouseErrors(warehouseErrs);
          // Owners
        const ownerErrs = owners.map(owner => {
            const err = {};
            if (!owner.firstName) err.firstName = 'First Name is required.';
            if (!owner.lastName) err.lastName = 'Last Name is required.';
            if (!owner.designation) err.designation = 'Designation is required.';
            if (!owner.email) err.email = 'Email is required.';
            if (!owner.mobile) err.mobile = 'Mobile Number is required.';
            return err;
        });
        setOwnerErrors(ownerErrs);

        // Related Employees
        const relEmpErrs = relatedEmployees.map(emp => {
            const err = {};
            if (!emp.firstName) err.firstName = 'First Name is required.';
            if (!emp.lastName) err.lastName = 'Last Name is required.';
            if (!emp.email) err.email = 'Employee Email Id is required.';
            return err;
        });
        setRelatedEmployeeErrors(relEmpErrs);

        // Group Companies
        const groupErrs = groupCompanies.map(company => {
            const err = {};
            if (!company.name) err.name = 'Name is required.';
            if (!company.natureOfBusiness) err.natureOfBusiness = 'Nature Of Business is required.';
            if (!company.pan) err.pan = 'PAN No. is required.';
            if (!company.gstin) err.gstin = 'GSTIN No. is required.';
            return err;
        });
        setGroupCompanyErrors(groupErrs);

        // Supervisory Manpower
        const supErrs = supervisoryManpower.map(item => {
            const err = {};
            if (!item.details) err.details = 'Supervisory Manpower Details are required.';
            if (!item.totalNumbers) err.totalNumbers = 'Total Numbers is required.';
            return err;
        });
        setSupervisoryManpowerErrors(supErrs);

        // Major Customers
        const custErrs = majorCustomers.map(cust => {
            const err = {};
            if (!cust.companyName) err.companyName = 'Company Name is required.';
            if (!cust.workDone) err.workDone = 'Work Done is required.';
            if (!cust.contactPerson) err.contactPerson = 'Contact Person is required.';
            if (!cust.designation) err.designation = 'Designation is required.';
            if (!cust.country) err.country = 'Country is required.';
            if (!cust.mobile) err.mobile = 'Mobile No. is required.';
            if (!cust.yearOfAssociation) err.yearOfAssociation = 'Year of Association is required.';
            if (!cust.businessLast12Months) err.businessLast12Months = 'Business done in Last 12 month is required.';
            if (!cust.serviceFrom) err.serviceFrom = 'Service Provided From is required.';
            if (!cust.serviceTo) err.serviceTo = 'Service Provided To is required.';
            return err;
        });
        setMajorCustomerErrors(custErrs);

        // Working Sites
        const siteErrs = workingSites.map(site => {
            const err = {};
            if (!site.builderName) err.builderName = 'Builder / Client Name is required.';
            if (!site.briefDetails) err.briefDetails = 'Brief Details is required.';
            if (!site.area) err.area = 'Area is required.';
            return err;
        });
        setWorkingSiteErrors(siteErrs);

        // Return true if all error objects are empty
        const allBranchesValid = branchErrs.every(e => Object.keys(e).length === 0);
        const allContactsValid = contactErrs.every(e => Object.keys(e).length === 0);
        const allWarehousesValid = warehouseErrs.every(e => Object.keys(e).length === 0);
          // Combine all validations
        // ...existing checks...
        const allOwnersValid = ownerErrs.every(e => Object.keys(e).length === 0);
        const allRelEmpValid = relEmpErrs.every(e => Object.keys(e).length === 0);
        const allGroupValid = groupErrs.every(e => Object.keys(e).length === 0);
        const allSupValid = supErrs.every(e => Object.keys(e).length === 0);
        const allCustValid = custErrs.every(e => Object.keys(e).length === 0);
        const allSiteValid = siteErrs.every(e => Object.keys(e).length === 0);
        // ...existing return...

        return allBranchesValid && allContactsValid && allWarehousesValid && allOwnersValid && allRelEmpValid && allGroupValid && allSupValid && allCustValid && allSiteValid;
       
    };
    



    // *****************************************

    const encryptFileContent = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            // Read the file as base64 string
            reader.readAsDataURL(file);

            reader.onload = () => {
                const fileContent = reader.result.split(",")[1]; // Extract the base64 content (without the prefix "data:...")

                // Encrypt the base64 content using a secret key (make sure to store the key securely in a real-world scenario)
                const secretKey = "your-secret-key"; // Use a secure secret key
                const encryptedContent = CryptoJS.AES.encrypt(
                    fileContent,
                    secretKey
                ).toString();

                resolve(encryptedContent);
            };

            reader.onerror = (error) => {
                reject(error);
            };
        });
    };

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

    // Function to fetch supplier data
    const fetchSupplierData = async () => {
        // setLoading2(true);
        try {
            const response = await axios.get(
                `${baseURL}/pms/suppliers/${id}/rekyc_by_sections.json?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414&rekyc_id=${rekyc_id}`
            );

            // Update the state with the response data
            setSupplierData(response.data);
            setEInvoicingApplicable(response.data?.einvoicing);
            setMsmeUdyamApplicable(response.data?.msme_details?.msme);
            setMsmeEnterpriseType(response.data?.msme_details?.enterprise);
            // setBankDetailsList(response.data?.bank_details);
            setMsmeNo(response.data?.msme_details?.msme_no);
            setValidFrom(response.data?.msme_details?.valid_from);
            setValidTill(response.data?.msme_details?.valid_till);
            setMajorActivity(response.data?.msme_details?.major_activity);
            setClassificationYear(response.data?.msme_details?.classification_year);
            setRekycStatus(response.data?.rekyc_status);
            // setStatutoryDetails(response.data.statutory_details)
            // setClassificationDate(response.data?.msme_details?.classification_date);
            setClassificationDate(
                response.data?.msme_details?.classification_date
                    ? response.data.msme_details.classification_date.split("T")[0]
                    : ""
            );

            setRekycId(response.data?.id);
            setRekycType(response.data?.rekyc_type);
            // setRekycType(["MSME Rekyc", "Name Rekyc", "E-invoicing Rekyc"]);

            // setGstApplicable(response.data?.gstin_applicable);
            // setGstClassification(response.data?.gst_classification);
            setGstinNumber(response.data?.gstin || ""); // Set GSTIN
            // setSelectedCountry(response.data?.bank_details.country)
            // setGstinAttachments(
            //   response.data?.basic_information?.gstin_attachments || []
            // );
            setContactNumber(response.data?.mobile || ""); // Set Contact Number
            setEmailAddress(response.data?.email || ""); // Set Email Address

            setGstApplicable(
                response.data?.gstin_applicable === "Yes" ? "Yes" : "No"
            );

            const selectedClassification = gstClassifications.find(
                (item) => item.value === response.data?.gst_classification
            );

            setGstClassification(selectedClassification || null);
            setOrganizationName(response.data?.organization_name)
            // console.log("enterprise:", response.data?.msme_details?.enterprise);
            setLoading2(false);
        } catch (error) {
            console.error("There was an error fetching the data!", error);
            setLoading2(false);
        }
    };

    useEffect(() => {
        // Fetch data from the API
        // console.log("fetch.........");

        fetchSupplierData(id);
    }, [id]);


    useEffect(() => {
        const fetchStatutoryData = async () => {
            try {
                const response = await axios.get(
                    `${baseURL}/pms/suppliers/${supplierData?.id}/statutory_detail_by_supplier.json`,
                    {
                        params: {
                            token: "bfa5004e7b0175622be8f7e69b37d01290b737f82e078414",
                            rekyc_id: rekycId,
                        },
                    }
                );

                const data = response.data || {};
                setStatutoryDetails(data.additional_statutory_details)
                // console.log("data api...", data)

                // Transform API response into statutoryInputs format
                const inputs = {};

                // Object.entries(data).forEach(([id, detail]) => {
                //   inputs[detail.code] = {
                //     input: detail.statutory_detail_value || "",
                //     file: detail.statutory_detail_attachment || null,
                //     id: parseInt(id),
                //   };
                // });

                (data.additional_statutory_details || []).forEach((detail) => {
                    inputs[detail.code] = {
                        input: detail.statutory_detail_value || "",
                        file: detail.statutory_detail_attachment || null,
                        id: detail.id,
                    };
                });

                setStatutoryInputs(inputs); // ✅ now safe to set

                // setStatutoryInputs(inputs);
                setLoading(false);


            } catch (error) {
                // console.error("Failed to fetch statutory details:", error);
                setLoading(false);
            }
        };

        fetchStatutoryData();
    }, [supplierData?.id]);

    // console.log("statutory details:", statutoryDetails)

    // Empty dependency array ensures this runs once on mount

    const [gstClassifications, setGstClassifications] = useState([]);

    const fetchGstClassifications = async () => {
        try {
            const response = await axios.get(
                `${baseURL}/pms/suppliers/gst_classification_dropdown`
            );
            setGstClassifications(response.data.gst_classifications || []);
        } catch (error) {
            console.error("Error fetching GST classifications", error);
        }
    };

    useEffect(() => {
        fetchGstClassifications();
    }, []);

    useEffect(() => {
        if (gstClassifications.length > 0) {
            fetchSupplierData();
        }
    }, [gstClassifications, id]);

    // console.log("supplier data:", supplierData);

    const checkGstinExists = async (gstin) => {
        try {
            // console.log(`Checking GSTIN: ${gstin}`);

            const response = await fetch(
                `${baseURL}/pms/suppliers/check_existing_pan_gstin?gstin=${gstin}`,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            // console.log("API Response:", data);

            if (data.exists) {
                // console.log("GSTIN already exists:", gstin);
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    gstinNumber: "GSTIN already exists!",
                }));
            } else {
                console.log("GSTIN is available:", gstin);
                setErrors((prevErrors) => {
                    const newErrors = { ...prevErrors };
                    delete newErrors.gstinNumber;
                    return newErrors;
                });
            }
        } catch (error) {
            console.error("Error checking GSTIN:", error);
        }
    };

    // Debounce effect to check GSTIN after user stops typing
    useEffect(() => {
        if (gstinNumber.length === 15) {
            const timer = setTimeout(() => {
                checkGstinExists(gstinNumber);
            }, 500); // 500ms delay

            return () => clearTimeout(timer);
        }
    }, [gstinNumber]);

    const handleGstinChange = (e) => {
        const value = e.target.value;
        setGstinNumber(value);

        if (value.length !== 15) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                gstinNumber: "Enter a valid 15-character GSTIN!",
            }));
        } else {
            setErrors((prevErrors) => {
                const newErrors = { ...prevErrors };
                delete newErrors.gstinNumber;
                return newErrors;
            });
        }
    };

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
                `${baseURL}/pms/dropdown_states?country_id=${countryId}&&token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414`
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

    // Function to handle field changes

    // const handleInputChange = (e, id, field) => {
    //   const { value } = e.target;
    //   setBankDetailsList((prevDetails) =>
    //     prevDetails.map((bankDetail) =>
    //       bankDetail.id === id ? { ...bankDetail, [field]: value } : bankDetail
    //     )
    //   );
    // };
    // Add these to your state declarations

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
                            ifsc: "Invalid IFSC format. First 4 characters must be capital letters, followed by '0' and 6 alphanumeric characters",
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
        setBankDetailsList(bankDetailsList.filter((item) => item.id !== id));

        // Store deleted bank details separately
        const deletedItem = bankDetailsList.find((item) => item.id === id);
        if (deletedItem) {
            setDeletedBankDetails([...deletedBankDetails, { id, _destroy: true }]);
        }

        // setBankDetailsList(bankDetailsList.map((item) =>
        //   item.id === id
        //     ? { ...item, _destroy: true } // Mark this bank detail as deleted
        //     : item
        // ).filter(item => item._destroy !== true)); // Also filter out items with _destroy: true
    };

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

    //   const validateStatutoryAttachments = () => {
    //   const errors = {};

    //   statutoryDetails.forEach((field) => {
    //     const { code, name, attachment_required } = field;
    //     const fileData = statutoryInputs[code]?.file;

    //     if (attachment_required && !fileData) {
    //       errors[code] = `Attachment is required for ${name}`;
    //     }
    //   });

    //   setStatutoryErrors(errors);
    //   return Object.keys(errors).length === 0;
    // };
    // const validateStatutoryInputs = () => {
    //   const errors = {};

    //   // Object.entries(statutoryInputs).forEach(([code, { file, id }]) => {
    //   //   if (!file) {
    //   //     errors[code] = "Attachment is required.";
    //   //   }
    //   // });

    //   Object.entries(statutoryInputs).forEach(([code, { input, file }]) => {
    //     if (input && !file) {
    //       errors[code] = "Attachment is required.";
    //     }
    //   });

    //   return errors;
    // };

    //   const validateStatutoryInputs = () => {
    //     const errors = {};

    //     Object.entries(statutoryInputs).forEach(([code, { input, file }]) => {
    //       const isNotApplicable =
    //         typeof input === "string" && input.trim().toLowerCase() === "not applicable";

    //       if (input && !file && !isNotApplicable) {
    //         errors[code] = "Attachment is required.";
    //       }
    //     });

    //     return errors;
    //   };


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






    // console.log("statutory details error:",statutoryErrors)
    // console.log("Payload to send:", statutoryPayload);

    const payload = {
        authenticity_token: "[FILTERED]", // No quotes for the token value, but the key is a string
        vendor_re_kyc: {
            status: "details_submitted_by_vendor",
        },
        pms_supplier: {
            rekyc_id: rekyc_id,
            mobile: contactNumber, // Add Contact Number
            email: emailAddress,
            msme: msmeUdyamApplicable || "",
            msme_no: msmeUdyamApplicable === "No" ? "" : msmeNo || null,
            valid_from: msmeUdyamApplicable === "No" ? "" : validFrom || null,
            valid_till: msmeUdyamApplicable === "No" ? "" : validTill || null,
            enterprise:
                msmeUdyamApplicable === "No" ? "" : msmeEnterpriseType || null,
            major_activity: msmeUdyamApplicable === "No" ? "" : majorActivity || null,
            classification_year:
                msmeUdyamApplicable === "No" ? "" : classificationYear || null,
            classification_date:
                msmeUdyamApplicable === "No" ? "" : classificationDate || null,

            msme_attachments: msmeUdyamApplicable === "No" ? [] : msmeAttachments,
            einvoicing: eInvoicingApplicable || "",
            einvoicing_attachments:
                eInvoicingApplicable === "No" ? einvoicingAttachments : [], //added
            // bank_details_attributes: bankDetailsList,
            bank_details_attributes: bankDetailsList.map((item) => ({
                ...item,
                id: item.isNew ? null : item.id,

                attachment: item.isNew
                    ? bankAttachments[item.id] || null // If new attachment exists, pass it; otherwise, null
                    : bankAttachments[item.id] || (item.attachment ? null : null), // If existing, only pass null if no new file is uploaded
            })),
            // attachment: item.isNew
            //   ? bankAttachments[item.tempId] || null // Use tempId for new items
            //   : bankAttachments[item.id] || null, // Use id for existing items
            // Set id to null if it's a new entry
            // attachment: item.isNew ? bankAttachments : null,
            // _destroy: item._destroy ? true : null, // Convert _destroy to boolean or null
            // })),

            deletedBankDetails: deletedBankDetails, //deleted details

            // gstin_applicable: gstApplicable || "",
            // gst_classification_id: gstClassification?.value || "",
            // gstin: gstinNumber || "",
            // // gstin_attachments: gstinAttachments || [],
            // gstin_attachments: gstinAttachments,

            gstin_applicable: gstApplicable || null,
            ...(gstApplicable === "Yes" && {
                gst_classification_id: gstClassification?.value || null,
                gstin: gstinNumber || "",
                gstin_attachments: gstinAttachments,
            }),
            organization_name: organizationName,
            pan_attachments: panAttachments,
            msme_attachments: msmeAttachments2,
            cin_attachments: cinAttachments,
            gstin_attachments: gstinAttachments2,
            bank_attachments_attachments: bankChequeAttachments,
            statutory_details: statutoryPayload
        },
    };

    const payloadCondition = {
        authenticity_token: "[FILTERED]", // No quotes for the token value, but the key is a string
        vendor_re_kyc: {
            status: "details_submitted_by_vendor",
        },
        pms_supplier: {
            rekyc_id: rekyc_id,
        },
    };

    // If the condition is met, include only GSTN-related fields
    if (isRekycTypeEmpty || isGstinRekyc) {
        payloadCondition.pms_supplier = {
            ...payloadCondition.pms_supplier, // Keep existing keys
            gstin_applicable: gstApplicable || null,
            ...(gstApplicable === "Yes" && {
                gst_classification_id: gstClassification?.value || null,
                gstin: gstinNumber || "",
                gstin_attachments: gstinAttachments || [],
            }),
        };
    }

    // If the condition is met, include only Bank Details
    if (isRekycTypeEmpty || isBankRekyc) {
        payloadCondition.pms_supplier = {
            ...payloadCondition.pms_supplier, // Keep existing keys
            bank_details_attributes: bankDetailsList.map((item) => ({
                ...item,
                id: item.isNew ? null : item.id,

                attachment: item.isNew
                    ? bankAttachments[item.id] || null // If new attachment exists, pass it; otherwise, null
                    : bankAttachments[item.id] || (item.attachment ? null : null), // If existing, only pass null if no new file is uploaded
            })),

            deletedBankDetails: deletedBankDetails || [], // Deleted bank details, if any
        };
    }

    // If the condition is met, include only MSME-related fields
    if (isRekycTypeEmpty || isMsmeRekyc) {
        payloadCondition.pms_supplier = {
            ...payloadCondition.pms_supplier, // Keep existing keys
            msme: msmeUdyamApplicable || "",
            msme_no: msmeUdyamApplicable === "No" ? "" : msmeNo || null,
            valid_from: msmeUdyamApplicable === "No" ? "" : validFrom || null,
            valid_till: msmeUdyamApplicable === "No" ? "" : validTill || null,
            enterprise:
                msmeUdyamApplicable === "No" ? "" : msmeEnterpriseType || null,
            major_activity: msmeUdyamApplicable === "No" ? "" : majorActivity || null,
            classification_year:
                msmeUdyamApplicable === "No" ? "" : classificationYear || null,
            classification_date:
                msmeUdyamApplicable === "No" ? "" : classificationDate || null,
            msme_attachments: msmeUdyamApplicable === "No" ? [] : msmeAttachments,
        };
    }

    // If the condition is met, include only E-Invoicing-related fields
    if (isRekycTypeEmpty || isEnvoiceRekyc) {
        payloadCondition.pms_supplier = {
            ...payloadCondition.pms_supplier, // Keep existing keys
            einvoicing: eInvoicingApplicable || "",
            einvoicing_attachments:
                eInvoicingApplicable === "No" ? einvoicingAttachments || [] : [],
        };
    }

    // for name rekyc
    if (isRekycTypeEmpty || isNameRekyc) {
        payloadCondition.pms_supplier = {
            ...payloadCondition.pms_supplier,

            // Add only Name Rekyc related fields
            // organization_name: organizationName || "",
            // pan_attachement: panAttachments || [],
            // msme_attachement: msmeAttachments2 || [],
            // cin_attachement: cinAttachments || [],
            // gstin_attachement: gstinAttachments2 || [],
            // cheque_attachement: bankChequeAttachments || [],

            organization_name: organizationName || "",
            pan_attachments: panAttachments || [],
            msme: msmeUdyamApplicable || "",
            msme_attachments: msmeAttachments2 || [],
            cin_attachments: cinAttachments || [],
            gstin_attachments: gstinAttachments2 || [],
            bank_attachments_attachments: bankChequeAttachments || [],
            statutory_details: statutoryPayload || [],
            einvoicing: eInvoicingApplicable || "",
            einvoicing_attachments: eInvoicingApplicable === "No" ? einvoicingAttachments || [] : [],
        };
    }
    // console.log("payload:", payload);
    // console.log("payload condition for new rekyc edit:", payloadCondition);

    // update api

    const [errors, setErrors] = useState({});
    const [isChecked, setIsChecked] = useState(false); // Add this state to track checkbox
    // const [formSubmitted, setFormSubmitted] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    // console.log("before update")
    // Handle the Update Button Click
    const handleUpdate = async () => {
        // console.log("innn update")
        // console.log("rekyc_type:", rekycType);

        // console.log('formSubmitted:', formSubmitted);

        let validationErrors = {};
        // if (isRekycTypeEmpty || isBankRekyc) {
        //   bankDetailsList.forEach((bankDetail) => {
        //     if (bankDetail.isNew) {
        //       // Only validate if it's a new entry
        //       if (!bankDetail.bank_name) {
        //         validationErrors.bank_name = "Bank Name is required.";
        //       }
        //       if (!bankDetail.address) {
        //         validationErrors.address = "Address is required.";
        //       }
        //       if (!bankDetail.country_id) {
        //         validationErrors.country_id = "Country is required.";
        //       }
        //       if (!bankDetail.state_id) {
        //         validationErrors.state_id = "State is required.";
        //       }
        //       if (!bankDetail.city_name) {
        //         validationErrors.city_name = "City is required.";
        //       }
        //       // {
        //       // }

        //       // if (!bankDetail.pincode || isNaN(bankDetail.pincode)) {
        //       //   validationErrors.pincode = "Valid Pin Code is required.";
        //       // }
        //       // For pincode, only validate if there's no input error
        //       if (!bankDetail.pincode || isNaN(bankDetail.pincode)) {
        //         if (!inputErrors[bankDetail.id]?.pincode) {
        //           validationErrors.pincode = "Valid Pin Code is required.";
        //         }
        //       }

        //       // if (!bankDetail.account_type) {
        //       //   validationErrors.account_type = "Account Type is required.";
        //       // }
        //       // In your validation section within handleUpdate
        //       if (!bankDetail.account_type || bankDetail.account_type === "") {
        //         validationErrors.account_type = "Account Type is required.";
        //       }
        //       if (!bankDetail.account_number) {
        //         validationErrors.account_number = "Account Number is required.";
        //       }
        //       // if (!bankDetail.confirm_account_number) {
        //       //   validationErrors.confirm_account_number =
        //       //     "Confirm Account Number is required.";
        //       // }
        //       if (!bankDetail.confirm_account_number) {
        //         validationErrors.confirm_account_number =
        //           "Confirm Account Number is required.";
        //       } else if (
        //         bankDetail.account_number !== bankDetail.confirm_account_number
        //       ) {
        //         validationErrors.confirm_account_number =
        //           "Account numbers must match";
        //         // Show popup alert
        //         alert("Account Number and Confirm Account Number must match!");
        //       }

        //       if (bankDetail.account_number !== bankDetail.confirm_account_number) {
        //         validationErrors.account_match =
        //           "Account Number and Confirm Account Number must match.";
        //       }
        //       if (!bankDetail.branch_name) {
        //         validationErrors.branch_name = "Branch Name is required.";
        //       }
        //       if (!bankDetail.micr_number) {
        //         validationErrors.micr_number = "MICR Number is required.";
        //       }
        //       // if (!bankDetail.ifsc_code) {
        //       //   validationErrors.ifsc_code = "IFSC Code is required.";
        //       // } else if (bankDetail.ifsc_code.length > 11) {
        //       //   validationErrors.ifsc_code =
        //       //     "IFSC Code cannot be longer than 11 characters.";
        //       // }
        //       if (!bankDetail.ifsc_code) {
        //         if (!inputErrors[bankDetail.id]?.ifsc) {
        //           validationErrors.ifsc_code = "IFSC Code is required.";
        //         }
        //       }

        //       if (!bankDetail.benficary_name) {
        //         validationErrors.benficary_name = "Beneficiary Name is required.";
        //       }
        //       // if (!bankDetail.cancelled_cheque) {
        //       //   validationErrors.cancelled_cheque =
        //       //     "Cancelled Cheque / Bank Copy is required.";
        //       // }
        //       if (!bankAttachments[bankDetail.id]) {
        //         validationErrors.cancelled_cheque =
        //           "Cancelled Cheque / Bank Copy is required.";
        //       }

        //       // Add other validation checks here
        //     }
        //   });
        // }
        // In handleUpdate function, modify the bank details validation:
        if (isRekycTypeEmpty || isBankRekyc) {
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
                        validationErrors.confirm_account_number =
                            "Confirm Account Number is required.";
                    } else if (
                        bankDetail.account_number !== bankDetail.confirm_account_number
                    ) {
                        validationErrors.confirm_account_number =
                            "Account numbers must match";
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
                    }

                    if (!bankDetail.benficary_name) {
                        validationErrors.benficary_name = "Beneficiary Name is required.";
                    }

                    if (!bankAttachments[bankDetail.id]) {
                        validationErrors.cancelled_cheque =
                            "Cancelled Cheque / Bank Copy is required.";
                    }
                }
            });

            // If there are no new bank details, don't show validation errors
            if (!hasNewBankDetails) {
                validationErrors = {};
            }
        }

        if (!contactNumber) {
            validationErrors.contactNumber = "Contact Number is required.";
        } else if (!/^\d{10}$/.test(contactNumber)) {
            validationErrors.contactNumber = "Enter a valid 10-digit Contact Number.";
        }

        if (!emailAddress) {
            validationErrors.emailAddress = "Email Address is required.";
        } else if (
            !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(emailAddress)
        ) {
            validationErrors.emailAddress = "Enter a valid Email Address.";
        }

        if (isRekycTypeEmpty || isMsmeRekyc) {
            // Validate MSME/Udyam Number Applicable
            if (!msmeUdyamApplicable) {
                validationErrors.msmeUdyamApplicable =
                    "MSME/Udyam Number Applicable is required.";
            }

            // Validate MSME/Udyam Number if MSME/Udyam is applicable
            if (msmeUdyamApplicable === "Yes" && !msmeNo) {
                validationErrors.msmeNo = "MSME/Udyam Number is required.";
            }

            // Validate MSME/Udyam Valid From if MSME/Udyam is applicable
            if (msmeUdyamApplicable === "Yes" && !validFrom) {
                validationErrors.validFrom = "MSME/Udyam Valid From date is required.";
            }

            // Validate MSME/Udyam Valid Till if MSME/Udyam is applicable
            if (msmeUdyamApplicable === "Yes" && !validTill) {
                validationErrors.validTill = "MSME/Udyam Valid Till date is required.";
            }

            // Validate MSME Enterprise Type if MSME/Udyam is applicable
            if (msmeUdyamApplicable === "Yes" && !msmeEnterpriseType) {
                validationErrors.msmeEnterpriseType =
                    "MSME Enterprise Type is required.";
            }

            // Validate Major Activity
            if (msmeUdyamApplicable === "Yes" && !majorActivity) {
                validationErrors.majorActivity = "Major Activity is required.";
            }

            if (msmeUdyamApplicable === "Yes" && !classificationYear) {
                validationErrors.classificationYear =
                    "Classification Year is required.";
            }

            // Validate Classification Date
            if (msmeUdyamApplicable === "Yes" && !classificationDate) {
                validationErrors.classificationDate =
                    "Classification Date is required.";
            }

            if (
                msmeUdyamApplicable === "Yes" &&
                supplierData?.msme_details?.msme_attachments?.length === 0 &&
                msmeAttachments.length === 0 // Also check msmeAttachments state
            ) {
                validationErrors.msmeAttachments = "MSME/Udyam Attachment is required.";
            }
        }

        if (isRekycTypeEmpty || isGstinRekyc) {
            if (!gstApplicable) {
                validationErrors.gstApplicable = "GST Applicable is required.";
            } else if (gstApplicable === "Yes") {
                // if (!gstClassification?.value)
                //   validationErrors.gstClassification =
                //     "GST Classification is required.";
                if (!gstinNumber)
                    validationErrors.gstinNumber = "GSTIN Number is required.";
                // if (supplierData?.basic_information?.gstin_attachments.length === 0)
                //   validationErrors.gstinAttachments = "GSTIN Attachment is required.";
                if (
                    (supplierData?.basic_information?.gstin_attachments.length === 0 ||
                        !supplierData?.basic_information?.gstin_attachments) &&
                    gstinAttachments.length === 0
                ) {
                    validationErrors.gstinAttachments = "GSTIN Attachment is required.";
                }
            }
        }

        // name ekyc
        if (isRekycTypeEmpty || isNameRekyc) {
            console.log("is name rekyc true")

            if (!msmeUdyamApplicable) {
                validationErrors.msmeUdyamApplicable =
                    "MSME/Udyam Number Applicable is required.";
            }

            console.log("msme:", !msmeUdyamApplicable)



            const statutoryErrors = validateStatutoryInputs() || {};

            if (Object.keys(statutoryErrors).length > 0) {
                setStatutoryErrors(statutoryErrors); // show inline errors if needed
                // return; // stop submission
            }




            // if (!isValid) {
            //   return; // Stop submit if validation failed
            // }
            if (!organizationName?.trim()) {
                validationErrors.organizationName = "Organization Name is required.";
            }

            // PAN Attachment
            // const hasExistingPan = supplierData?.basic_information?.pan_attachments?.length > 0;
            // const hasNewPan = panAttachments.length > 0;
            // if (!hasExistingPan && !hasNewPan) {
            //   validationErrors.panAttachments = "PAN Attachment is required.";
            // }
            // console.log("has pan :",!hasNewPan)

            // console.log("existingPan:", supplierData?.basic_information?.pan_attachments);
            // console.log("newPan:", panAttachments);
            // console.log("hasExistingPan:", hasExistingPan);
            // console.log("hasNewPan:", hasNewPan);
            if (
                // (!supplierData?.basic_information?.pan_attachements?.length || supplierData.basic_information.pan_attachements.length === 0) &&
                panAttachments.length === 0
            ) {
                validationErrors.panAttachments = "PAN Attachment is required.";
            }


            // MSME Attachment
            if (
                // (msmeUdyamApplicable === "Yes" && !supplierData?.basic_information?.msme_attachments?.length || supplierData.basic_information.msme_attachments.length === 0) &&
                // msmeAttachments2.length === 0

                (msmeUdyamApplicable === "Yes" &&
                    msmeAttachments2.length === 0
                )
            ) {
                validationErrors.msmeAttachments2 = "MSME Attachment is required.";
            }

            // CIN Attachment
            if (
                // (!supplierData?.basic_information?.cin_number_attachments?.length || supplierData?.basic_information?.cin_number_attachments.length === 0) &&
                cinAttachments.length === 0
            ) {
                validationErrors.cinAttachments = "CIN Attachment is required.";
            }

            // GSTIN Attachment (Name Rekyc)
            if (
                // (!supplierData?.basic_information?.gstin_attachments?.length || supplierData.basic_information.gstin_attachments.length === 0) &&
                gstinAttachments2.length === 0
            ) {
                validationErrors.gstinAttachments2 = "GSTIN Attachment is required.";
            }

            // // Bank Cheque Attachment
            // if (
            //   (!supplierData?.basic_information?.bank_attachments_attachments?.length || supplierData.basic_information.bank_attachments_attachments.length === 0) &&
            //   bankChequeAttachments.length === 0
            // ) {
            //   validationErrors.bankChequeAttachments = "Bank Cheque Attachment is required.";
            // }


        }


        // Add this inside your validation logic
        if (!isChecked) {
            validationErrors.declaration =
                "Please check the declaration box to proceed.";
        }

        // Set errors and return if validation fails
        // setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) {
            // return false; // Return false if there are validation errors
            console.log("Validation Errors:", validationErrors);
            return setErrors(validationErrors);
        } else {
            setLoading(true);
            console.log("Validation passed. Sending API request...");

            // condition wise payload
            const payload = {
                authenticity_token: "[FILTERED]", // No quotes for the token value, but the key is a string
                vendor_re_kyc: {
                    status: "details_submitted_by_vendor",
                },
                pms_supplier: {
                    rekyc_id: rekyc_id,
                    mobile: contactNumber, // Add Contact Number
                    email: emailAddress, // Add Email Address
                },
            };
            // If the condition is met, include only GSTN-related fields
            if (isRekycTypeEmpty || isGstinRekyc) {
                payload.pms_supplier = {
                    ...payload.pms_supplier, // Keep existing keys
                    gstin_applicable: gstApplicable || null,
                    ...(gstApplicable === "Yes" && {
                        gst_classification_id: gstClassification?.value || null,
                        gstin: gstinNumber || "",
                        gstin_attachments: gstinAttachments || [],
                    }),
                };
            }

            // If the condition is met, include only Bank Details
            if (isRekycTypeEmpty || isBankRekyc) {
                payload.pms_supplier = {
                    ...payload.pms_supplier, // Keep existing keys
                    bank_details_attributes: bankDetailsList.map((item) => ({
                        ...item,
                        id: item.isNew ? null : item.id,
                        account_type: item.account_type || "", // Ensure account_type is included

                        attachment: item.isNew
                            ? bankAttachments[item.id] || null // If new attachment exists, pass it; otherwise, null
                            : bankAttachments[item.id] || (item.attachment ? null : null), // If existing, only pass null if no new file is uploaded
                    })),

                    deletedBankDetails: deletedBankDetails || [], // Deleted bank details, if any
                };
            }

            // If the condition is met, include only MSME-related fields
            if (isRekycTypeEmpty || isMsmeRekyc) {
                payload.pms_supplier = {
                    ...payload.pms_supplier, // Keep existing keys
                    msme: msmeUdyamApplicable || "",
                    msme_no: msmeUdyamApplicable === "No" ? "" : msmeNo || null,
                    valid_from: msmeUdyamApplicable === "No" ? "" : validFrom || null,
                    valid_till: msmeUdyamApplicable === "No" ? "" : validTill || null,
                    enterprise:
                        msmeUdyamApplicable === "No" ? "" : msmeEnterpriseType || null,
                    major_activity:
                        msmeUdyamApplicable === "No" ? "" : majorActivity || null,
                    classification_year:
                        msmeUdyamApplicable === "No" ? "" : classificationYear || null,
                    classification_date:
                        msmeUdyamApplicable === "No" ? "" : classificationDate || null,
                    msme_attachments: msmeUdyamApplicable === "No" ? [] : msmeAttachments,
                };
            }

            // If the condition is met, include only E-Invoicing-related fields
            if (isRekycTypeEmpty || isEnvoiceRekyc) {
                payload.pms_supplier = {
                    ...payload.pms_supplier, // Keep existing keys
                    einvoicing: eInvoicingApplicable || "",
                    einvoicing_attachments:
                        eInvoicingApplicable === "No" ? einvoicingAttachments || [] : [],
                };
            }


            // for name rekyc
            if (isRekycTypeEmpty || isNameRekyc) {
                payload.pms_supplier = {
                    ...payload.pms_supplier,
                    organization_name: organizationName || "",
                    pan_attachments: panAttachments || [],
                    msme: msmeUdyamApplicable || "",
                    msme_attachments: msmeAttachments2 || [],
                    cin_attachments: cinAttachments || [],
                    gstin_attachments: gstinAttachments2 || [],
                    bank_attachments_attachments: bankChequeAttachments || [],
                    statutory_details: statutoryPayload || [],
                    einvoicing: eInvoicingApplicable || "",
                    einvoicing_attachments: eInvoicingApplicable === "No" ? einvoicingAttachments || [] : [],
                };
            }

            console.log("payload submition with conditions:", payload);

            try {
                const response = await axios.patch(
                    `${baseURL}/pms/suppliers/${id}/update_rekyc_by_sections.json?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414&rekyc_id=${rekyc_id}`,
                    payload
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
    };

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


    // At the top of your component
    const steps = [
        { label: "OTP Verification" },
        { label: "Organization Details" },
        { label: "Communication & Register Address" },
        { label: "Bank Details" },
        { label: "Additional Details" },
        { label: "Statutory Details" },

        { label: "Pre qualification" },
        { label: "Preview,Declarations & Submit" },
        // { label: "Preview " },
    ];
    const [currentStep, setCurrentStep] = useState(0);
    const [completed, setCompleted] = useState(Array(steps.length).fill(false));

    // Helper: a step is completed if completed[idx] is true
    // The line between step i and i+1 is colored only if completed[i] is true




    return (
        <>
            {/* {(!rekycStatus || rekycStatus === null || rekycStatus === undefined || rekycStatus === "") ? (
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
                        ): */}
            {/* // rekycStatus === "pending" ? ( */}
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
                                            background: completed[idx] ? '#e95420' : (currentStep === idx ? '' : ''),
                                            color: completed[idx] ? '#fff' : '',
                                            borderColor: completed[idx] ? '#e95420' : '',
                                            borderWidth: completed[idx] ? 2 : '',
                                            transition: 'background 0.3s, color 0.3s, border-color 0.3s',
                                        }}
                                        onClick={() => setCurrentStep(idx)}
                                    >
                                        {completed[idx] ? <span style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>✔</span> : idx + 1}
                                    </button>
                                    <div className="step-label mt-2" style={{ fontSize: 13, minWidth: 60, textAlign: 'center' }}>{step.label}</div>
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


                    {currentStep === 0 && (
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
                                            <div className="form-group mb-3">
                                                <label>Contact Person Name</label>
                                                <input className="form-control" type="email" value="ajay.ghenand@lockated.com" readOnly />
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>Primary Email ID</label>
                                                        <input className="form-control" type="email" value="ajay.ghenand@lockated.com" readOnly />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>Secondary Email ID</label>
                                                        <input className="form-control" type="email" value="ghenandajay1010@gmail.com" readOnly />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>Primary Mobile No.</label>
                                                        <input className="form-control" type="text" value="9623636187" readOnly />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>Secondary Mobile No.</label>
                                                        <input className="form-control" type="text" value="" placeholder="Enter secondary mobile number" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-6 d-flex align-items-center">
                                                    <button className="purple-btn2 me-3">Get OTP</button>

                                                </div>


                                            </div>

                                            <div className="row w-100 mb-3">
                                                <div className="col-md-6">
                                                    <input className="form-control" type="number" placeholder="Enter Email OTP" value={emailOtp}
                                                        onChange={e => setEmailOtp(e.target.value)} />
                                                    <span style={{ background: '#fff', color: '#e95420', padding: '2px 8px', borderRadius: '4px', fontSize: '0.95em', display: 'inline-block', marginTop: '4px' }}>*Note: Any One OTP Is Mandatory To Proceed</span>
                                                </div>
                                                <div className="col-md-6">
                                                    <input className="form-control" type="number" placeholder="Enter Mobile OTP" value={mobileOtp}
                                                        onChange={e => setMobileOtp(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-center mt-3">
                                                <button className="purple-btn2 w-100" onClick={() => {
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
                    {currentStep === 1 && (
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
                                                    {supplierShowData?.city_id || "-"}
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
                                                    {supplierShowData?.department_id || "-"}
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
                                                    {supplierShowData?.contact_person_name || "-"}
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
                                                    options={organizationTypeOptions}
                                                    placeholder="Select Organization Type"
                                                    value={basicInfo.organizationType}
                                                    onChange={val => updateBasicInfo('organizationType', val)}
                                                />
                                                {basicInfoErrors.organizationType && (
                                                    <div className="ValidationColor">{basicInfoErrors.organizationType}</div>
                                                )}
                                            </div>
                                        </div>
                                        {/* {console.log("+++++++++++++", basicInfo.organizationType.label)} */}

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                {/* Label with Tooltip */}
                                                <label>
                                                    Nature of Business <span>*</span>
                                                    {/* <TooltipIcon message="Please choose your country from the list" /> */}
                                                </label>
                                                <SingleSelector
                                                    options={[{ label: 'Finance Vendor', value: 'finance_vendor' }]}
                                                    placeholder="Select Nature of Business"
                                                    // isDisabled={true}
                                                    value={basicInfo.natureOfBusiness}
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
                                                    options={[{ label: 'Import Supplier', value: 'import_supplier' }]}
                                                    placeholder="Select Vendor Type"
                                                    // isDisabled={true}
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
                                                <input
                                                    className="form-control"
                                                    type="number"
                                                    value={basicInfo.mobile}
                                                    onChange={e => updateBasicInfo('mobile', e.target.value)}
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
                                                />
                                                {basicInfoErrors.panNo && (
                                                    <div className="ValidationColor">{basicInfoErrors.panNo}</div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-md-4 mt-2">
                                            <div className="form-group">
                                                <label>
                                                    PAN Attachment <span>*</span>
                                                    <TooltipIcon message="Please attach a clear PDF of your organization's PAN certificate. This is required for identity and tax verification." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="file"
                                                    // onChange={e => {
                                                    //     updateBasicInfo('panAttachment', e.target.files[0]);
                                                    //     if (e.target.files[0]) {
                                                    //         setBasicInfoErrors(prev => ({ ...prev, panAttachment: undefined }));
                                                    //     }
                                                    // }}
                                                onChange={e => updateBasicInfo('panAttachment', e.target.files[0])}
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
                                                    options={[{ label: 'Domestic', value: 'domestic' }]}
                                                    value={basicInfo.schemaGroup}
                                                    onChange={val => updateBasicInfo('schemaGroup', val)}
                                                    placeholder="Select Schema Group"
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
                                                    value={basicInfo.dateOfIncorporation}
                                                    onChange={e => updateBasicInfo('dateOfIncorporation', e.target.value)}
                                                />
                                                {/* {basicInfoErrors.dateOfIncorporation && (
                                                    <div className="ValidationColor">{basicInfoErrors.dateOfIncorporation}</div>
                                                )} */}
                                            </div>
                                        </div>

                                        {(
                                            basicInfo.organizationType.label === 'Private Limited' || basicInfo.organizationType.label === 'Public Limited') && (
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
                                                                onChange={e => updateBasicInfo('cin', e.target.value)}
                                                            />
                                                            {basicInfoErrors.cin && (
                                                                <div className="ValidationColor">{basicInfoErrors.cin}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 mt-2">
                                                        <div className="form-group">
                                                            <label>
                                                                Corporate Identification Number Attachment  <span>*</span>
                                                                <TooltipIcon message="Upload the official document or certificate to verify the details you have submitted. The document must be uploaded in PDF format.\nCorporate Identification Number\u00A0Attachment." />
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="file"
                                                                accept="application/pdf"
                                                                onChange={e => updateBasicInfo('cinAttachment', e.target.files[0])}
                                                            />
                                                            {basicInfoErrors.cinAttachment && (
                                                                <div className="ValidationColor">{basicInfoErrors.cinAttachment}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </>
                                            )}

                                        {(
                                            basicInfo.organizationType.label === 'Limited Liability Partnership (LLP)') && (
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
                                                                onChange={e => updateBasicInfo('llp', e.target.value)}
                                                            />
                                                            {basicInfoErrors.llp && (
                                                                <div className="ValidationColor">{basicInfoErrors.llp}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 mt-2">
                                                        <div className="form-group">
                                                            <label>
                                                                LLP No. Attachment  <span>*</span>
                                                                <TooltipIcon message="Upload the official document or certificate to verify the details you have submitted. The document must be uploaded in PDF format.\nCorporate Identification Number\u00A0Attachment." />
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="file"
                                                                accept="application/pdf"
                                                                onChange={e => updateBasicInfo('llpAttachment', e.target.files[0])}
                                                            />
                                                            {basicInfoErrors.llpAttachment && (
                                                                <div className="ValidationColor">{basicInfoErrors.llpAttachment}</div>
                                                            )}
                                                        </div>
                                                    </div>
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

                                                    value={basicInfo.gstinClassification}
                                                    onChange={val => updateBasicInfo('gstinClassification', val)}
                                                    placeholder="Select Country"
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
                                                                onChange={e => updateBasicInfo('gstinNo', e.target.value)}
                                                            />
                                                            {basicInfoErrors.gstinNo && (
                                                                <div className="ValidationColor">{basicInfoErrors.gstinNo}</div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="col-md-4 mt-2">
                                                        <div className="form-group">
                                                            <label>
                                                                GSTIN Attachment <span>*</span>
                                                                <TooltipIcon message="Upload a digital copy of the official GSTIN certificate or document showing your GST registration number. Ensure the document is legible and valid." />
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="file"
                                                                onChange={e => updateBasicInfo('gstinAttachment', e.target.files[0])}
                                                            />
                                                            {basicInfoErrors.gstinAttachment && (
                                                                <div className="ValidationColor">{basicInfoErrors.gstinAttachment}</div>
                                                            )}
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
                                                                {/* <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." /> */}
                                                            </label>


                                                            <span className="ms-2">
                                                                <a
                                                                    // href={`${baseURL}${bankDetail.attachment}`} // Ensure URL is correct
                                                                    download // Forces file download
                                                                    className="text-primary d-flex align-items-center"
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
                                                                </a>
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-4 mt-2">
                                                        <div className="form-group">
                                                            <label>
                                                                Upload GSTIN Declaration  <span>*</span>
                                                                {/* <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." /> */}
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="file"
                                                                onChange={e => updateBasicInfo('gstinDeclaration', e.target.files[0])}
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
                                                    // data-bs-toggle="tooltip"
                                                    // data-bs-placement="top"
                                                    // title={tooltipMessages.MSMEUdyamNumber}
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
                                                    <label
                                                    // data-bs-toggle="tooltip"
                                                    // data-bs-placement="top"
                                                    // title={tooltipMessages.MSMEEnterpriseType}
                                                    >
                                                        Classifiction Year <span>*</span>
                                                    </label>
                                                    {/* <select
                          // onChange={(e) =>
                          //   setClassificationYear(e.target.value)
                          // }
                          onChange={handleClassificationYearChange}
                          className="form-control"
                          value={classificationYear}
                        >
                          <option value="">Select Option</option>
                          <option value="2021-22">2021-22</option>
                          <option value="2022-23">2022-23</option>
                          <option value="2023-24">2023-24</option>
                          <option value="2024-25">2024-25</option>
                        </select> */}
                                                    <SingleSelector
                                                        value={additionalDetails.classificationYear}
                                                        onChange={val => updateAdditionalDetails('classificationYear', val)}
                                                        options={optionsClassificationYear}
                                                        className="form-control"
                                                        placeholder="Select Classification Year"
                                                    />

                                                    {/* {errors.msmeEnterpriseType && (
                          <div className="ValidationColor">
                            {errors.msmeEnterpriseType}
                          </div>
                        )}{" "} */}
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
                                                    <label
                                                    // data-bs-toggle="tooltip"
                                                    // data-bs-placement="top"
                                                    // title={tooltipMessages.MSMEEnterpriseType}
                                                    >
                                                        Major Activity <span>*</span>
                                                    </label>
                                                    {/* <select
                          // className="form-control"
                          // value={supplierData?.msme_details?.enterprise}

                          onChange={(e) => setMajorActivity(e.target.value)}
                          className="form-control"
                          value={majorActivity}
                        >
                          <option value="">select option</option>
                          <option value="services">Services</option>
                          <option value="trader">Trader</option>
                          <option value="manufacture">manufacture</option>
                          <option value="others">Others</option>
                        </select> */}
                                                    {/* {errors.msmeEnterpriseType && (
                          <div className="ValidationColor">
                            {errors.msmeEnterpriseType}
                          </div>
                        )}{" "}
                        {/* Show error */}

                                                    <SingleSelector
                                                        value={additionalDetails.majorActivity}
                                                        onChange={val => updateAdditionalDetails('majorActivity', val)}
                                                        options={optionsMajorActivity}
                                                        className="form-control"
                                                        placeholder="Select Major Activity"
                                                    />
                                                    {console.log("majorActivity", majorActivity)}

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
                                                    <label
                                                    // data-bs-toggle="tooltip"
                                                    // data-bs-placement="top"
                                                    // title={tooltipMessages.MSMEUdyamValidFrom}
                                                    >
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
                                                    <label
                                                    // data-bs-toggle="tooltip"
                                                    // data-bs-placement="top"
                                                    // title={tooltipMessages.MSMEUdyamValidTill}
                                                    >
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
                                                    <label
                                                    // data-bs-toggle="tooltip"
                                                    // data-bs-placement="top"
                                                    // title={tooltipMessages.MSMEEnterpriseType}
                                                    >
                                                        MSME Enterprise Type <span>*</span>
                                                        <TooltipIcon message="Select the type of your organization under the MSME (Micro, Small, and Medium Enterprises) scheme. Choose from 'Micro,'Small,' or 'Medium' based on your organization's annual turnover and investment in plant and machinery." />
                                                    </label>
                                                    {/* <select
                          // className="form-control"
                          // value={supplierData?.msme_details?.enterprise}

                          onChange={handleMsmeEnterpriseChange} // Handle value change
                          className="form-control"
                          value={msmeEnterpriseType}
                        >
                          <option value="">select option</option>
                          <option value="Micro">Micro</option>
                          <option value="Small">Small</option>
                          <option value="Medium">Medium</option>
                          <option value="Not_applicable">Not Applicable</option>
                        </select> */}
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
                                                </div>
                                            </div>
                                        )}
                                        {/* MSME/Udyam Attachment */}
                                        {additionalDetails.msmeUdyamApplicable?.value === "Yes" && (
                                            <div className="col-md-4 mt-2">
                                                <div className="form-group">
                                                    <label
                                                    // data-bs-toggle="tooltip"
                                                    // data-bs-placement="top"
                                                    // title={tooltipMessages.MSMEUdyamAttachment}
                                                    >
                                                        MSME/Udyam Attachment <span>*</span>
                                                        <TooltipIcon message="Attach a clear, scanned copy or digital image of your MSME/Udyam registration certificate to verify your organization's classification under the MSME scheme. The document must be uploaded in PDF format." />
                                                    </label>

                                                    {supplierData?.msme_details?.msme_attachments?.length >
                                                        0 && (
                                                            <span className="ms-2">
                                                                <a
                                                                    href={`${baseURL}${supplierData?.msme_details?.msme_attachments[0]?.file_url}`} // Append base URL
                                                                    download // Ensure it prompts download
                                                                    className="text-primary d-flex align-items-center"
                                                                >
                                                                    <span className="me-2">Existing Files:</span>
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

                                                                    {supplierData?.msme_details?.msme_attachments
                                                                        ?.length > 0
                                                                        ? // Display the document name of the first attachment
                                                                        supplierData?.msme_details
                                                                            ?.msme_attachments[0]?.document_name
                                                                        : // If no attachment is present, show a default message
                                                                        "No Document Available"}
                                                                </a>
                                                            </span>
                                                        )}
                                                    {/* <input className="form-control" type="file" name="" onChange={handleFileChange} /> */}
                                                    <input
                                                        className="form-control mt-2"
                                                        type="file"
                                                        onChange={e => updateAdditionalDetails('msmeAttachment', e.target.files[0])}
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
                                                        // data-bs-toggle="tooltip"
                                                        // data-bs-placement="top"
                                                        // title={tooltipMessages.DownloadSpecimen}
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
                                                                Specimen For No Msme.pdf
                                                            </span>
                                                        </a>
                                                    </div>
                                                </div>
                                            )}

                                            {additionalDetails.msmeUdyamApplicable?.value === "No" && (
                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">
                                                        <label>
                                                            Upload Declaration <span>*</span>
                                                        </label>
                                                        <TooltipIcon message="If you choose E-Invoice applicable 'No', please upload a signed declaration document to verify the details you have submitted. The document must be uploaded in PDF format.Ensure that the document is clear, legible, and properly signed." />
                                                        <input
                                                            className="form-control"
                                                            type="file"
                                                            accept=".pdf"
                                                            name=""
                                                            onChange={e => updateAdditionalDetails('msmeDeclaration', e.target.files[0])}
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
                                                        // data-bs-toggle="tooltip"
                                                        // data-bs-placement="top"
                                                        // title={tooltipMessages.DownloadSpecimen}
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
                                                                Specimen For No Msme.pdf
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
                                                        <input
                                                            className="form-control"
                                                            type="file"
                                                            accept=".pdf"
                                                            name=""
                                                            onChange={e => updateAdditionalDetails('einvoiceDeclaration', e.target.files[0])}
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
                        </div>
                    )}
                    {currentStep === 2 && (
                        <div className="card mx-4 pb-4 mt-4">
                            {/* Basic Information section here */}
                            {/* ...existing code for Basic Information... */}

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
                                                    onChange={e => handleRegisteredAddressChange('pincode', e.target.value)}
                                                />
                                                {addressErrors.registered.pincode && (
                                                    <div className="ValidationColor">{addressErrors.registered.pincode}</div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-md-4  mt-2">
                                            <div className="form-group">
                                                <label>
                                                    Telephone Phone No.
                                                    <TooltipIcon message="Enter your organization's primary telephone number, including the country code and area code (e.g., + 1-123-
4567890)." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    value={registeredAddress.telephone}
                                                    onChange={e => handleRegisteredAddressChange('telephone', e.target.value)}
                                                />

                                            </div>
                                        </div>
                                        <div className="col-md-4  mt-2">
                                            <div className="form-group">
                                                <label>
                                                    Mobile Number <span>*</span>
                                                    <TooltipIcon message="Please provide the full mobile number, including the country code. Ensure the number is correct and formatted properly.." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="number"
                                                    value={registeredAddress.mobile}
                                                    onChange={e => handleRegisteredAddressChange('mobile', e.target.value)}
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
                                                    onChange={e => handleRegisteredAddressChange('orderingEmail', e.target.value)}
                                                />
                                                {addressErrors.registered.orderingEmail && (
                                                    <div className="ValidationColor">{addressErrors.registered.orderingEmail}</div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-md-4  mt-2">
                                            <div className="form-group">
                                                <label>
                                                    Billing & Accounting Email ID
                                                    <TooltipIcon message="Enter the email address your organization uses for billing and accounting communications. Ensure it is a valid email format (e.g., example@domain.com)." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    value={registeredAddress.billingEmail}
                                                    onChange={e => handleRegisteredAddressChange('billingEmail', e.target.value)}
                                                />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

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
                                                    value={communicationAddress.address1}
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
                                                    value={communicationAddress.address2}
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
                                                    value={communicationAddress.address3}
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
                                                    value={communicationAddress.address4}
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
                                                    value={communicationAddress.address5}
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
                                                    onChange={e => handleCommunicationAddressChange('pincode', e.target.value)}
                                                    disabled={sameAsRegistered}
                                                />
                                                {addressErrors.communication.pincode && (
                                                    <div className="ValidationColor">{addressErrors.communication.pincode}</div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-md-4  mt-2">
                                            <div className="form-group">
                                                <label>
                                                    Telephone Phone No.
                                                    {/* <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." /> */}
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    value={communicationAddress.telephone}
                                                    onChange={e => handleCommunicationAddressChange('telephone', e.target.value)}
                                                    disabled={sameAsRegistered}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4  mt-2">
                                            <div className="form-group">
                                                <label>
                                                    Mobile Number <span>*</span>
                                                    {/* <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." /> */}
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    value={communicationAddress.mobile}
                                                    onChange={e => handleCommunicationAddressChange('mobile', e.target.value)}
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
                                                    onChange={e => handleCommunicationAddressChange('orderingEmail', e.target.value)}
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
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className="card mx-4 pb-4 mt-4">
                            {bankDetailsList?.map((bankDetail) => (
                                <CollapsedCardKYC
                                    key={bankDetail.id}
                                    title="Bank Details"
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

                                                        // Validate on change
                                                        if (newValue !== bankDetail.account_number) {
                                                            setErrors((prev) => ({
                                                                ...prev,
                                                                confirm_account_number:
                                                                    "Account numbers must match",
                                                            }));
                                                        } else {
                                                            setErrors((prev) => {
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

                                                {/* Conditionally Render Existing File Download Link */}
                                                {bankDetail?.attachment && (
                                                    <span className="ms-2">
                                                        <a
                                                            href={`${baseURL}${bankDetail.attachment}`} // Ensure URL is correct
                                                            download // Forces file download
                                                            className="text-primary d-flex align-items-center"
                                                        >
                                                            <span className="me-2">Existing File:</span>
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
                                                        </a>
                                                    </span>
                                                )}

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
                                <div className="col-md-2">
                                    <button className="purple-btn1" onClick={addBankDetails}>
                                        Add Bank Details
                                    </button>
                                </div>
                            </div>





                        </div>
                    )}



                    {currentStep === 4 && (
                        <div className="card mx-4 pb-4 mt-4">

                            {branchOffices.map((branch, idx) => (
                                // <div className="card mx-3 pb-4 mt-4" key={branch.id}>
                                <CollapsedCardKYC
                                    key={branch.id}
                                    title={`Branch Office${branchOffices.length > 1 ? ` (${idx + 1})` : ''}`}
                                    onDelete={() => deleteBranchOffice(branch.id)}
                                    showDelete={branchOffices.length > 1}
                                >
                                    <div className="card-body mt-0">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label>Address</label>
                                                    <input className="form-control" type="text" value={branch.address} onChange={e => handleBranchChange(idx, 'address', e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="col-md-4 ">
                                                <div className="form-group">
                                                    <label>Country<span>*</span></label>
                                                    <SingleSelector
                                                        options={countries}
                                                        value={countries.find(opt => opt.value === branch.country) || null}
                                                        onChange={selected => handleBranchChange(idx, 'country', selected?.value)}
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
                                                        value={states.find(opt => opt.value === branch.state) || null}
                                                        onChange={selected => handleBranchChange(idx, 'state', selected?.value)}
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
                                                    <input className="form-control" type="text" value={branch.pincode} onChange={e => handleBranchChange(idx, 'pincode', e.target.value)} />
                                                    {branchErrors[idx]?.pincode && (
                                                        <div className="ValidationColor">{branchErrors[idx].pincode}</div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-md-4 mt-2">
                                                <div className="form-group">
                                                    <label>Telephone Phone No.</label>
                                                    <input className="form-control" type="text" value={branch.telephone} onChange={e => handleBranchChange(idx, 'telephone', e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="col-md-4 mt-2">
                                                <div className="form-group">
                                                    <label>Mobile Number</label>
                                                    <input className="form-control" type="text" value={branch.mobile} onChange={e => handleBranchChange(idx, 'mobile', e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CollapsedCardKYC>
                                // </div>
                            ))}
                            <div className="row mt-2 ms-2 justify-content-start">
                                <div className="col-md-2">
                                    <button className="purple-btn1" onClick={e => { e.preventDefault(); addBranchOffice(); }}>
                                        Add Branch
                                    </button>
                                </div>
                            </div>


                            {contactPersons.map((person, idx) => (

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
                                                                                    options={[]}
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
                                                                                    value={person.primaryEmail}
                                                                                    onChange={(e) =>
                                                                                        handleContactPersonChange(idx, "primaryEmail", e.target.value)
                                                                                    }
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
                                                        value={person.secondaryEmail}
                                                        onChange={(e) =>
                                                            handleContactPersonChange(idx, "secondaryEmail", e.target.value)
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            {/* Primary Mobile */}
                                            <div className="col-md-4  mt-2">
                                                                            <div className="form-group">
                                                                                <label>
                                                                                    Primary Mobile No. <span>*</span>
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
                                                    <label>Secondary Mobile No.</label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={person.secondaryMobile}
                                                        onChange={(e) =>
                                                            handleContactPersonChange(idx, "secondaryMobile", e.target.value)
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            {/* Nationality */}
                                            <div className="col-md-4  mt-2">
                                                <div className="form-group">
                                                    <label>Nationality</label>
                                                    <SingleSelector
                                                        options={[]}
                                                        value={person.nationality}
                                                        onChange={(selected) =>
                                                            handleContactPersonChange(idx, "nationality", selected)
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            {/* Gender */}
                                            <div className="col-md-4  mt-2">
                                                <div className="form-group">
                                                    <label>Gender</label>
                                                    <SingleSelector
                                                        options={[]}
                                                        value={person.gender}
                                                        onChange={(selected) =>
                                                            handleContactPersonChange(idx, "gender", selected)
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
                                                </div>
                                            </div>
                                            {/* Attachment */}
                                            <div className="col-md-4  mt-2">
                                                <div className="form-group">
                                                    <label>Attachment</label>
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
                                <div className="col-md-2">
                                    <button
                                        className="purple-btn1"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            addContactPerson();
                                        }}
                                    >
                                        Add Contact Person
                                    </button>
                                </div>
                            </div>

                            {warehouses.map((warehouse, idx) => (
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
                                                    <label>Address</label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={warehouse.address}
                                                        onChange={e => handleWarehouseChange(idx, 'address', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4  ">
                                                                                                        <div className="form-group">
                                                                                                            <label>Country<span>*</span></label>
                                                                                                            <SingleSelector
                                                                                                                options={[]}
                                                                                                                value={warehouse.country}
                                                                                                                onChange={selected => handleWarehouseChange(idx, 'country', selected)}
                                                                                                            />
                                                                                                            {warehouseErrors[idx]?.country && (
                                                                                                                <div className="ValidationColor">{warehouseErrors[idx].country}</div>
                                                                                                            )}
                                                                                                        </div>
                                            </div>
                                            <div className="col-md-4  mt-2">
                                                                                                        <div className="form-group">
                                                                                                            <label>State <span>*</span></label>
                                                                                                            <SingleSelector
                                                                                                                options={[]}
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
                                            <div className="col-md-4  mt-2">
                                                <div className="form-group">
                                                    <label>Telephone Phone No.</label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={warehouse.telephone}
                                                        onChange={e => handleWarehouseChange(idx, 'telephone', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4  mt-2">
                                                <div className="form-group">
                                                    <label>Mobile Number</label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={warehouse.mobile}
                                                        onChange={e => handleWarehouseChange(idx, 'mobile', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4  mt-2">
                                                <div className="form-group">
                                                    <label>Attachment</label>
                                                    <input
                                                        className="form-control"
                                                        type="file"
                                                        onChange={e => handleWarehouseChange(idx, 'attachment', e.target.files[0])}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CollapsedCardKYC>
                                // </div>
                            ))}
                            <div className="row mt-2 ms-2 justify-content-start">
                                <div className="col-md-3">
                                    <button className="purple-btn1" onClick={e => { e.preventDefault(); addWarehouse(); }}>
                                        Add Manufacturing Factory / Plant
                                    </button>
                                </div>
                            </div>


                            {owners.map((owner, idx) => (

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
                                                        options={[]}
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
                                                        options={[]}
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
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label>Mobile Number <span>*</span></label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={owner.mobile}
                                                        onChange={e => handleOwnerChange(idx, 'mobile', e.target.value)}
                                                    />
                                                    {ownerErrors[idx]?.mobile && (
                                                        <div className="ValidationColor">{ownerErrors[idx].mobile}</div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label>Attachment</label>
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
                                <div className="col-md-2">
                                    <button className="purple-btn1" onClick={e => { e.preventDefault(); addOwner(); }}>
                                        Add Director
                                    </button>
                                </div>
                            </div>


                            {relatedEmployees.map((employee, idx) => (
                                // <div className="card mx-3 pb-4 mt-4" key={employee.id}>
                                <CollapsedCardKYC
                                    key={employee.id}
                                    title={`Are you related to any employee of Panchshil ?${relatedEmployees.length > 1 ? ` ${idx + 1}` : ''}`}
                                    onDelete={() => deleteRelatedEmployee(employee.id)}
                                    showDelete={relatedEmployees.length > 1}
                                >
                                    <div className="card-body mt-0">
                                        <div className="row">
                                            <div className="col-md-4">
                                                                                <div className="form-group">
                                                                                    <label>First Name <span>*</span><TooltipIcon message="Enter the employee's first name." /></label>
                                                                                    <input
                                                                                        className="form-control"
                                                                                        type="text"
                                                                                        value={employee.firstName}
                                                                                        onChange={e => handleRelatedEmployeeChange(idx, 'firstName', e.target.value)}
                                                                                    />
                                                                                    {relatedEmployeeErrors[idx]?.firstName && (
                                                                                        <div className="ValidationColor">{relatedEmployeeErrors[idx].firstName}</div>
                                                                                    )}
                                                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                                                <div className="form-group">
                                                                                    <label>Last Name <span>*</span><TooltipIcon message="Enter the employee's last name." /></label>
                                                                                    <input
                                                                                        className="form-control"
                                                                                        type="text"
                                                                                        value={employee.lastName}
                                                                                        onChange={e => handleRelatedEmployeeChange(idx, 'lastName', e.target.value)}
                                                                                    />
                                                                                    {relatedEmployeeErrors[idx]?.lastName && (
                                                                                        <div className="ValidationColor">{relatedEmployeeErrors[idx].lastName}</div>
                                                                                    )}
                                                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                                                <div className="form-group">
                                                                                    <label>Employee Email Id <span>*</span><TooltipIcon message=" Enter the employee 's official email address" /></label>
                                                                                    <input
                                                                                        className="form-control"
                                                                                        type="text"
                                                                                        value={employee.email}
                                                                                        onChange={e => handleRelatedEmployeeChange(idx, 'email', e.target.value)}
                                                                                    />
                                                                                    {relatedEmployeeErrors[idx]?.email && (
                                                                                        <div className="ValidationColor">{relatedEmployeeErrors[idx].email}</div>
                                                                                    )}
                                                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label>Mobile Number <TooltipIcon message="Enter the employee's mobile number." /></label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={employee.mobile}
                                                        onChange={e => handleRelatedEmployeeChange(idx, 'mobile', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4  ">
                                                <div className="form-group">
                                                    <label>Designation <TooltipIcon message="Select the employee's designation from the list provided. This defines the employee's role within the organization." /></label>
                                                    <SingleSelector
                                                        options={[]}
                                                        value={employee.designation}
                                                        onChange={selected => handleRelatedEmployeeChange(idx, 'designation', selected)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4  ">
                                                <div className="form-group">
                                                    <label>Department <TooltipIcon message="Please choose the appropriate department from the list." /></label>
                                                    <SingleSelector
                                                        options={[]}
                                                        value={employee.department}
                                                        onChange={selected => handleRelatedEmployeeChange(idx, 'department', selected)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4  ">
                                                <div className="form-group">
                                                    <label>Relationship <TooltipIcon message="Choose the relationship type between the employee and the organization." /></label>
                                                    <SingleSelector
                                                        options={[]}
                                                        value={employee.relationship}
                                                        onChange={selected => handleRelatedEmployeeChange(idx, 'relationship', selected)}
                                                    />
                                                </div>
                                            </div>
                                            {/* Radio button group for Currently Working */}
                                            <div className="col-md-4 mb-3 mt-2">
                                                <div className="form-group mb-0">
                                                    <label className="mb-1">Currently Working </label>
                                                    <TooltipIcon message="Select Yes if the employee is currently working with the organization. Select No if the employee has left the organization." />
                                                    <div>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name={`currentlyWorking${employee.id}`} id={`currentlyWorkingYes${employee.id}`} value="yes" checked={employee.currentlyWorking === 'yes'} onChange={() => handleRelatedEmployeeChange(idx, 'currentlyWorking', 'yes')} />
                                                            <label className="form-check-label" htmlFor={`currentlyWorkingYes${employee.id}`}>Yes</label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name={`currentlyWorking${employee.id}`} id={`currentlyWorkingNo${employee.id}`} value="no" checked={employee.currentlyWorking === 'no'} onChange={() => handleRelatedEmployeeChange(idx, 'currentlyWorking', 'no')} />
                                                            <label className="form-check-label" htmlFor={`currentlyWorkingNo${employee.id}`}>No</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label>Attachment</label>
                                                    <input
                                                        className="form-control"
                                                        type="file"
                                                        onChange={e => handleRelatedEmployeeChange(idx, 'attachment', e.target.files[0])}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CollapsedCardKYC>
                                // </div>
                            ))}
                            <div className="row mt-2 ms-2 justify-content-start">
                                <div className="col-md-4">
                                    <button className="purple-btn1" onClick={e => { e.preventDefault(); addRelatedEmployee(); }}>
                                        Are you related to any employee of Panchshil ?
                                    </button>
                                </div>
                            </div>

                            {groupCompanies.map((company, idx) => (
                                // <div className="card mx-3 pb-4 mt-4" key={company.id}>
                                <CollapsedCardKYC
                                    key={company.id}
                                    title={`Sister Concern / Group Company${groupCompanies.length > 1 ? ` ${idx + 1}` : ''}`}
                                    onDelete={() => deleteGroupCompany(company.id)}
                                    showDelete={groupCompanies.length > 1}
                                >
                                    <div className="card-body mt-0">
                                        <div className="row">
                                            <div className="col-md-4">
                                                                                                                <div className="form-group">
                                                                                                                    <label>Name <span>*</span></label>
                                                                                                                    <input
                                                                                                                        className="form-control"
                                                                                                                        type="text"
                                                                                                                        value={company.name}
                                                                                                                        onChange={e => handleGroupCompanyChange(idx, 'name', e.target.value)}
                                                                                                                    />
                                                                                                                    {groupCompanyErrors[idx]?.name && (
                                                                                                                        <div className="ValidationColor">{groupCompanyErrors[idx].name}</div>
                                                                                                                    )}
                                                                                                                </div>
                                            </div>
                                            <div className="col-md-4  ">
                                                                                                                <div className="form-group">
                                                                                                                    <label>Nature Of Business <span>*</span></label>
                                                                                                                    <SingleSelector
                                                                                                                        options={[]}
                                                                                                                        value={company.natureOfBusiness}
                                                                                                                        onChange={selected => handleGroupCompanyChange(idx, 'natureOfBusiness', selected)}
                                                                                                                    />
                                                                                                                    {groupCompanyErrors[idx]?.natureOfBusiness && (
                                                                                                                        <div className="ValidationColor">{groupCompanyErrors[idx].natureOfBusiness}</div>
                                                                                                                    )}
                                                                                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                                                                                <div className="form-group">
                                                                                                                    <label>PAN No. <span>*</span></label>
                                                                                                                    <input
                                                                                                                        className="form-control"
                                                                                                                        type="text"
                                                                                                                        value={company.pan}
                                                                                                                        onChange={e => handleGroupCompanyChange(idx, 'pan', e.target.value)}
                                                                                                                    />
                                                                                                                    {groupCompanyErrors[idx]?.pan && (
                                                                                                                        <div className="ValidationColor">{groupCompanyErrors[idx].pan}</div>
                                                                                                                    )}
                                                                                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                                                                                <div className="form-group">
                                                                                                                    <label>GSTIN No. <span>*</span></label>
                                                                                                                    <input
                                                                                                                        className="form-control"
                                                                                                                        type="text"
                                                                                                                        value={company.gstin}
                                                                                                                        onChange={e => handleGroupCompanyChange(idx, 'gstin', e.target.value)}
                                                                                                                    />
                                                                                                                    {groupCompanyErrors[idx]?.gstin && (
                                                                                                                        <div className="ValidationColor">{groupCompanyErrors[idx].gstin}</div>
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
                                    <button className="purple-btn1" onClick={e => { e.preventDefault(); addGroupCompany(); }}>
                                        Add Concern / Group Company
                                    </button>
                                </div>
                            </div>



                            {supervisoryManpower.map((item, idx) => (
                                // <div className="card mx-3 pb-4 mt-4" key={item.id}>
                                <CollapsedCardKYC
                                    key={item.id}
                                    title={`Supervisory Manpower${supervisoryManpower.length > 1 ? ` ${idx + 1}` : ''}`}
                                    onDelete={() => deleteSupervisoryManpower(item.id)}
                                    showDelete={supervisoryManpower.length > 1}
                                >
                                    <div className="card-body mt-0">
                                        <div className="row">
                                            <div className="col-md-4">
                                                                                                                                                <div className="form-group">
                                                                                                                                                    <label>Supervisory Manpower Details <span>*</span></label>
                                                                                                                                                    <input
                                                                                                                                                        className="form-control"
                                                                                                                                                        type="text"
                                                                                                                                                        value={item.details}
                                                                                                                                                        onChange={e => handleSupervisoryManpowerChange(idx, 'details', e.target.value)}
                                                                                                                                                    />
                                                                                                                                                    {supervisoryManpowerErrors[idx]?.details && (
                                                                                                                                                        <div className="ValidationColor">{supervisoryManpowerErrors[idx].details}</div>
                                                                                                                                                    )}
                                                                                                                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                                                                                                                <div className="form-group">
                                                                                                                                                    <label>Total Numbers <span>*</span></label>
                                                                                                                                                    <input
                                                                                                                                                        className="form-control"
                                                                                                                                                        type="text"
                                                                                                                                                        value={item.totalNumbers}
                                                                                                                                                        onChange={e => handleSupervisoryManpowerChange(idx, 'totalNumbers', e.target.value)}
                                                                                                                                                    />
                                                                                                                                                    {supervisoryManpowerErrors[idx]?.totalNumbers && (
                                                                                                                                                        <div className="ValidationColor">{supervisoryManpowerErrors[idx].totalNumbers}</div>
                                                                                                                                                    )}
                                                                                                                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label>Remark</label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={item.remark}
                                                        onChange={e => handleSupervisoryManpowerChange(idx, 'remark', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label>Attachment</label>
                                                    <input
                                                        className="form-control"
                                                        type="file"
                                                        onChange={e => handleSupervisoryManpowerChange(idx, 'attachment', e.target.files[0])}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CollapsedCardKYC>
                                // </div>
                            ))}
                            <div className="row mt-2 ms-2 justify-content-start">
                                <div className="col-md-2">
                                    <button className="purple-btn1" onClick={e => { e.preventDefault(); addSupervisoryManpower(); }}>
                                        Add Supervisory
                                    </button>
                                </div>
                            </div>


                            {majorCustomers.map((customer, idx) => (
                                // <div className="card mx-3 pb-4 mt-4" key={customer.id}>
                                <CollapsedCardKYC
                                    key={customer.id}
                                    title={`Major Customer${majorCustomers.length > 1 ? ` ${idx + 1}` : ''}`}
                                    onDelete={() => deleteMajorCustomer(customer.id)}
                                    showDelete={majorCustomers.length > 1}
                                >
                                    <div className="card-body mt-0">
                                        <div className="row">
                                            <div className="col-md-4">
                                                                                                                                                                                <div className="form-group">
                                                                                                                                                                                    <label>Company Name <span>*</span></label>
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
                                                                                                                                                                                    <label>Work Done <span>*</span></label>
                                                                                                                                                                                    <input
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
                                            <div className="col-md-4  ">
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
                                            </div>
                                            <div className="col-md-4  ">
                                                                                                                                                                                <div className="form-group">
                                                                                                                                                                                    <label>Country <span>*</span></label>
                                                                                                                                                                                    <SingleSelector
                                                                                                                                                                                        options={[]}
                                                                                                                                                                                        value={customer.country}
                                                                                                                                                                                        onChange={selected => handleMajorCustomerChange(idx, 'country', selected)}
                                                                                                                                                                                    />
                                                                                                                                                                                    {majorCustomerErrors[idx]?.country && (
                                                                                                                                                                                        <div className="ValidationColor">{majorCustomerErrors[idx].country}</div>
                                                                                                                                                                                    )}
                                                                                                                                                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label>Phone No.</label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={customer.phone}
                                                        onChange={e => handleMajorCustomerChange(idx, 'phone', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                                                                                                                                                <div className="form-group">
                                                                                                                                                                                    <label>Mobile No. <span>*</span></label>
                                                                                                                                                                                    <input
                                                                                                                                                                                        className="form-control"
                                                                                                                                                                                        type="text"
                                                                                                                                                                                        value={customer.mobile}
                                                                                                                                                                                        onChange={e => handleMajorCustomerChange(idx, 'mobile', e.target.value)}
                                                                                                                                                                                    />
                                                                                                                                                                                    {majorCustomerErrors[idx]?.mobile && (
                                                                                                                                                                                        <div className="ValidationColor">{majorCustomerErrors[idx].mobile}</div>
                                                                                                                                                                                    )}
                                                                                                                                                                                </div>
                                            </div>
                                            <div className="col-md-4">
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
                                            </div>
                                            <div className="col-md-4">
                                                                                                                                                                                <div className="form-group">
                                                                                                                                                                                    <label>Business done in Last 12 month in lacs <span>*</span></label>
                                                                                                                                                                                    <input
                                                                                                                                                                                        className="form-control"
                                                                                                                                                                                        type="text"
                                                                                                                                                                                        value={customer.businessLast12Months}
                                                                                                                                                                                        onChange={e => handleMajorCustomerChange(idx, 'businessLast12Months', e.target.value)}
                                                                                                                                                                                    />
                                                                                                                                                                                    {majorCustomerErrors[idx]?.businessLast12Months && (
                                                                                                                                                                                        <div className="ValidationColor">{majorCustomerErrors[idx].businessLast12Months}</div>
                                                                                                                                                                                    )}
                                                                                                                                                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                                                                                                                                                <div className="form-group">
                                                                                                                                                                                    <label>Service Provided From <span>*</span></label>
                                                                                                                                                                                    <input
                                                                                                                                                                                        className="form-control"
                                                                                                                                                                                        type="date"
                                                                                                                                                                                        value={customer.serviceFrom}
                                                                                                                                                                                        onChange={e => handleMajorCustomerChange(idx, 'serviceFrom', e.target.value)}
                                                                                                                                                                                    />
                                                                                                                                                                                    {majorCustomerErrors[idx]?.serviceFrom && (
                                                                                                                                                                                        <div className="ValidationColor">{majorCustomerErrors[idx].serviceFrom}</div>
                                                                                                                                                                                    )}
                                                                                                                                                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                                                                                                                                                <div className="form-group">
                                                                                                                                                                                    <label>Service Provided To <span>*</span></label>
                                                                                                                                                                                    <input
                                                                                                                                                                                        className="form-control"
                                                                                                                                                                                        type="date"
                                                                                                                                                                                        value={customer.serviceTo}
                                                                                                                                                                                        onChange={e => handleMajorCustomerChange(idx, 'serviceTo', e.target.value)}
                                                                                                                                                                                    />
                                                                                                                                                                                    {majorCustomerErrors[idx]?.serviceTo && (
                                                                                                                                                                                        <div className="ValidationColor">{majorCustomerErrors[idx].serviceTo}</div>
                                                                                                                                                                                    )}
                                                                                                                                                                                </div>
                                            </div>
                                            <div className="col-md-4">
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
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label>Major Competitors</label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={customer.majorCompetitors}
                                                        onChange={e => handleMajorCustomerChange(idx, 'majorCompetitors', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label>Attachment</label>
                                                    <input
                                                        className="form-control"
                                                        type="file"
                                                        onChange={e => handleMajorCustomerChange(idx, 'attachment', e.target.files[0])}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CollapsedCardKYC>
                                // </div>
                            ))}
                            <div className="row mt-2 ms-2 justify-content-start">
                                <div className="col-md-2">
                                    <button className="purple-btn1" onClick={e => { e.preventDefault(); addMajorCustomer(); }}>
                                        Add Client References
                                    </button>
                                </div>
                            </div>

                            {workingSites.map((site, idx) => (
                                // <div className="card mx-3 pb-4 mt-4" key={site.id}>
                                <CollapsedCardKYC
                                    key={site.id}
                                    title={`Working Site${workingSites.length > 1 ? ` ${idx + 1}` : ''}`}
                                    onDelete={() => deleteWorkingSite(site.id)}
                                    showDelete={workingSites.length > 1}
                                >
                                    <div className="card-body mt-0">
                                        <div className="row">
                                            <div className="col-md-4">
                                                                                                                                                                                                            <div className="form-group">
                                                                                                                                                                                                                <label>Builder / Client Name <span>*</span></label>
                                                                                                                                                                                                                <input
                                                                                                                                                                                                                    className="form-control"
                                                                                                                                                                                                                    type="text"
                                                                                                                                                                                                                    value={site.builderName}
                                                                                                                                                                                                                    onChange={e => handleWorkingSiteChange(idx, 'builderName', e.target.value)}
                                                                                                                                                                                                                />
                                                                                                                                                                                                                {workingSiteErrors[idx]?.builderName && (
                                                                                                                                                                                                                    <div className="ValidationColor">{workingSiteErrors[idx].builderName}</div>
                                                                                                                                                                                                                )}
                                                                                                                                                                                                            </div>
                                            </div>
                                            <div className="col-md-4">
                                                                                                                                                                                                            <div className="form-group">
                                                                                                                                                                                                                <label>Brief Details <span>*</span></label>
                                                                                                                                                                                                                <input
                                                                                                                                                                                                                    className="form-control"
                                                                                                                                                                                                                    type="text"
                                                                                                                                                                                                                    value={site.briefDetails}
                                                                                                                                                                                                                    onChange={e => handleWorkingSiteChange(idx, 'briefDetails', e.target.value)}
                                                                                                                                                                                                                />
                                                                                                                                                                                                                {workingSiteErrors[idx]?.briefDetails && (
                                                                                                                                                                                                                    <div className="ValidationColor">{workingSiteErrors[idx].briefDetails}</div>
                                                                                                                                                                                                                )}
                                                                                                                                                                                                            </div>
                                            </div>
                                            <div className="col-md-4">
                                                                                                                                                                                                            <div className="form-group">
                                                                                                                                                                                                                <label>Area (Sq ft.) <span>*</span></label>
                                                                                                                                                                                                                <input
                                                                                                                                                                                                                    className="form-control"
                                                                                                                                                                                                                    type="text"
                                                                                                                                                                                                                    value={site.area}
                                                                                                                                                                                                                    onChange={e => handleWorkingSiteChange(idx, 'area', e.target.value)}
                                                                                                                                                                                                                />
                                                                                                                                                                                                                {workingSiteErrors[idx]?.area && (
                                                                                                                                                                                                                    <div className="ValidationColor">{workingSiteErrors[idx].area}</div>
                                                                                                                                                                                                                )}
                                                                                                                                                                                                            </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label>Manpower employed at Site</label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={site.manpower}
                                                        onChange={e => handleWorkingSiteChange(idx, 'manpower', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label>Stage Of Project</label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={site.stageOfProject}
                                                        onChange={e => handleWorkingSiteChange(idx, 'stageOfProject', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label>Likely Compl. Date</label>
                                                    <input
                                                        className="form-control"
                                                        type="date"
                                                        value={site.likelyCompletion}
                                                        onChange={e => handleWorkingSiteChange(idx, 'likelyCompletion', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label>Attachment</label>
                                                    <input
                                                        className="form-control"
                                                        type="file"
                                                        onChange={e => handleWorkingSiteChange(idx, 'attachment', e.target.files[0])}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CollapsedCardKYC>
                                // </div>
                            ))}
                            <div className="row mt-2 ms-2 justify-content-start">
                                <div className="col-md-2">
                                    <button className="purple-btn1" onClick={e => { e.preventDefault(); addWorkingSite(); }}>
                                        Add Working Site
                                    </button>
                                </div>
                            </div>


                                                        <div className="row mb-3 mx-2 mt-4">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Product & Services </label>
                                        <MultiSelector
                                            options={[]}
                                            // value={selectedProductServices || []}
                                            // onChange={handleProductServicesChange}
                                            placeholder="Select Product & Services"
                                        />
                                    </div>
                                </div>
                            </div>
  {/* Turnover Table */}
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
                                            <tr>
                                                <td>2024-2025</td>
                                                <td>
                                                    <input className="form-control" type="number" placeholder="Enter Turnover" name="turnover_2024_2025" />
                                                </td>
                                                <td>
                                                    <input className="form-control" type="file" name="attachment_2024_2025" />
                                                </td>
                                                <td>
                                                    <input className="form-control" type="text" placeholder="Enter Key Markets" name="markets_2024_2025" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>2023-2024</td>
                                                <td>
                                                    <input className="form-control" type="number" placeholder="Enter Turnover" name="turnover_2023_2024" />
                                                </td>
                                                <td>
                                                    <input className="form-control" type="file" name="attachment_2023_2024" />
                                                </td>
                                                <td>
                                                    <input className="form-control" type="text" placeholder="Enter Key Markets" name="markets_2023_2024" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>2022-2023</td>
                                                <td>
                                                    <input className="form-control" type="number" placeholder="Enter Turnover" name="turnover_2022_2023" />
                                                </td>
                                                <td>
                                                    <input className="form-control" type="file" name="attachment_2022_2023" />
                                                </td>
                                                <td>
                                                    <input className="form-control" type="text" placeholder="Enter Key Markets" name="markets_2022_2023" />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>


                        </div>
                    )}



                    {currentStep === 5 && (
                        <div className="card mx-4 pb-4 mt-4">
                            <div className="row mt-4 mx-2">
                                <div className="col-md-12">
                                    <h5 className="mb-3">Additional Vendor Statutory Details
                                        <TooltipIcon message="If not applicable then keep The field blank Additional Vendor Statutory Details." />
                                    </h5>
                                </div>



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
                                                    <label className="mb-0">Attachment</label>
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


                            <div className="row mt-5 mx-2">
                                <div className="col-md-12">
                                    <h5 className="mb-3">Other Statutory Details</h5>
                                </div>



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
                                                    <label className="mb-0">Attachment</label>
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

                            <div className="mb-3 mx-3 mt-5">
                                <h5 className="mb-3">Questions</h5>
                                <div className="row mb-3">
                                    <div className="col-md-12 mb-3">
                                        <label>Mention about your company expertise, briefly</label>
                                        <textarea className="form-control" rows="3" placeholder="Describe your company expertise"></textarea>
                                    </div>

                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-4 offset-md-8 mb-3">
                                        <input className="form-control" type="file" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-12 mb-3">
                                        <label>What is the organization and structure of the company / firm?</label>
                                        <textarea className="form-control" rows="3" placeholder="Describe the organization and structure"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}





                    {currentStep === 6 && (
                        <div className="card mx-4 pb-4 mt-4">
                            <div className="card mx-3 pb-4 mt-4">
                                <div className="card-header3">
                                    <h3 className="card-title">Financial Pre-Qualification </h3>
                                </div>
                                <div className="card-body mt-0">


                                    <div className="tbl-container mt-3 ">
                                        <table className=" w-100">
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
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>

                            <div className="card mx-3 pb-4 mt-4">
                                <div className="card-header3">
                                    <h3 className="card-title">Technical Pre-Qualification</h3>
                                </div>
                                <div className="card-body mt-0">


                                    <div className="tbl-container mt-3 ">
                                        <table className=" w-100">
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
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )}


                    {currentStep === 7 && (
                        <>

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
                                                    {supplierShowData?.city_id || "-"}
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
                                                    {supplierShowData?.department_id || "-"}
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
                                                    {supplierShowData?.contact_person_name || "-"}
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
                                                    onChange={() => {}}
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
                                                    onChange={() => {}}
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
                                                    onChange={() => {}}
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
                                                    onChange={() => {}}
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
                                                <input
                                                    className="form-control"
                                                    type="file"
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
                                                    onChange={() => {}}
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
                                        {(basicInfo.organizationType.label === 'Private Limited' || basicInfo.organizationType.label === 'Public Limited') && (
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
                                                        <input
                                                            className="form-control"
                                                            type="file"
                                                            accept="application/pdf"
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                        {(basicInfo.organizationType.label === 'Limited Liability Partnership (LLP)') && (
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
                                                        <input
                                                            className="form-control"
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
                                                    onChange={() => {}}
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
                                                    onChange={() => {}}
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
                                                            <input
                                                                className="form-control"
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
                                                            <input
                                                                className="form-control"
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
                            
                            {/* Step 2: Additional Details Card (readonly) */}
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
                                    value={additionalDetails.deliveryLeadPeriod || ''}
                                    disabled
                                    readOnly
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
                                    value={additionalDetails.warrantyPeriod || ''}
                                    disabled
                                    readOnly
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
                                    options={[]}
                                    value={additionalDetails.amcProvided}
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
                                    value={additionalDetails.website || ''}
                                    disabled
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="col-md-4  mt-2">
                            <div className="form-group">
                                <label>
                                    Currency Type <span>*</span>
                                </label>
                                <SingleSelector
                                    options={[{ label: 'INR', value: 'inr' }]}
                                    placeholder="Select Currency Type"
                                    value={additionalDetails.currencyType}
                                    isDisabled={true}
                                />
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
                                    options={options}
                                    className="form-control"
                                    placeholder="Select MSME/Udyam Number Applicable"
                                    isDisabled={true}
                                />
                            </div>
                        </div>
                        {additionalDetails.msmeUdyamApplicable?.value === "Yes" && (
                            <>
                                <div className="col-md-4 mt-2">
                                    <div className="form-group">
                                        <label>
                                            MSME/Udyam Number <span>*</span>
                                            <TooltipIcon message="Enter your organization's valid MSME or Udyam registration number. This number is issued by the Ministry of Micro, Small, and Medium Enterprises (MSME) under the Udyam registration scheme" />
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={additionalDetails.msmeNo || ''}
                                            disabled
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4 mt-2">
                                    <div className="form-group">
                                        <label>Classifiction Year <span>*</span></label>
                                        <SingleSelector
                                            value={additionalDetails.classificationYear}
                                            options={optionsClassificationYear}
                                            className="form-control"
                                            placeholder="Select Classification Year"
                                            isDisabled={true}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4 mt-2">
                                    <div className="form-group">
                                        <label>Major Activity <span>*</span></label>
                                        <SingleSelector
                                            value={additionalDetails.majorActivity}
                                            options={optionsMajorActivity}
                                            className="form-control"
                                            placeholder="Select Major Activity"
                                            isDisabled={true}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4 mt-2">
                                    <div className="form-group">
                                        <label>MSME/Udyam Valid From <span>*</span>
                                            <TooltipIcon message="Enter the date when your MSME/Udyam registration became valid. This is the start date mentioned on your MSME/Udyam registration certificate for the financial year." />
                                        </label>
                                        <input
                                            className="form-control"
                                            type="date"
                                            value={additionalDetails.validFrom || ''}
                                            disabled
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4 mt-2">
                                    <div className="form-group">
                                        <label>MSME/Udyam Valid Till <span>*</span>
                                            <TooltipIcon message="Enter the date when your MSME/Udyam registration became valid. This is the end date mentioned on your MSME/Udyam registration certificate for the financial year." />
                                        </label>
                                        <input
                                            className="form-control"
                                            type="date"
                                            value={additionalDetails.validTill || ''}
                                            disabled
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4 mt-2">
                                    <div className="form-group">
                                        <label>MSME Enterprise Type <span>*</span>
                                            <TooltipIcon message="Select the type of your organization under the MSME (Micro, Small, and Medium Enterprises) scheme. Choose from 'Micro,'Small,' or 'Medium' based on your organization's annual turnover and investment in plant and machinery." />
                                        </label>
                                        <SingleSelector
                                            value={additionalDetails.msmeEnterpriseType}
                                            options={optionsEnterPrise}
                                            className="form-control"
                                            placeholder="Select option..."
                                            isDisabled={true}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4 mt-2">
                                    <div className="form-group">
                                        <label>Download Specimen <span>*</span></label>
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
                                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                            </svg>
                                            <span className="mt-2 ms-2">Specimen For Yes Msme.pdf</span>
                                        </a>
                                    </div>
                                </div>
                            </>
                        )}
                        {additionalDetails.msmeUdyamApplicable?.value === "No" && (
                            <>
                                <div className="col-md-4 mt-2 ms-3">
                                    <div className="form-group">
                                        <label>Download Specimen <span>*</span></label>
                                        <TooltipIcon message="If you choose 'No' for e-invoicing, a specimen format will be available for download. This is for businesses not subject to e-invoicing under GST regulations. Please upload a signed declaration stating that your organization is not registered.The document must be uploaded in PDF format" />
                                        <a
                                            download="Specimen_E-Invoicing_Declaration.docx"
                                            className="text-primary d-flex align-items-center"
                                            href={`${baseURL}/assets/NO_%20MSME.pdf`}
                                            target="_self"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={24}
                                                height={24}
                                                fill="#DE7008"
                                                className="bi bi-download"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" style={{ fill: "#de7008!important" }} />
                                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" style={{ fill: "#de7008!important" }} />
                                            </svg>
                                            <span className="mt-2 ms-2">Specimen For No Msme.pdf</span>
                                        </a>
                                    </div>
                                </div>
                            </>
                        )}
                        {basicInfo.gstinApplicable?.label === 'Yes' && (
                            <div className="col-md-4 mt-2">
                                <div className="form-group">
                                    <label>
                                        E-invoicing Applicable  <span>*</span>
                                    </label>
                                    <SingleSelector
                                        value={additionalDetails.einvoice}
                                        options={options}
                                        className="form-control"
                                        placeholder="Selec E-invoicing Applicable ."
                                        isDisabled={true}
                                    />
                                </div>
                            </div>
                        )}
                        {additionalDetails.einvoice?.value === "No" && (
                            <>
                                <div className="col-md-4 mt-2 ms-3">
                                    <div className="form-group">
                                        <label>Download Specimen <span>*</span></label>
                                        <TooltipIcon message="If you choose 'No' for e-invoicing, a specimen format will be available for download. This is for businesses not subject to e-invoicing under GST regulations. Please upload a signed declaration stating that your organization is not registered.The document must be uploaded in PDF format" />
                                        <a
                                            download="Specimen_E-Invoicing_Declaration.docx"
                                            className="text-primary d-flex align-items-center"
                                            href={`${baseURL}/assets/NO_%20MSME.pdf`}
                                            target="_self"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={24}
                                                height={24}
                                                fill="#DE7008"
                                                className="bi bi-download"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" style={{ fill: "#de7008!important" }} />
                                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" style={{ fill: "#de7008!important" }} />
                                            </svg>
                                            <span className="mt-2 ms-2">Specimen For No Msme.pdf</span>
                                        </a>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>


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
                                    Telephone Phone No.
                                    <TooltipIcon message="Enter your organization's primary telephone number, including the country code and area code (e.g., + 1-123-4567890)." />
                                </label>
                                <input className="form-control" type="text" value={registeredAddress.telephone || ''} disabled readOnly />
                            </div>
                        </div>
                        <div className="col-md-4 mt-2">
                            <div className="form-group">
                                <label>
                                    Mobile Number <span>*</span>
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
                                    Telephone Phone No.
                                </label>
                                <input className="form-control" type="text" value={communicationAddress.telephone || ''} disabled readOnly />
                            </div>
                        </div>
                        <div className="col-md-4 mt-2">
                            <div className="form-group">
                                <label>
                                    Mobile Number <span>*</span>
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


 {/* <div className="card mx-4 pb-4 mt-4"> */}
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
                                    <label>
                                        Cancelled Cheque / Bank Copy <span>*</span>
                                        <TooltipIcon message="Provide a cancelled cheque or a bank statement copy that clearly displays your bank account details.This helps verify your account information. The document must be uploaded in PDF format" />
                                    </label>
                                    {bankDetail?.attachment && (
                                        <span className="ms-2">
                                            <a
                                                href={`${baseURL}${bankDetail.attachment}`}
                                                download
                                                className="text-primary d-flex align-items-center"
                                            >
                                                <span className="me-2">Existing File:</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="#DE7008" className="bi bi-download" viewBox="0 0 16 16">
                                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                                </svg>
                                            </a>
                                        </span>
                                    )}
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
            {/* </div> */}




 
                {branchOffices.map((branch, idx) => (
                    <CollapsedCardKYC
                        key={branch.id}
                        title={`Branch Office${branchOffices.length > 1 ? ` (${idx + 1})` : ''}`}
                    >
                        <div className="card-body mt-0">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>Address</label>
                                        <input className="form-control" type="text" value={branch.address || ''} disabled readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4 ">
                                    <div className="form-group">
                                        <label>Country<span>*</span></label>
                                        <SingleSelector options={countries} value={countries.find(opt => opt.value === branch.country) || null} isDisabled={true} />
                                    </div>
                                </div>
                                <div className="col-md-4 ">
                                    <div className="form-group">
                                        <label>State <span>*</span></label>
                                        <SingleSelector options={states} value={states.find(opt => opt.value === branch.state) || null} isDisabled={true} />
                                    </div>
                                </div>
                                <div className="col-md-4 mt-2">
                                    <div className="form-group">
                                        <label>City <span>*</span></label>
                                        <input className="form-control" type="text" value={branch.city || ''} disabled readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4 mt-2">
                                    <div className="form-group">
                                        <label>Pin Code<span>*</span></label>
                                        <input className="form-control" type="text" value={branch.pincode || ''} disabled readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4 mt-2">
                                    <div className="form-group">
                                        <label>Telephone Phone No.</label>
                                        <input className="form-control" type="text" value={branch.telephone || ''} disabled readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4 mt-2">
                                    <div className="form-group">
                                        <label>Mobile Number</label>
                                        <input className="form-control" type="text" value={branch.mobile || ''} disabled readOnly />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CollapsedCardKYC>
                ))}
          
            
                {contactPersons.map((person, idx) => (
                    <CollapsedCardKYC
                        key={person.id}
                        title={`Contact Person${contactPersons.length > 1 ? ` ${idx + 1}` : ""}`}
                    >
                        <div className="card-body mt-0">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>Escalation Level<span>*</span></label>
                                        <SingleSelector options={[]} value={person.escalationLevel} isDisabled={true} />
                                    </div>
                                </div>
                                <div className="col-md-4 ">
                                    <div className="form-group">
                                        <label>Name Title <span>*</span></label>
                                        <SingleSelector options={[]} value={person.nameTitle} isDisabled={true} />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>First Name <span>*</span></label>
                                        <input className="form-control" type="text" value={person.firstName || ''} disabled readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4 mt-2">
                                    <div className="form-group">
                                        <label>Last Name<span>*</span></label>
                                        <input className="form-control" type="text" value={person.lastName || ''} disabled readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4  mt-2">
                                    <div className="form-group">
                                        <label>Designation<span>*</span></label>
                                        <SingleSelector options={[]} value={person.designation} isDisabled={true} />
                                    </div>
                                </div>
                                <div className="col-md-4  mt-2">
                                    <div className="form-group">
                                        <label>Primary Email ID <span>*</span></label>
                                        <input className="form-control" type="text" value={person.primaryEmail || ''} disabled readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4  mt-2">
                                    <div className="form-group">
                                        <label>Secondary Email ID</label>
                                        <input className="form-control" type="text" value={person.secondaryEmail || ''} disabled readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4  mt-2">
                                    <div className="form-group">
                                        <label>Primary Mobile No. <span>*</span></label>
                                        <input className="form-control" type="text" value={person.primaryMobile || ''} disabled readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4  mt-2">
                                    <div className="form-group">
                                        <label>Secondary Mobile No.</label>
                                        <input className="form-control" type="text" value={person.secondaryMobile || ''} disabled readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4  mt-2">
                                    <div className="form-group">
                                        <label>Nationality</label>
                                        <SingleSelector options={[]} value={person.nationality} isDisabled={true} />
                                    </div>
                                </div>
                                <div className="col-md-4  mt-2">
                                    <div className="form-group">
                                        <label>Gender</label>
                                        <SingleSelector options={[]} value={person.gender} isDisabled={true} />
                                    </div>
                                </div>
                                <div className="col-md-4  mt-2">
                                    <div className="form-group">
                                        <label>Date of Birth</label>
                                        <input className="form-control" type="date" value={person.dob || ''} disabled readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4  mt-2">
                                    <div className="form-group">
                                        <label>Attachment</label>
                                        {person.attachment && (
                                            <a href={typeof person.attachment === 'string' ? `${baseURL}${person.attachment}` : '#'} download className="text-primary d-flex align-items-center">
                                                <span className="me-2">Existing File</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CollapsedCardKYC>
                ))}
           


          
                {warehouses.map((warehouse, idx) => (
                    <CollapsedCardKYC
                        key={warehouse.id}
                        title={`Factory Warehouse${warehouses.length > 1 ? ` ${idx + 1}` : ''}`}
                    >
                        <div className="card-body mt-0">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>Address</label>
                                        <input className="form-control" type="text" value={warehouse.address || ''} disabled readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4  ">
                                    <div className="form-group">
                                        <label>Country<span>*</span></label>
                                        <SingleSelector options={[]} value={warehouse.country} isDisabled={true} />
                                    </div>
                                </div>
                                <div className="col-md-4  mt-2">
                                    <div className="form-group">
                                        <label>State <span>*</span></label>
                                        <SingleSelector options={[]} value={warehouse.state} isDisabled={true} />
                                    </div>
                                </div>
                                <div className="col-md-4  mt-2">
                                    <div className="form-group">
                                        <label>City <span>*</span></label>
                                        <input className="form-control" type="text" value={warehouse.city || ''} disabled readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4  mt-2">
                                    <div className="form-group">
                                        <label>Telephone Phone No.</label>
                                        <input className="form-control" type="text" value={warehouse.telephone || ''} disabled readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4  mt-2">
                                    <div className="form-group">
                                        <label>Mobile Number</label>
                                        <input className="form-control" type="text" value={warehouse.mobile || ''} disabled readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4  mt-2">
                                    <div className="form-group">
                                        <label>Attachment</label>
                                        {warehouse.attachment && (
                                            <a href={typeof warehouse.attachment === 'string' ? `${baseURL}${warehouse.attachment}` : '#'} download className="text-primary d-flex align-items-center">
                                                <span className="me-2">Existing File</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CollapsedCardKYC>
                ))}
            

             
                {owners.map((owner, idx) => (
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
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>Mobile Number <span>*</span></label>
                                        <input className="form-control" type="text" value={owner.mobile || ''} disabled readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>Attachment</label>
                                        {owner.attachment && (
                                            <a href={typeof owner.attachment === 'string' ? `${baseURL}${owner.attachment}` : '#'} download className="text-primary d-flex align-items-center">
                                                <span className="me-2">Existing File</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CollapsedCardKYC>
                ))}
            

            
                {relatedEmployees.map((employee, idx) => (
                    <CollapsedCardKYC
                        key={employee.id}
                        title={`Are you related to any employee of Panchshil ?${relatedEmployees.length > 1 ? ` ${idx + 1}` : ''}`}
                    >
                        <div className="card-body mt-0">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>First Name <span>*</span></label>
                                        <input className="form-control" type="text" value={employee.firstName || ''} disabled readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>Last Name <span>*</span></label>
                                        <input className="form-control" type="text" value={employee.lastName || ''} disabled readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>Employee Email Id <span>*</span></label>
                                        <input className="form-control" type="text" value={employee.email || ''} disabled readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>Mobile Number</label>
                                        <input className="form-control" type="text" value={employee.mobile || ''} disabled readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4  ">
                                    <div className="form-group">
                                        <label>Designation</label>
                                        <SingleSelector options={[]} value={employee.designation} isDisabled={true} />
                                    </div>
                                </div>
                                <div className="col-md-4  ">
                                    <div className="form-group">
                                        <label>Department</label>
                                        <SingleSelector options={[]} value={employee.department} isDisabled={true} />
                                    </div>
                                </div>
                                <div className="col-md-4  ">
                                    <div className="form-group">
                                        <label>Relationship</label>
                                        <SingleSelector options={[]} value={employee.relationship} isDisabled={true} />
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3 mt-2">
                                    <div className="form-group mb-0">
                                        <label className="mb-1">Currently Working </label>
                                        <div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name={`currentlyWorking${employee.id}`} id={`currentlyWorkingYes${employee.id}`} value="yes" checked={employee.currentlyWorking === 'yes'} disabled readOnly />
                                                <label className="form-check-label" htmlFor={`currentlyWorkingYes${employee.id}`}>Yes</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name={`currentlyWorking${employee.id}`} id={`currentlyWorkingNo${employee.id}`} value="no" checked={employee.currentlyWorking === 'no'} disabled readOnly />
                                                <label className="form-check-label" htmlFor={`currentlyWorkingNo${employee.id}`}>No</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>Attachment</label>
                                        {employee.attachment && (
                                            <a href={typeof employee.attachment === 'string' ? `${baseURL}${employee.attachment}` : '#'} download className="text-primary d-flex align-items-center">
                                                <span className="me-2">Existing File</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CollapsedCardKYC>
                ))}
            


                {groupCompanies.map((company, idx) => (
                    <CollapsedCardKYC
                        key={company.id}
                        title={`Sister Concern / Group Company${groupCompanies.length > 1 ? ` ${idx + 1}` : ''}`}
                    >
                        <div className="card-body mt-0">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>Name <span>*</span></label>
                                        <input className="form-control" type="text" value={company.name || ''} disabled readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4  ">
                                    <div className="form-group">
                                        <label>Nature Of Business <span>*</span></label>
                                        <SingleSelector options={[]} value={company.natureOfBusiness} isDisabled={true} />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>PAN No. <span>*</span></label>
                                        <input className="form-control" type="text" value={company.pan || ''} disabled readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>GSTIN No. <span>*</span></label>
                                        <input className="form-control" type="text" value={company.gstin || ''} disabled readOnly />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CollapsedCardKYC>
                ))}
           


            
                {supervisoryManpower.map((item, idx) => (
                    <CollapsedCardKYC
                        key={item.id}
                        title={`Supervisory Manpower${supervisoryManpower.length > 1 ? ` ${idx + 1}` : ''}`}
                    >
                        <div className="card-body mt-0">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>Supervisory Manpower Details <span>*</span></label>
                                        <input className="form-control" type="text" value={item.details || ''} disabled readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>Total Numbers <span>*</span></label>
                                        <input className="form-control" type="text" value={item.totalNumbers || ''} disabled readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>Remark</label>
                                        <input className="form-control" type="text" value={item.remark || ''} disabled readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>Attachment</label>
                                        {item.attachment && (
                                            <a href={typeof item.attachment === 'string' ? `${baseURL}${item.attachment}` : '#'} download className="text-primary d-flex align-items-center">
                                                <span className="me-2">Existing File</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CollapsedCardKYC>
                ))}
           

           
                {majorCustomers.map((customer, idx) => (
                    <CollapsedCardKYC
                        key={customer.id}
                        title={`Major Customer${majorCustomers.length > 1 ? ` ${idx + 1}` : ''}`}
                    >
                        <div className="card-body mt-0">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>Company Name <span>*</span></label>
                                        <input className="form-control" type="text" value={customer.companyName || ''} disabled readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>Work Done <span>*</span></label>
                                        <input className="form-control" type="text" value={customer.workDone || ''} disabled readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>Contact Person <span>*</span></label>
                                        <input className="form-control" type="text" value={customer.contactPerson || ''} disabled readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4  ">
                                    <div className="form-group">
                                        <label>Designation <span>*</span></label>
                                        <SingleSelector options={[]} value={customer.designation} isDisabled={true} />
                                    </div>
                                </div>
                                <div className="col-md-4  ">
                                    <div className="form-group">
                                        <label>Country <span>*</span></label>
                                        <SingleSelector options={[]} value={customer.country} isDisabled={true} />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>Phone No.</label>
                                        <input className="form-control" type="text" value={customer.phone || ''} disabled readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>Mobile No. <span>*</span></label>
                                        <input className="form-control" type="text" value={customer.mobile || ''} disabled readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>Year of Association <span>*</span></label>
                                        <input className="form-control" type="text" value={customer.yearOfAssociation || ''} disabled readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>Business done in Last 12 month in lacs <span>*</span></label>
                                        <input className="form-control" type="text" value={customer.businessLast12Months || ''} disabled readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>Service Provided From <span>*</span></label>
                                        <input className="form-control" type="date" value={customer.serviceFrom || ''} disabled readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>Service Provided To <span>*</span></label>
                                        <input className="form-control" type="date" value={customer.serviceTo || ''} disabled readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>Stage Of Project</label>
                                        <input className="form-control" type="text" value={customer.stageOfProject || ''} disabled readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>Major Competitors</label>
                                        <input className="form-control" type="text" value={customer.majorCompetitors || ''} disabled readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>Attachment</label>
                                        {customer.attachment && (
                                            <a href={typeof customer.attachment === 'string' ? `${baseURL}${customer.attachment}` : '#'} download className="text-primary d-flex align-items-center">
                                                <span className="me-2">Existing File</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CollapsedCardKYC>
                ))}
            


             
                {workingSites.map((site, idx) => (
                    <CollapsedCardKYC
                        key={site.id}
                        title={`Working Site${workingSites.length > 1 ? ` ${idx + 1}` : ''}`}
                    >
                        <div className="card-body mt-0">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>Builder / Client Name <span>*</span></label>
                                        <input className="form-control" type="text" value={site.builderName || ''} disabled readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>Brief Details <span>*</span></label>
                                        <input className="form-control" type="text" value={site.briefDetails || ''} disabled readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>Area (Sq ft.) <span>*</span></label>
                                        <input className="form-control" type="text" value={site.area || ''} disabled readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>Manpower employed at Site</label>
                                        <input className="form-control" type="text" value={site.manpower || ''} disabled readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>Stage Of Project</label>
                                        <input className="form-control" type="text" value={site.stageOfProject || ''} disabled readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>Likely Compl. Date</label>
                                        <input className="form-control" type="date" value={site.likelyCompletion || ''} disabled readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>Attachment</label>
                                        {site.attachment && (
                                            <a href={typeof site.attachment === 'string' ? `${baseURL}${site.attachment}` : '#'} download className="text-primary d-flex align-items-center">
                                                <span className="me-2">Existing File</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CollapsedCardKYC>
                ))}
           

             {/* Preview: Product & Services (readonly) */}
       
            <div className="row mb-3 mx-2 mt-4">
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Product & Services </label>
                        <MultiSelector options={[]} 
                        // value={selectedProductServices || []} 
                        isDisabled={true} placeholder="Select Product & Services" />
                    </div>
                </div>
            </div>
       

        {/* Preview: Turnover Table (readonly) */}
       
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
                            <tr>
                                <td>2024-2025</td>
                                <td>
                                    <input className="form-control" type="number" value={turnover["2024-2025"]?.amount || ''} disabled readOnly />
                                </td>
                                <td>
                                    {turnover["2024-2025"]?.attachment && (
                                        <a href={typeof turnover["2024-2025"].attachment === 'string' ? `${baseURL}${turnover["2024-2025"].attachment}` : '#'} download className="text-primary d-flex align-items-center">
                                            <span className="me-2">Existing File</span>
                                        </a>
                                    )}
                                </td>
                                <td>
                                    <input className="form-control" type="text" value={turnover["2024-2025"]?.markets || ''} disabled readOnly />
                                </td>
                            </tr>
                            <tr>
                                <td>2023-2024</td>
                                <td>
                                    <input className="form-control" type="number" value={turnover["2023-2024"]?.amount || ''} disabled readOnly />
                                </td>
                                <td>
                                    {turnover["2023-2024"]?.attachment && (
                                        <a href={typeof turnover["2023-2024"].attachment === 'string' ? `${baseURL}${turnover["2023-2024"].attachment}` : '#'} download className="text-primary d-flex align-items-center">
                                            <span className="me-2">Existing File</span>
                                        </a>
                                    )}
                                </td>
                                <td>
                                    <input className="form-control" type="text" value={turnover["2023-2024"]?.markets || ''} disabled readOnly />
                                </td>
                            </tr>
                            <tr>
                                <td>2022-2023</td>
                                <td>
                                    <input className="form-control" type="number" value={turnover["2022-2023"]?.amount || ''} disabled readOnly />
                                </td>
                                <td>
                                    {turnover["2022-2023"]?.attachment && (
                                        <a href={typeof turnover["2022-2023"].attachment === 'string' ? `${baseURL}${turnover["2022-2023"].attachment}` : '#'} download className="text-primary d-flex align-items-center">
                                            <span className="me-2">Existing File</span>
                                        </a>
                                    )}
                                </td>
                                <td>
                                    <input className="form-control" type="text" value={turnover["2022-2023"]?.markets || ''} disabled readOnly />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ****** */}
                          
                            
                           
                           
                            {/* Repeat for all other dynamic sections: relatedEmployees, groupCompanies, supervisoryManpower, majorCustomers, workingSites, etc. Use the same card structure as in the form, with all fields disabled and filled. */}
                            {/* --- Declaration Section --- */}
                            <div className="card mx-4 pb-4 mt-4">
                                <div className="row mt-4 mx-3">
                                    <div className="col-md-12">
                                        <h5 className=" ">
                                            Declaration <span style={{ color: " #DE7008" }}>*</span>
                                        </h5>
                                        <p>
                                            <span className="me-2 mt-2">
                                                <input
                                                    type="checkbox"
                                                    id="declaration-checkbox"
                                                    required=""
                                                    onChange={handleCheckboxChange}
                                                />
                                            </span>{" "}
                                            I, undersigned, on behalf of M/S Test 20/9/2025/ new hereby certify that the information provided in this documents are the best of my knowledge & particulars given in this submission are true and correct. I authorize M/S A2Z Online Services Private Limited to make direct inquiries and references to any person, firm, public official or organization named in this Form to verify information submitted herein or regarding the competence of the Organization.
                                        </p>
                                        {errors.declaration && (
                                            <div className="ValidationColor">{errors.declaration}</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}



                    {/* Navigation buttons */}
                    {currentStep !== 0 && (
                        <div className="d-flex justify-content-center mt-4" style={{ gap: '1rem' }}>
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
                                disabled={currentStep === 0}
                            >
                                Back
                            </button>
                            <button
                                className="purple-btn2"
                                onClick={() => {
                                    // Step-wise validation logic
                                    let isValid = true;
                                    // if (currentStep === 1) {
                                    //     // Step 1: Basic Info validation
                                    //     isValid = validateBasicInfo();
                                    //     if (!isValid) return;
                                    // }
                                    // Add more step validations as needed
                                    // else 
                                    //     if (currentStep === 2) {
                                    //     isValid = validateStep2();
                                    //     if (!isValid) return;
                                    // }
                                    // else 
                                    // if (currentStep === 3) {
                                    //     isValid = validateStep3();
                                    //     if (!isValid) return;
                                    // }
                                    //  else 
                                    // if (currentStep === 4) {
                                    //     isValid = validateStep4();
                                    //     if (!isValid) return;
                                    // }
                                    // ...

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
