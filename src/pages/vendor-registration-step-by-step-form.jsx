

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
    const [bankDetailsList, setBankDetailsList] = useState([]);
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
            setBankDetailsList(response.data?.bank_details);
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
                console.error("Failed to fetch statutory details:", error);
                setLoading(false);
            }
        };

        fetchStatutoryData();
    }, [supplierData?.id]);

    console.log("statutory details:", statutoryDetails)

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

    console.log("before update")
    // Handle the Update Button Click
    const handleUpdate = async () => {
        console.log("innn update")
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
                    // console.log('Update successful:', data);
                    // alert("Updated successfully");
                    toast.success("Updated successfully");
                    navigate("/confirmation"); // This will navigate to the confirmation page
                    // await fetchSupplierData();
                    // Optionally handle success (e.g., show a success message or redirect)
                    console.log("success");
                }
            } catch (error) {
                console.error(
                    "Error:",
                    error.response ? error.response.data : error.message
                );


                // alert("Something went wrong! ");
                toast.error("Something went wrong!");
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
        { label: "Statutory Details" },
        { label: "Additional Details" },
        { label: "Pre qualification" },
        { label: "Declarations" },
        { label: "Preview & Submit" },
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
                                                <input className="form-control" type="text" placeholder="Enter Email OTP" />
                                                <span style={{background:'#fff',color:'#e95420',padding:'2px 8px',borderRadius:'4px',fontSize:'0.95em',display:'inline-block',marginTop:'4px'}}>*Note: Any One OTP Is Mandatory To Proceed</span>
                                            </div>
                                            <div className="col-md-6">
                                                <input className="form-control" type="text" placeholder="Enter Mobile OTP" />
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-center mt-3">
                                            <button className="purple-btn2 w-100" onClick={() => {
                                                setCompleted((arr) => {
                                                    const copy = [...arr];
                                                    copy[currentStep] = true;
                                                    return copy;
                                                });
                                                setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
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
                                                    {"Acme Corporation"}
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
                                                    {"27AAECS1234F1Z5"}
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
                                                    {"Mumbai"}
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
                                                    {"Procurement"}
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
                                                    {"John Doe"}
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
                                                    {"9876543210"}
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
                                                    options={[]}
                                                // placeholder="Select Country"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                {/* Label with Tooltip */}
                                                <label>
                                                    Nature of Business <span>*</span>
                                                    {/* <TooltipIcon message="Please choose your country from the list" /> */}
                                                </label>
                                                <SingleSelector
                                                    options={[]}
                                                // placeholder="Select Country"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4 mt-2">
                                            <div className="form-group">

                                                <label>
                                                    Vendor Type  <span>*</span>
                                                    {/* <TooltipIcon message="Please choose your country from the list" /> */}
                                                </label>
                                                <SingleSelector
                                                    options={[]}
                                                // placeholder="Select Country"
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
                                                    options={[]}
                                                // placeholder="Select Country"
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

                                                />

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
                                                />
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
                                                />
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
                                                    type="text"
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
                                                />
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
                                                />
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
                                                    options={[]}
                                                    placeholder="Select Country"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4 mt-2">
                                            <div className="form-group">
                                                <label>
                                                    Date of Incorporation 
                                                    <TooltipIcon message="Provide the date when younorganization was officially incorporated. Use the format (DD-MM-YYYY) and refer to your incorporation certificate if needed." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="date"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4 mt-2">
                                            <div className="form-group">
                                                {/* Label with Tooltip */}
                                                <label>
                                                    GSTIN Applicable <span>*</span>
                                                    <TooltipIcon message="Please choose your country from the list" />
                                                </label>
                                                <SingleSelector
                                                    options={[]}
                                                    placeholder="Select Country"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4 mt-2">
                                            <div className="form-group">

                                                <label>
                                                    GSTIN Classification <span>*</span>
                                                    <TooltipIcon message="Please choose your country from the list" />
                                                </label>
                                                <SingleSelector
                                                    options={[]}
                                                    placeholder="Select Country"
                                                />
                                            </div>
                                        </div>


                                        <div className="row">

                                            <div className="col-md-4 mt-2">
                                                <div className="form-group">
                                                    <label>
                                                        GSTIN No. <span>*</span>
                                                        <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-4 mt-2">
                                                <div className="form-group">
                                                    <label>
                                                        GSTIN Attachment <span>*</span>
                                                        <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="file"
                                                    />
                                                </div>
                                            </div>


                                            <div className="col-md-4 mt-2">
                                                <div className="form-group">
                                                    <label>
                                                        Download Specimen<span>*</span>
                                                        <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
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
                                                        <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="file"
                                                    />
                                                </div>
                                            </div>
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
                                                    Delivery Lead Period (In Days)<span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>
                                                    Specify Warranty Period (In Years)<span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">

                                                <label>
                                                    AMC Provided<span>*</span>
                                                    <TooltipIcon message="Please choose your country from the list" />
                                                </label>
                                                <SingleSelector
                                                    options={[]}
                                                // placeholder="Select Country"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>
                                                    Website <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                {/* Label with Tooltip */}
                                                <label>
                                                    Currency Type <span>*</span>
                                                    <TooltipIcon message="Please choose your country from the list" />
                                                </label>
                                                <SingleSelector
                                                    options={[]}
                                                // placeholder="Select Country"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4 mt-2">
                                            <div className="form-group">

                                                <label>
                                                    MSME/Udyam Number Applicable  <span>*</span>
                                                    <TooltipIcon message="Please choose your country from the list" />
                                                </label>
                                                <SingleSelector

                                                    value={options.find(
                                                        (option) => option.value === msmeUdyamApplicable
                                                    )}
                                                    onChange={(selected) =>
                                                        handleMsmeUdyamChange({
                                                            target: { value: selected.value },
                                                        })
                                                    }
                                                    options={options}
                                                    className="form-control"
                                                    placeholder="Select..."
                                                />

                                            </div>
                                        </div>

                                        {msmeUdyamApplicable === "Yes" && (
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
                                                        value={msmeNo}
                                                        onChange={handleMsmeNoChange} // Add onChange handler here
                                                    // value={supplierData?.msme_details?.msme_no}
                                                    />
                                                    {errors.msmeNo && (
                                                        <div className="ValidationColor">{errors.msmeNo}</div>
                                                    )}{" "}
                                                    {/* Show error */}
                                                </div>
                                            </div>
                                        )}

                                        {msmeUdyamApplicable === "Yes" && (
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
                                                        value={optionsClassificationYear.find(
                                                            (option) => option.value === classificationYear
                                                        )}
                                                        onChange={handleClassificationYearChange}
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


                                        {msmeUdyamApplicable === "Yes" && (
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
                                                        value={optionsMajorActivity.find(
                                                            (option) => option.value === majorActivity
                                                        )}
                                                        onChange={(selected) =>
                                                            setMajorActivity(selected.value)
                                                        }
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
                                        {msmeUdyamApplicable === "Yes" && (
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
                                                        value={validFrom}
                                                        disabled={!!classificationYear} // Disable when classification year is selected
                                                        onChange={handleValidFromChange} // Add onChange handler here
                                                    // value={supplierData?.msme_details?.valid_from}
                                                    />
                                                    {errors.validFrom && (
                                                        <div className="ValidationColor">
                                                            {errors.validFrom}
                                                        </div>
                                                    )}{" "}
                                                    {/* Show error */}
                                                </div>
                                            </div>
                                        )}

                                        {/* MSME/Udyam Valid Till */}
                                        {msmeUdyamApplicable === "Yes" && (
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
                                                        value={validTill}
                                                        disabled={!!classificationYear} // Disable when classification year is selected
                                                        onChange={handleValidTillChange}
                                                    // value={supplierData?.msme_details?.valid_till}
                                                    />
                                                    {errors.validTill && (
                                                        <div className="ValidationColor">
                                                            {errors.validTill}
                                                        </div>
                                                    )}{" "}
                                                    {/* Show error */}
                                                </div>
                                            </div>
                                        )}

                                        {/* MSME Enterprise Type */}
                                        {msmeUdyamApplicable === "Yes" && (
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
                                                        value={optionsEnterPrise.find(
                                                            (option) => option.value === msmeEnterpriseType
                                                        )}
                                                        onChange={(selected) =>
                                                            handleMsmeEnterpriseChange({
                                                                target: { value: selected.value },
                                                            })
                                                        }
                                                        options={optionsEnterPrise}
                                                        className="form-control"
                                                        placeholder="Select option..."
                                                    />
                                                    {errors.msmeEnterpriseType && (
                                                        <div className="ValidationColor">
                                                            {errors.msmeEnterpriseType}
                                                        </div>
                                                    )}{" "}
                                                    {/* Show error */}
                                                </div>
                                            </div>
                                        )}



                                        {/*  */}
                                        {msmeUdyamApplicable === "Yes" && (
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
                                        {msmeUdyamApplicable === "Yes" && (
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
                                                        onChange={(e) => handleFileChange(e.target.files[0])}
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
                                            {msmeUdyamApplicable === "No" && (
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

                                            {msmeUdyamApplicable === "No" && (
                                                <div className="col-md-4 mt-2">
                                                    <div className="form-group">
                                                        <label
                                                        // data-bs-toggle="tooltip"
                                                        // data-bs-placement="top"
                                                        // title={tooltipMessages.UploadDeclaration}
                                                        >
                                                            Upload Declaration <span>*</span>
                                                        </label>
                                                        <TooltipIcon message="If you choose E-Invoice applicable 'No', please upload a signed declaration document to verify the details you have submitted. The document must be uploaded in PDF format.Ensure that the document is clear, legible, and properly signed." />

                                                        <span className="ms-2">
                                                            {/* <a
                          href={
                            supplierData?.msme_details?.msme_attachments[0]
                              ?.file_url
                          } // PDF file URL */}

                                                            <a
                                                                // href={`${baseURL}${supplierData?.msme_details?.msme_attachments[0]?.file_url}`} // Prepend baseURL to the file URL
                                                                download // Trigger download when clicked
                                                                className="text-primary d-flex align-items-center"
                                                            >
                                                                {/* <span className="me-2">Existing Files:</span> */}


                                                                {/* {supplierData?.msme_details?.msme_attachments
                            ?.length > 0
                            ? // Display the document name of the first attachment
                            supplierData?.msme_details?.msme_attachments[0]
                              ?.document_name
                            : // If no attachment is present, show a default message
                            "No Document Available"} */}
                                                            </a>
                                                        </span>
                                                        <input
                                                            className="form-control"
                                                            type="file"
                                                            accept=".pdf"
                                                            name=""
                                                            onChange={handleFileChange}
                                                        />
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
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>
                                                    Address Line 2  <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>
                                                    Address Line 3 <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4 mt-2">
                                            <div className="form-group">
                                                <label>
                                                    Address Line 4 <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4  mt-2">
                                            <div className="form-group">
                                                <label>
                                                    Address Line 5 <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4  mt-2">
                                            <div className="form-group">

                                                <label>
                                                    Country<span>*</span>
                                                    <TooltipIcon message="Please choose your country from the list" />
                                                </label>
                                                <SingleSelector
                                                    options={[]}
                                                // placeholder="Select Country"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4  mt-2">
                                            <div className="form-group">
                                                {/* Label with Tooltip */}
                                                <label>
                                                    State <span>*</span>
                                                    <TooltipIcon message="Please choose your country from the list" />
                                                </label>
                                                <SingleSelector
                                                    options={[]}
                                                // placeholder="Select Country"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4  mt-2">
                                            <div className="form-group">
                                                <label>
                                                    City <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4  mt-2">
                                            <div className="form-group">
                                                <label>
                                                    Pin Code<span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4  mt-2">
                                            <div className="form-group">
                                                <label>
                                                    Telephone Phone No.<span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4  mt-2">
                                            <div className="form-group">
                                                <label>
                                                    Mobile Number <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4  mt-2">
                                            <div className="form-group">
                                                <label>
                                                    Ordering Email ID <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4  mt-2">
                                            <div className="form-group">
                                                <label>
                                                    Billing & Accounting Email ID<span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
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
                                            // onChange={handleSameAsRegisteredAddress} // Add handler if needed
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
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>
                                                    Address Line 2  <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>
                                                    Address Line 3 <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4 mt-2">
                                            <div className="form-group">
                                                <label>
                                                    Address Line 4 <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4  mt-2">
                                            <div className="form-group">
                                                <label>
                                                    Address Line 5 <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4  mt-2">
                                            <div className="form-group">

                                                <label>
                                                    Country<span>*</span>
                                                    <TooltipIcon message="Please choose your country from the list" />
                                                </label>
                                                <SingleSelector
                                                    options={[]}
                                                // placeholder="Select Country"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4  mt-2">
                                            <div className="form-group">
                                                {/* Label with Tooltip */}
                                                <label>
                                                    State <span>*</span>
                                                    <TooltipIcon message="Please choose your country from the list" />
                                                </label>
                                                <SingleSelector
                                                    options={[]}
                                                // placeholder="Select Country"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4  mt-2">
                                            <div className="form-group">
                                                <label>
                                                    City <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4  mt-2">
                                            <div className="form-group">
                                                <label>
                                                    Pin Code<span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4  mt-2">
                                            <div className="form-group">
                                                <label>
                                                    Telephone Phone No.<span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4  mt-2">
                                            <div className="form-group">
                                                <label>
                                                    Mobile Number <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4  mt-2">
                                            <div className="form-group">
                                                <label>
                                                    Email ID <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
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
                                                // data-bs-toggle="tooltip"
                                                // data-bs-placement="top"
                                                // title={tooltipMessages.bankName}
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
                                                {/* {errors.bank_name && !bankDetail.bank_name && (
                          <div className="ValidationColor">
                            {errors.bank_name}
                          </div>
                        )} */}
                                                {bankDetail.isNew &&
                                                    errors.bank_name &&
                                                    !bankDetail.bank_name && (
                                                        <div className="ValidationColor">
                                                            {errors.bank_name}
                                                        </div>
                                                    )}

                                                {/* {errors.bank_name && <div className="invalid-feedback">{errors.bank_name}</div>} */}
                                                {/* {console.log(errors.bank_name)} */}
                                            </div>
                                        </div>
                                        {/* Address */}
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label
                                                // data-bs-toggle="tooltip"
                                                // data-bs-placement="top"
                                                // title={tooltipMessages.address}
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
                                                    errors.address &&
                                                    !bankDetail.address && (
                                                        <div className="ValidationColor">
                                                            {errors.address}
                                                        </div>
                                                    )}
                                                {/* {errors.address && !bankDetail.address && (
                          <div className="ValidationColor">
                            {errors.address}
                          </div>
                        )} */}
                                            </div>
                                        </div>
                                        {/* Country */}
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                {/* Label with Tooltip */}
                                                <label
                                                // data-bs-toggle="tooltip"
                                                // data-bs-placement="top"
                                                // title={tooltipMessages.country}
                                                >
                                                    Country <span>*</span>
                                                    <TooltipIcon message="Please choose your country from the list" />
                                                </label>

                                                {/* Country Dropdown */}
                                                {/* <SingleSelector
                          options={countries}
                          value={bankDetail.selectedCountry}
                          onChange={(selectedOption) =>
                            handleCountryChange(selectedOption, bankDetail.id)
                          } // Properly handling onChange
                        /> */}

                                                {/* <select
                          className="form-control"
                          value={bankDetail.country || ""}
                          onChange={(e) =>
                            handleCountryChange(e, bankDetail.id)
                          }
                        >
                          <option value="">Select Country</option>
                          {countries.map((country) => (
                            <option key={country.value} value={country.value}>
                              {country.name}
                            </option>
                          ))}
                        </select> */}

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
                                                    errors.country_id &&
                                                    !bankDetail.country_id && (
                                                        <div className="ValidationColor">
                                                            {errors.country_id}
                                                        </div>
                                                    )}
                                                {/* {errors.country_id && !bankDetail.country_id && (
                          <div className="ValidationColor">
                            {errors.country_id}
                          </div>
                        )} */}
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group mt-2">
                                                <label
                                                // data-bs-toggle="tooltip"
                                                // data-bs-placement="top"
                                                // title={tooltipMessages.state}
                                                >
                                                    State <span>*</span>
                                                    <TooltipIcon message="Please choose your State from the list" />
                                                </label>

                                                {/* <select
                          className="form-control"
                          value={bankDetail.state || ""}
                          onChange={(e) => handleStateChange(e, bankDetail.id)}
                        >
                          <option value="">Select State</option>
                          {states.map((state) => (
                            <option key={state.value} value={state.value}>
                              {state.name}
                            </option>
                          ))}
                        </select> */}

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
                                                {/* {errors.state_id && !bankDetail.state_id && (
                          <div className="ValidationColor">
                            {errors.state_id}
                          </div>
                        )} */}
                                                {bankDetail.isNew &&
                                                    errors.state_id &&
                                                    !bankDetail.state_id && (
                                                        <div className="ValidationColor">
                                                            {errors.state_id}
                                                        </div>
                                                    )}
                                            </div>
                                        </div>
                                        {/* City */}
                                        <div className="col-md-4 mt-2">
                                            <div className="form-group">
                                                <label
                                                // data-bs-toggle="tooltip"
                                                // data-bs-placement="top"
                                                // title={tooltipMessages.city_name}
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
                                                    errors.city_name &&
                                                    !bankDetail.city_name && (
                                                        <div className="ValidationColor">
                                                            {errors.city_name}
                                                        </div>
                                                    )}
                                            </div>
                                        </div>
                                        {/* Pin Code */}
                                        <div className="col-md-4 mt-2">
                                            <div className="form-group">
                                                <label
                                                // data-bs-toggle="tooltip"
                                                // data-bs-placement="top"
                                                // title={tooltipMessages.pincode}
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
                                                {/* {errors.pin_code && !bankDetail.pin_code && (
                          <div className="ValidationColor">
                            {errors.pin_code}
                          </div>
                        )} */}
                                                {/* {bankDetail.isNew &&
                          errors.pincode &&
                          !bankDetail.pincode && (
                            <div className="ValidationColor">
                              {errors.pincode}
                            </div>
                          )} */}
                                                {bankDetail.isNew && (
                                                    <>
                                                        {inputErrors[bankDetail.id]?.pincode && (
                                                            <div className="ValidationColor">
                                                                {inputErrors[bankDetail.id].pincode}
                                                            </div>
                                                        )}
                                                        {errors.pincode && !bankDetail.pincode && (
                                                            <div className="ValidationColor">
                                                                {errors.pincode}
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
                                                // data-bs-toggle="tooltip"
                                                // data-bs-placement="top"
                                                // title={tooltipMessages.accountType}
                                                >
                                                    Account Type <span>*</span>
                                                    <TooltipIcon message="Select the type of bank account your organization holds,such as Savings,Current,or any other relevant type" />
                                                </label>
                                                {/* <input
                          className="form-control"
                          type="text"
                          placeholder="Enter Account Type"
                          value={bankDetail.account_type}
                          onChange={(e) =>
                            handleInputChange(e, bankDetail.id, "account_type")
                          }
                          disabled={!bankDetail.isNew}
                        /> */}

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
                                                    errors.account_type &&
                                                    !bankDetail.account_type && (
                                                        <div className="ValidationColor">
                                                            {errors.account_type}
                                                        </div>
                                                    )}
                                            </div>
                                        </div>
                                        {/* Account Number */}
                                        <div className="col-md-4 mt-2">
                                            <div className="form-group">
                                                <label
                                                // data-bs-toggle="tooltip"
                                                // data-bs-placement="top"
                                                // title={tooltipMessages.accountNumber}
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
                                                    errors.account_number &&
                                                    !bankDetail.account_number && (
                                                        <div className="ValidationColor">
                                                            {errors.account_number}
                                                        </div>
                                                    )}
                                            </div>
                                        </div>
                                        {/* Confirm Account Number */}
                                        {/* <div className="col-md-4 mt-2">
                      <div className="form-group">
                        <label
                        // data-bs-toggle="tooltip"
                        // data-bs-placement="top"
                        // title={tooltipMessages.confirmAccountNumber}
                        >
                          Confirm Account Number <span>*</span>
                          <TooltipIcon message="Re-enter the  bank account number to confirm accuracy.Ensure it matches the original account number entered above." />
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Enter Confirm Account Number"
                          value={bankDetail.confirm_account_number}
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              bankDetail.id,
                              "confirm_account_number"
                            )
                          }
                        />
                        {/* {bankDetail.isNew && errors.confirm_account_number && (
                          <div className="ValidationColor">
                            {errors.confirm_account_number}
                          </div>
                        )}
                        {bankDetail.isNew && errors.account_match && (
                          <div className="ValidationColor">
                            {errors.account_match}
                          </div>
                        )} */}
                                        {/* {errors.confirm_account_number &&
                          !bankDetail.confirm_account_number && (
                            <div className="ValidationColor">
                              {errors.confirm_account_number}
                            </div>
                          )}
                        {errors.account_match &&
                          bankDetail.account_number !==
                            bankDetail.confirm_account_number && (
                            <div className="ValidationColor">
                              {errors.account_match}
                            </div>
                          )}
                      </div>
                    </div> */}
                                        {/* <div className="col-md-4 mt-2">
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
                            handleInputChange(
                              e,
                              bankDetail.id,
                              "confirm_account_number"
                            );
                            // Trigger validation when the user starts typing
                            if (e.target.value !== bankDetail.account_number) {
                              setErrors((prevErrors) => ({
                                ...prevErrors,
                                confirm_account_number:
                                  "Confirm Account Number must match Account Number.",
                              }));
                            } else {
                              setErrors((prevErrors) => {
                                const newErrors = { ...prevErrors };
                                delete newErrors.confirm_account_number;
                                return newErrors;
                              });
                            }
                          }}
                          disabled={!bankDetail.isNew}
                        />
                        {bankDetail.isNew && errors.confirm_account_number && (
                          <div className="ValidationColor">
                            {errors.confirm_account_number}
                          </div>
                        )}
                      </div>
                    </div> */}
                                        {/* // Add this to your component's return JSX where the confirm
                    account number input is */}
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
                                                {bankDetail.isNew && errors.confirm_account_number && (
                                                    <div className="ValidationColor">
                                                        {errors.confirm_account_number}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        {/* Branch Name */}
                                        <div className="col-md-4 mt-2">
                                            <div className="form-group">
                                                <label
                                                // data-bs-toggle="tooltip"
                                                // data-bs-placement="top"
                                                // title={tooltipMessages.branchName}
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
                                                    errors.branch_name &&
                                                    !bankDetail.branch_name && (
                                                        <div className="ValidationColor">
                                                            {errors.branch_name}
                                                        </div>
                                                    )}
                                            </div>
                                        </div>
                                        {/* MICR No. */}
                                        <div className="col-md-4 mt-2">
                                            <div className="form-group">
                                                <label
                                                // data-bs-toggle="tooltip"
                                                // data-bs-placement="top"
                                                // title={tooltipMessages.MICR}
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
                                                {errors.micr_number && !bankDetail.micr_number && (
                                                    <div className="ValidationColor">
                                                        {errors.micr_number}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        {/* IFSC Code */}
                                        <div className="col-md-4 mt-2">
                                            <div className="form-group">
                                                <label
                                                // data-bs-toggle="tooltip"
                                                // data-bs-placement="top"
                                                // title={tooltipMessages.IFSCCode}
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
                                                {/* {bankDetail.isNew &&
                          errors.ifsc_code &&
                          !bankDetail.ifsc_code && (
                            <div className="ValidationColor">
                              {errors.ifsc_code}
                            </div>
                          )} */}
                                                {bankDetail.isNew && (
                                                    <>
                                                        {inputErrors[bankDetail.id]?.ifsc && (
                                                            <div className="ValidationColor">
                                                                {inputErrors[bankDetail.id].ifsc}
                                                            </div>
                                                        )}
                                                        {errors.ifsc_code && !bankDetail.ifsc_code && (
                                                            <div className="ValidationColor">
                                                                {errors.ifsc_code}
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
                                                // data-bs-toggle="tooltip"
                                                // data-bs-placement="top"
                                                // title={tooltipMessages.beneficiaryName}
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
                                                    errors.benficary_name &&
                                                    !bankDetail.benficary_name && (
                                                        <div className="ValidationColor">
                                                            {errors.benficary_name}
                                                        </div>
                                                    )}
                                            </div>
                                        </div>
                                        {/* Cancelled Cheque / Bank Copy */}
                                        <div className="col-md-4 mt-2">
                                            <div className="form-group">
                                                <label
                                                // data-bs-toggle="tooltip"
                                                // data-bs-placement="top"
                                                // title={tooltipMessages.cancelledCheque}
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

                                                {/* Validation Message */}
                                                {/* {bankDetail.isNew && errors.cancelled_cheque && (
                          <div className="ValidationColor">
                            {errors.cancelled_cheque}
                          </div>
                        )} */}
                                                {/* {bankDetail.isNew &&
                          errors.cancelled_cheque &&
                          !bankDetail.attachment && (
                            <div className="ValidationColor">
                              {errors.cancelled_cheque}
                            </div>
                          )} */}
                                                {bankDetail.isNew &&
                                                    errors.cancelled_cheque &&
                                                    !bankDetail.attachment && (
                                                        <div className="ValidationColor">
                                                            {errors.cancelled_cheque}
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

                            <div className="card mx-3 pb-4 mt-4">
                                <div className="card-header3">
                                    <h3 className="card-title">Branch Office</h3>
                                </div>
                                <div className="card-body mt-0">

                                    <div className="row">

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>
                                                    Address <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4  mt-2">
                                            <div className="form-group">

                                                <label>
                                                    Country<span>*</span>
                                                    <TooltipIcon message="Please choose your country from the list" />
                                                </label>
                                                <SingleSelector
                                                    options={[]}
                                                // placeholder="Select Country"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4  mt-2">
                                            <div className="form-group">
                                                {/* Label with Tooltip */}
                                                <label>
                                                    State <span>*</span>
                                                    <TooltipIcon message="Please choose your country from the list" />
                                                </label>
                                                <SingleSelector
                                                    options={[]}
                                                // placeholder="Select Country"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4  mt-2">
                                            <div className="form-group">
                                                <label>
                                                    City <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4  mt-2">
                                            <div className="form-group">
                                                <label>
                                                    Pin Code<span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4  mt-2">
                                            <div className="form-group">
                                                <label>
                                                    Telephone Phone No.<span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4  mt-2">
                                            <div className="form-group">
                                                <label>
                                                    Mobile Number <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    )}



                    {currentStep === 4 && (
                        <div className="card mx-4 pb-4 mt-4">
                            <div className="card mx-3 pb-4 mt-4">
                                <div className="card-header3">
                                    <h3 className="card-title">Contact Person</h3>
                                </div>
                                <div className="card-body mt-0">

                                    <div className="row">
                                        <div className="col-md-4  mt-2">
                                            <div className="form-group">

                                                <label>
                                                    Escalation Level<span>*</span>
                                                    <TooltipIcon message="Please choose your country from the list" />
                                                </label>
                                                <SingleSelector
                                                    options={[]}
                                                // placeholder="Select Country"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4  mt-2">
                                            <div className="form-group">

                                                <label>
                                                    Name Title <span>*</span>
                                                    <TooltipIcon message="Please choose your country from the list" />
                                                </label>
                                                <SingleSelector
                                                    options={[]}
                                                // placeholder="Select Country"
                                                />
                                            </div>
                                        </div>


                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>
                                                    First Name <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>
                                                    Last Name<span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4  mt-2">
                                            <div className="form-group">

                                                <label>
                                                    Designation<span>*</span>
                                                    <TooltipIcon message="Please choose your country from the list" />
                                                </label>
                                                <SingleSelector
                                                    options={[]}
                                                // placeholder="Select Country"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>
                                                    Primary Email ID <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>
                                                    Secondary Email ID <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>
                                                    Primary Mobile No. <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>
                                                    Secondary Mobile No. <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>



                                        <div className="col-md-4  mt-2">
                                            <div className="form-group">

                                                <label>
                                                    Nationality<span>*</span>
                                                    <TooltipIcon message="Please choose your country from the list" />
                                                </label>
                                                <SingleSelector
                                                    options={[]}
                                                // placeholder="Select Country"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4  mt-2">
                                            <div className="form-group">
                                                {/* Label with Tooltip */}
                                                <label>
                                                    Gender <span>*</span>
                                                    <TooltipIcon message="Please choose your country from the list" />
                                                </label>
                                                <SingleSelector
                                                    options={[]}
                                                // placeholder="Select Country"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4  mt-2">
                                            <div className="form-group">
                                                <label>
                                                    Date of Birth<span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="date"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4  mt-2">
                                            <div className="form-group">
                                                <label>
                                                    Attachment<span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="file"
                                                />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="card mx-3 pb-4 mt-4">
                                <div className="card-header3">
                                    <h3 className="card-title">Factory Warehouse Details</h3>
                                </div>
                                <div className="card-body mt-0">

                                    <div className="row">

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>
                                                    Address <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4  ">
                                            <div className="form-group">

                                                <label>
                                                    Country<span>*</span>
                                                    <TooltipIcon message="Please choose your country from the list" />
                                                </label>
                                                <SingleSelector
                                                    options={[]}
                                                // placeholder="Select Country"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4  mt-2">
                                            <div className="form-group">
                                                {/* Label with Tooltip */}
                                                <label>
                                                    State <span>*</span>
                                                    <TooltipIcon message="Please choose your country from the list" />
                                                </label>
                                                <SingleSelector
                                                    options={[]}
                                                // placeholder="Select Country"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4  mt-2">
                                            <div className="form-group">
                                                <label>
                                                    City <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4  mt-2">
                                            <div className="form-group">
                                                <label>
                                                    Telephone Phone No.<span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4  mt-2">
                                            <div className="form-group">
                                                <label>
                                                    Mobile Number <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4  mt-2">
                                            <div className="form-group">
                                                <label>
                                                    Attachment <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="file"
                                                />
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>


                            <div className="card mx-3 pb-4 mt-4">
                                <div className="card-header3">
                                    <h3 className="card-title">Owners / Directors Information</h3>
                                </div>
                                <div className="card-body mt-0">

                                    <div className="row">

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>
                                                    First Name  <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>
                                                    Last Name  <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>


                                        <div className="col-md-4  ">
                                            <div className="form-group">

                                                <label>
                                                    Designation <span>*</span>
                                                    <TooltipIcon message="Please choose your country from the list" />
                                                </label>
                                                <SingleSelector
                                                    options={[]}
                                                // placeholder="Select Country"
                                                />
                                            </div>
                                        </div> <div className="col-md-4  ">
                                            <div className="form-group">

                                                <label>
                                                    Qualification <span>*</span>
                                                    <TooltipIcon message="Please choose your country from the list" />
                                                </label>
                                                <SingleSelector
                                                    options={[]}
                                                // placeholder="Select Country"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>
                                                    Experience <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>
                                                    Email <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>
                                                    Mobile Number <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>
                                                    Attachment <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="file"
                                                />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>


                            <div className="card mx-3 pb-4 mt-4">
                                <div className="card-header3">
                                    <h3 className="card-title">Are you related to any employee of Panchshil?</h3>
                                </div>
                                <div className="card-body mt-0">

                                    <div className="row">

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>
                                                    First Name  <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>
                                                    Last Name  <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>
                                                    Employee Email Id  <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>
                                                    Mobile Number  <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>


                                        <div className="col-md-4  ">
                                            <div className="form-group">

                                                <label>
                                                    Designation <span>*</span>
                                                    <TooltipIcon message="Please choose your country from the list" />
                                                </label>
                                                <SingleSelector
                                                    options={[]}
                                                // placeholder="Select Country"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4  ">
                                            <div className="form-group">

                                                <label>
                                                    Department <span>*</span>
                                                    <TooltipIcon message="Please choose your country from the list" />
                                                </label>
                                                <SingleSelector
                                                    options={[]}
                                                // placeholder="Select Country"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4  ">
                                            <div className="form-group">
                                                <label>
                                                    Relationship <span>*</span>
                                                    <TooltipIcon message="Please choose your country from the list" />
                                                </label>
                                                <SingleSelector
                                                    options={[]}
                                                // placeholder="Select Country"
                                                />
                                            </div>
                                        </div>

                                        {/* Radio button group for Currently Working */}
                                        <div className="row mb-3 mt-2">
                                            <div className="col-md-4">
                                                <div className="form-group mb-0">
                                                    <label className="mb-1">Currently Working <span>*</span></label>
                                                    <div>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name="currentlyWorking" id="currentlyWorkingYes" value="yes" />
                                                            <label className="form-check-label" htmlFor="currentlyWorkingYes">Yes</label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name="currentlyWorking" id="currentlyWorkingNo" value="no" />
                                                            <label className="form-check-label" htmlFor="currentlyWorkingNo">No</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>
                                                    Attachment <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="file"
                                                />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="card mx-3 pb-4 mt-4">
                                <div className="card-header3">
                                    <h3 className="card-title">Name of Sister Concern / Group Company()</h3>
                                </div>
                                <div className="card-body mt-0">

                                    <div className="row">

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>
                                                    Name  <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>


                                        <div className="col-md-4  ">
                                            <div className="form-group">

                                                <label>
                                                    Nature Of Business  <span>*</span>
                                                    <TooltipIcon message="Please choose your country from the list" />
                                                </label>
                                                <SingleSelector
                                                    options={[]}
                                                // placeholder="Select Country"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>
                                                    PAN No.   <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>
                                                    GSTIN No. <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>



                            <div className="card mx-3 pb-4 mt-4">
                                <div className="card-header3">
                                    <h3 className="card-title">Supervisory Manpower & Resources Details</h3>
                                </div>
                                <div className="card-body mt-0">

                                    <div className="row">

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>
                                                    Supervisory Manpower Details <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>



                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>
                                                    Total Numbers <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>
                                                    Remark <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>
                                                    Attachment <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>


                            <div className="card mx-3 pb-4 mt-4">
                                <div className="card-header3">
                                    <h3 className="card-title">Major Customer Served by You </h3>
                                </div>
                                <div className="card-body mt-0">

                                    <div className="row">

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>
                                                    Company Name <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>



                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>
                                                    Work Done <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>
                                                    Contact Person <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4  ">
                                            <div className="form-group">

                                                <label>
                                                    Designation  <span>*</span>
                                                    <TooltipIcon message="Please choose your country from the list" />
                                                </label>
                                                <SingleSelector
                                                    options={[]}
                                                // placeholder="Select Country"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4  ">
                                            <div className="form-group">

                                                <label>
                                                    Country  <span>*</span>
                                                    <TooltipIcon message="Please choose your country from the list" />
                                                </label>
                                                <SingleSelector
                                                    options={[]}
                                                // placeholder="Select Country"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>
                                                    Phone No. <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>
                                                    Mobile No. <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>
                                                    Year of Association <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>
                                                    Business done in Last 12 month in lacs <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>
                                                    Service Provided From <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="date"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>
                                                    Service Provided To  <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="date"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>
                                                    Stage Of Project <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>
                                                    Major Competitors <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>
                                                    Attachment <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="card mx-3 pb-4 mt-4">
                                <div className="card-header3">
                                    <h3 className="card-title">Current Working Sites </h3>
                                </div>
                                <div className="card-body mt-0">

                                    <div className="row">

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>
                                                    Builder / Client Name <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>



                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>
                                                    Brief Details <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>
                                                    Area (Sq ft.) <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>


                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>
                                                    Manpower employed at Site <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>
                                                    Stage Of Project <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div>


                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>
                                                    Likely Compl. Date <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="date"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>
                                                    Attachment <span>*</span>
                                                    <TooltipIcon message="Enter the name of the bank that holds your organization's business account.This information is required for payment and verification purposes." />
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="file"
                                                />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    )}



                    {currentStep === 5 && (
                        <div className="card mx-4 pb-4 mt-4">
                            <div className="row mb-3 mx-2">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Product & Services <span>*</span></label>
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
                            <div className="mx-3">
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


                            <div className="row mt-5 mx-2">
                                <div className="col-md-12">
                                    <h5 className="mb-3">Additional Vendor Statutory Details</h5>
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

                            <div className="mb-3 mx-3">
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
                                        {/* I, undersigned, on behalf of M/S Dell Organization Test hereby
                certify that the information provided in this documents are the
                best of my knowledge &amp; particulars given in this submission
                are true and correct. I authorize M/S A2Z Online Services
                Private Limited to make direct inquiries and references to any
                person, firm, public official or organization named in this Form
                to verify information submitted herein or regarding the
                competence of the&nbsp;Organization */}


                                        I, undersigned, on behalf of M/S Test 20/9/2025/ new hereby certify that the information provided in this documents are the best of my knowledge & particulars given in this submission are true and correct. I authorize M/S A2Z Online Services Private Limited to make direct inquiries and references to any person, firm, public official or organization named in this Form to verify information submitted herein or regarding the competence of the Organization.
                                    </p>

                                    {errors.declaration && (
                                        <div className="ValidationColor">{errors.declaration}</div>
                                    )}
                                    {/* <div id="checkboxError" style={{ color: "red", display: "none" }}>
                Please check this box to proceed.
              </div> */}
                                </div>
                            </div>
                        </div>
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
