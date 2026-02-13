import React, { useMemo, useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../confi/apiDomain";
import "../styles/mor.css";
import DynamicModalBox from "../components/base/Modal/DynamicModalBox";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Add custom scrollbar styles
const scrollbarStyles = `
    .vendor-detail-stepper-container::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }
    .vendor-detail-stepper-container::-webkit-scrollbar-track {
        background: #f5f5f5;
        border-radius: 4px;
    }
    .vendor-detail-stepper-container::-webkit-scrollbar-thumb {
        background: #e95420;
        border-radius: 4px;
    }
    .vendor-detail-stepper-container::-webkit-scrollbar-thumb:hover {
        background: #c9441a;
    }
    .vendor-detail-stepper-content::-webkit-scrollbar {
        width: 10px;
        height: 10px;
    }
    .vendor-detail-stepper-content::-webkit-scrollbar-track {
        background: #f5f5f5;
        border-radius: 5px;
    }
    .vendor-detail-stepper-content::-webkit-scrollbar-thumb {
        background: #e95420;
        border-radius: 5px;
    }
    .vendor-detail-stepper-content::-webkit-scrollbar-thumb:hover {
        background: #c9441a;
    }
    .tbl-container {
        width: 100%;
        overflow-x: auto;
    }
    .tbl-container table thead th {
        white-space: nowrap;
        background-color: #de7008;
        color: #fff;
        font-weight: 600;
        padding: 12px 8px;
        border: 1px solid #dee2e6;
    }
    .tbl-container table tbody td {
        white-space: nowrap;
        padding: 10px 8px;
        border: 1px solid #dee2e6;
        vertical-align: middle;
    }
`;

// Helper function to normalize strings for comparison
const normalize = (str) => {
  if (!str) return "";
  return str.toString().trim().toLowerCase().replace(/\s+/g, " ");
};

const VendorDetailFormStepper = () => {
  // Get supplier ID from URL params
  const { id: supplierId } = useParams();
  const location = useLocation();

  // Get token from URL query parameters (like approval-matrix page)
  const urlParams = new URLSearchParams(location.search);
  const token = urlParams.get("token");
  console.log("Token from URL:", token);
  const historyIdsFromUrl = urlParams.get("history_ids");

  // Loading and data states
  const [loading, setLoading] = useState(true);
  const [vendorData, setVendorData] = useState(null);
  const [checklistConfig, setChecklistConfig] = useState([]);
  const [approvalLogs, setApprovalLogs] = useState([]);
  const [departments, setDepartments] = useState([]);

  // Define all steps
  const steps = [
    { label: "Organization Detail" },
    { label: "Communication & Register Address" },
    { label: "Bank Details" },
    { label: "Additional Details" },
    { label: "Statutory Details" },
    { label: "Prequalification" },
    // { label: 'Preview & Declarations' }
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [completed] = useState([true, true, true, true, true, true, true]); // All steps completed for detail view

  // Top-right actions
  const [showApprovalLog, setShowApprovalLog] = useState(false);
  const [showReturnFiling, setShowReturnFiling] = useState(false);
  const [showDelegateApproval, setShowDelegateApproval] = useState(false);
  const [delegateRemark, setDelegateRemark] = useState("");
  const [delegateDepartment, setDelegateDepartment] = useState("");

  // Prequalification (dummy, UI-focused)
  const [qualificationStatus, setQualificationStatus] = useState("Approved");
  const [invitationRemark, setInvitationRemark] = useState(
    "as per mail received from Rajkumar karpe"
  );
  const [approverRemark, setApproverRemark] = useState("");
  const [markAllNaFinancial, setMarkAllNaFinancial] = useState(false);
  const [markAllNaTechnical, setMarkAllNaTechnical] = useState(false);
  const [organizationStatus, setOrganizationStatus] = useState("Approved");
  const [higherRateApplicable, setHigherRateApplicable] = useState(false);
  const [panAadharNotLinked, setPanAadharNotLinked] = useState(false);
  const [withholdingSections, setWithholdingSections] = useState([]);
  const [typeOfRecipients, setTypeOfRecipients] = useState([]);
  const [withholdingSection, setWithholdingSection] = useState("");
  const [typeOfRecipient, setTypeOfRecipient] = useState("");

  // Return filing states
  const [gstr1Details, setGstr1Details] = useState([]);
  const [gstr3bDetails, setGstr3bDetails] = useState([]);
  const [refreshingFiling, setRefreshingFiling] = useState(false);

  // Fetch vendor data and checklist configuration from API
  useEffect(() => {
    const fetchData = async () => {
      if (!supplierId) {
        console.error("No supplier ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Construct API URL with dynamic supplier ID
        const base = baseURL.endsWith("/") ? baseURL.slice(0, -1) : baseURL;
        const vendorUrl = `${base}/pms/suppliers/${supplierId}/supplier_show.json`;
        const checklistUrl = `${base}/pms/suppliers/${supplierId}/checklist_configuration_approval.json`;
        const approvalLogsUrl = `${base}/pms/suppliers/${supplierId}/approval_logs.json`;

        const dropdownsUrl = `${base}/pms/suppliers/dropdowns.json`;

        // Add token and history_ids to request if available
        const config = { params: {} };
        if (token) config.params.token = token;
        if (historyIdsFromUrl) config.params.history_ids = historyIdsFromUrl;

        console.log("Fetching data from:", vendorUrl);
        console.log("Checklist URL:", checklistUrl);
        console.log("Config params:", config.params);
        const [
          vendorResponse,
          checklistResponse,
          logsResponse,
          dropdownsResponse,
        ] = await Promise.all([
          axios.get(vendorUrl, config),
          axios.get(checklistUrl, config).catch(() => ({ data: [] })),
          axios.get(approvalLogsUrl, config).catch(() => ({ data: [] })),
          axios
            .get(dropdownsUrl, config)
            .catch(() => ({ data: { departments: [] } })),
        ]);

        console.log("Vendor data received:", vendorResponse.data);
        console.log(
          "Checklist configuration received:",
          checklistResponse.data
        );
        console.log("Approval logs received:", logsResponse.data);
        console.log("Dropdowns received:", dropdownsResponse.data);

        setVendorData(vendorResponse.data);
        const checklistData =
          checklistResponse.data?.data || checklistResponse.data || [];
        setChecklistConfig(Array.isArray(checklistData) ? checklistData : []);
        setDepartments(dropdownsResponse.data?.departments || []);
        setWithholdingSections(
          dropdownsResponse.data?.withholding_sections || []
        );
        setTypeOfRecipients(dropdownsResponse.data?.type_of_recipients || []);

        // Process logs to match UI expected fields
        // New API returns { success: true, data: [...] }
        const logsData = logsResponse.data?.data || logsResponse.data || [];
        const processedLogs = logsData.map((log) => ({
          id: log.id || log.sr_no,
          srNo: log.sr_no || log.srNo,
          category: log.category || "Registration Form",
          subCategory: log.sub_category || log.subCategory || "",
          approvalSection:
            log.section ||
            log.approval_section ||
            log.approval_matrix_name ||
            "",
          approvedBy:
            log.action_by || log.approved_by_name || log.approved_by || "",
          date: log.date || log.updated_at || log.created_at || "",
          status: log.status || "Pending",
          remark: log.remarks || log.remark || "",
          delegateTo: log.delegate_to || log.delegate_to_name || "",
          delegateRemark: log.delegate_remark || "",
          users: log.users || log.users_list || "",
        }));
        setApprovalLogs(processedLogs);

        // Set initial compliance values if available
        if (vendorResponse.data?.supplier) {
          setHigherRateApplicable(
            vendorResponse.data.supplier.higher_rate_app || false
          );
          setPanAadharNotLinked(
            !(vendorResponse.data.supplier.pan_aadhar_linked ?? true)
          );
          setWithholdingSection(
            vendorResponse.data.supplier.withholding_section_id || ""
          );
          setTypeOfRecipient(
            vendorResponse.data.supplier.type_of_recipient_id || ""
          );
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [supplierId, token]);

  // Fetch return filing status when modal opens if not already loaded
  useEffect(() => {
    if (
      showReturnFiling &&
      vendorData?.gstin &&
      gstr1Details.length === 0 &&
      gstr3bDetails.length === 0
    ) {
      const fetchInitialFiling = async () => {
        try {
          setRefreshingFiling(true);
          const url = `${baseURL}/pms/suppliers/fetch_and_save_return_filing_status?gstin=${vendorData.gstin}`;
          const config = { params: token ? { token } : {} };
          const response = await axios.get(url, config);
          if (response.data && response.data.data) {
            const processedList = response.data.data.map((item) => ({
              ...item,
              ret_period: item.ret_prd,
              rtntyp: item.rtntype,
              valid: item.is_valid,
            }));
            setGstr1Details(
              processedList.filter(
                (f) => f.rtntyp === "GSTR1" || f.rtntyp === "GSTR-1"
              )
            );
            setGstr3bDetails(
              processedList.filter(
                (f) => f.rtntyp === "GSTR3B" || f.rtntyp === "GSTR-3B"
              )
            );
          }
        } catch (error) {
          console.error("Error fetching initial filing:", error);
        } finally {
          setRefreshingFiling(false);
        }
      };
      fetchInitialFiling();
    }
  }, [
    showReturnFiling,
    vendorData,
    token,
    gstr1Details.length,
    gstr3bDetails.length,
  ]);

  const financialPreQualSections = useMemo(() => {
    const finCats = checklistConfig.filter((cat) =>
      normalize(cat.snag_cat_name).includes("financial")
    );

    if (finCats.length === 0) return [];

    let sectionCounter = 0;
    return finCats.flatMap((cat) =>
      cat.subcats.map((sub) => {
        sectionCounter++;
        const currentSecIdx = sectionCounter;
        const items = sub.questions.map((q, qIdx) => {
          let vendorReply = q.answer || "NA";
          if (q.answer_option_id && q.options) {
            const opt = q.options.find(
              (o) => String(o.value) === String(q.answer_option_id)
            );
            if (opt) vendorReply = opt.name;
          }

          return {
            id: q.id.toString(),
            srNo: `${currentSecIdx}.${qIdx + 1}`,
            particulars: q.descr || q.question_text || "",
            vendorReply: vendorReply,
            requiredDocuments: q.answer_file ? "Document Attached" : "",
            documentUrl: q.answer_file,
            remarkByVendor: q.answer_comments || "",
            totalScore: q.weightage || 5,
            passingScore: q.passing_score || 0,
          };
        });

        return {
          id: sub.id.toString(),
          srNo: currentSecIdx.toString(),
          title: sub.name,
          totalScore: items.reduce(
            (sum, item) => sum + (Number(item.totalScore) || 0),
            0
          ),
          passingScore: items.length > 0 ? items[0].passingScore : 0,
          items: items,
        };
      })
    );
  }, [checklistConfig]);

  const technicalPreQualSections = useMemo(() => {
    const techCats = checklistConfig.filter((cat) =>
      normalize(cat.snag_cat_name).includes("technical")
    );

    if (techCats.length === 0) return [];

    let sectionCounter = 0;
    return techCats.flatMap((cat) =>
      cat.subcats.map((sub) => {
        sectionCounter++;
        const currentSecIdx = sectionCounter;
        const items = sub.questions.map((q, qIdx) => {
          let vendorReply = q.answer || "NA";
          if (q.answer_option_id && q.options) {
            const opt = q.options.find(
              (o) => String(o.value) === String(q.answer_option_id)
            );
            if (opt) vendorReply = opt.name;
          }

          return {
            id: q.id.toString(),
            srNo: `${currentSecIdx}.${qIdx + 1}`,
            particulars: q.descr || q.question_text || "",
            vendorReply: vendorReply,
            requiredDocuments: q.answer_file ? "Document Attached" : "",
            documentUrl: q.answer_file,
            remarkByVendor: q.answer_comments || "",
            totalScore: q.weightage || 5,
            passingScore: q.passing_score || 0,
          };
        });

        return {
          id: sub.id.toString(),
          srNo: currentSecIdx.toString(),
          title: sub.name,
          totalScore: items.reduce(
            (sum, item) => sum + (Number(item.totalScore) || 0),
            0
          ),
          passingScore: items.length > 0 ? items[0].passingScore : 0,
          items: items,
        };
      })
    );
  }, [checklistConfig]);

  const [scoreByApprover, setScoreByApprover] = useState({});
  const [remarkByApprover, setRemarkByApprover] = useState({});

  const isFinancialEditable = useMemo(() => {
    const finCat = checklistConfig.find((cat) =>
      normalize(cat.snag_cat_name).includes("financial")
    );
    return finCat?.editable ?? true;
  }, [checklistConfig]);

  const isTechnicalEditable = useMemo(() => {
    const techCat = checklistConfig.find((cat) =>
      normalize(cat.snag_cat_name).includes("technical")
    );
    return techCat?.editable ?? true;
  }, [checklistConfig]);

  const totalObtainedMarks = useMemo(() => {
    const vals = Object.values(scoreByApprover).map((v) => Number(v) || 0);
    return vals.reduce((a, b) => a + b, 0);
  }, [scoreByApprover]);

  // Map API data for Client References
  const clientReferencesData = useMemo(() => {
    if (
      !vendorData ||
      !vendorData.major_customers ||
      vendorData.major_customers.length === 0
    ) {
      return {
        siteType: "-",
        serviceProvidedFrom: "-",
        clientName: "-",
        contactPerson: "-",
        clientCountry: "-",
        contactNo: "-",
        woPoAmount: "-",
        stageOfProject: "-",
        productOrServiceProvided: "-",
      };
    }

    const customer = vendorData.major_customers[0];
    return {
      siteType: customer.site_type || "-",
      serviceProvidedFrom: customer.service_provided_from || "-",
      clientName: customer.name || "-",
      contactPerson: customer.contact_person || "-",
      clientCountry: customer.country_name || "-",
      contactNo: customer.mobile || "-",
      woPoAmount: customer.turn_over ? customer.turn_over.toString() : "-",
      stageOfProject: customer.stage_of_project || "-",
      productOrServiceProvided: customer.work_done || "-",
    };
  }, [vendorData]);

  // Map API data for Organization Detail
  const organizationData = useMemo(() => {
    if (!vendorData) return {};

    return {
      companyName: vendorData.company_name || "-",
      certifyingCompanyGstin: vendorData.certifying_company_gstin || "-",
      site: vendorData.site_name || "-",
      department: vendorData.department_name || "-",
      invitedBy: vendorData.invited_by_name || "-",
      contactNumber: vendorData.inviter_contact_number || "-",
      vendorOrganizationName: vendorData.organization_name || "-",
      organizationType: vendorData.type_of_organization_name || "-",
      natureOfBusiness: vendorData.nature_of_business_name || "-",
      vendorType: vendorData.supplier_type_name || "-",
      typeOfIndustry: vendorData.type_business_name || "-",
      typeOfWork: vendorData.type_of_work || "-",
      fullName: vendorData.full_name || "-",
      email: vendorData.email || "-",
      mobile: vendorData.mobile || "-",
      keyMarket: vendorData.key_market || "-",
      schemaGroup: vendorData.schema_group_name || "-",
      panNo: vendorData.pan_number || "-",
      cinNo: vendorData.cin_number || "-",
      dateOfIncorporation: vendorData.date_of_incorporation || "-",
      gstinApplicable: vendorData.gstin_applicable === "1" ? "Yes" : "No",
      gstinClassification: vendorData.gst_classification_name || "-",
      gstin: vendorData.gstin || "-",
      gstinAttachments: vendorData.gstin_attachments || [],
      panAttachments: vendorData.pan_attachments || [],
      cinAttachments: vendorData.cin_number_attachments || [],
    };
  }, [vendorData]);

  // Map API data for Branch Office Details
  const branchOfficeDetailsData = useMemo(() => {
    if (
      !vendorData ||
      !vendorData.branch_offices ||
      vendorData.branch_offices.length === 0
    ) {
      return {
        branchAddress: "-",
        branchCountry: "-",
        branchState: "-",
        branchCity: "-",
        branchPinCode: "-",
        branchContactNumber: "-",
      };
    }

    const branch = vendorData.branch_offices[0];
    return {
      branchAddress: branch.address || "-",
      branchCountry: branch.country_name || "-",
      branchState: branch.state_name || "-",
      branchCity: branch.city_name || "-",
      branchPinCode: branch.pin_code || "-",
      branchContactNumber: branch.mobile || "-",
    };
  }, [vendorData]);

  // Map API data for Register Address
  const registeredAddressData = useMemo(() => {
    if (!vendorData || !vendorData.office_address) return {};

    const addr = vendorData.office_address;
    return {
      address1: addr.address || "-",
      address2: addr.address_line_two || "",
      address3: addr.address_line_three || "",
      address4: addr.address_line_four || "",
      address5: addr.address_line_five || "",
      country: addr.pms_country_name || "-",
      state: addr.pms_state_name || "-",
      city: addr.city_name || "-",
      pincode: addr.pin_code || "-",
      mobile: addr.mobile || "-",
      orderingEmail: vendorData.ordering_email || "-",
      billingEmail: vendorData.billing_account_email || "-",
    };
  }, [vendorData]);

  const communicationAddressData = useMemo(() => {
    if (!vendorData || !vendorData.communication_address) return {};

    const addr = vendorData.communication_address;
    return {
      address1: addr.address || "-",
      address2: addr.address_line_two || "",
      address3: addr.address_line_three || "",
      address4: addr.address_line_four || "",
      address5: addr.address_line_five || "",
      country: addr.pms_country_name || "-",
      state: addr.pms_state_name || "-",
      city: addr.city_name || "-",
      pincode: addr.pin_code || "-",
      mobile: addr.mobile || "-",
      orderingEmail: addr.email || "-",
      sameAsRegistered: false,
    };
  }, [vendorData]);

  // Map API data for Factory Warehouse Details
  const factoryWarehouseDetailsData = useMemo(() => {
    if (
      !vendorData ||
      !vendorData.factory_warehouses ||
      vendorData.factory_warehouses.length === 0
    ) {
      return {
        factoryAddress: "-",
        factoryCountry: "-",
        factoryState: "-",
        factoryCity: "-",
        factoryContactPerson: "-",
        factoryContactPersonEmail: "-",
        factoryContactNumber: "-",
        factoryAttachment: null,
      };
    }

    const factory = vendorData.factory_warehouses[0];
    return {
      factoryAddress: factory.address || "-",
      factoryCountry: factory.country_name || "-",
      factoryState: factory.state_name || "-",
      factoryCity: factory.city_name || "-",
      factoryContactPerson: factory.contact_person || "-",
      factoryContactPersonEmail: factory.contact_person_email || "-",
      factoryContactNumber: factory.mobile || "-",
      factoryAttachment: factory.attachment || null,
    };
  }, [vendorData]);

  // Map API data for Bank Details
  const bankDetailsData = useMemo(() => {
    if (!vendorData || !vendorData.bank_details) return [];

    return vendorData.bank_details.map((bank) => ({
      bankName: bank.bank_name || "-",
      branchName: bank.branch_name || "-",
      accountNumber: bank.account_number || "-",
      ifscCode: bank.ifsc_code || "-",
      accountType: bank.account_type || "-",
      micrNumber: bank.micr_number || "-",
      address: bank.address || "-",
      country: bank.country_name || "-",
      state: bank.state_name || "-",
      city: bank.city_name || "-",
      pincode: bank.pincode || "-",
      telNumber: "-",
      mobile: "-",
      beneficiaryName: bank.benficary_name || "-",
      remark: bank.remark || "-",
      virtualAccount: bank.virtual_account || "No",
      selectCompany: bank.company_name || "-",
      virtualAccountCode: bank.virtual_account_code || "-",
      cancelledCheque:
        bank.attachment || bank.cancelled_cheque_attachment || null,
    }));
  }, [vendorData]);

  // Map API data for Contact Person Details
  const contactPersonDetailsData = useMemo(() => {
    if (!vendorData || !vendorData.contact_people) return [];
    return vendorData.contact_people.map((contact) => ({
      escalationLevel: contact.escalation_level || "-",
      nameTitle: contact.name_title || "-",
      firstName: contact.first_name || "-",
      middleName: contact.middle_name || "",
      lastName: contact.last_name || "-",
      designation: contact.desiganation_name || "-",
      primaryEmailId: contact.primary_email || "-",
      secondaryEmailId: contact.secondary_email || "-",
      primaryContactNo: contact.primary_mobile || "-",
      secondaryContactNo: contact.secondary_mobile || "-",
      nationality: contact.nationality_string || "-",
      dateOfBirth: contact.birth_date || "-",
      attachment: contact.attachment || null,
    }));
  }, [vendorData]);

  // Map API data for Additional Details
  const additionalDetailsData = useMemo(() => {
    if (!vendorData) return {};

    return {
      deliveryLeadPeriod: vendorData.delivery_lead_period || "-",
      warrantyPeriod: vendorData.specify_warranty_period || "-",
      amcProvided: vendorData.amc_provided ? "Yes" : "No",
      website: vendorData.website || "-",
      msmeApplicable: vendorData.msme || "-",
      msmeNo: vendorData.msme_no || "-",
      udyamRegistrationDate: vendorData.udyam_registration_date || "-",
      validFrom: vendorData.valid_from || "-",
      validTill: vendorData.valid_till || "-",
      enterpriseType: vendorData.enterprise || "-",
      classificationYear: vendorData.classification_year || "-",
      majorActivity: vendorData.major_activity || "-",
      currencyType: vendorData.currency || "-",
      einvoicingApplicable: vendorData.einvoicing || "-",
      expertise: vendorData.company_expertise || "-",
      structure: vendorData.organization_structure || "-",
      purchasingOrganization: vendorData.purchasing_organization_name || "-",
      businessPersonalityType: vendorData.bp_type || "-",
      termOfPayment: vendorData.term_of_payment_name || "-",
      contractorAndService: vendorData.major_activity || "-",
      organization: vendorData.organization_name || "-",
      msmeAttachments: vendorData.msme_attachments || [],
      einvoicingAttachments: vendorData.einvoicing_attachments || [],
    };
  }, [vendorData]);

  // Map API data for Owner / Director Details
  const ownerDirectorDetailsData = useMemo(() => {
    if (
      !vendorData ||
      !vendorData.directors_informations ||
      vendorData.directors_informations.length === 0
    ) {
      return {
        ownerFirstName: "-",
        ownerLastName: "-",
        ownerDesignation: "-",
        ownerQualification: "-",
        ownerExperience: "-",
        ownerEmail: "-",
        ownerContactNumber: "-",
        ownerAttachment: null,
      };
    }

    const director = vendorData.directors_informations[0];
    return {
      ownerFirstName: director.first_name || "-",
      ownerLastName: director.last_name || "-",
      ownerDesignation: director.designation_name || "-",
      ownerQualification: director.qualification || "-",
      ownerExperience: director.experience || "-",
      ownerEmail: director.email || "-",
      ownerContactNumber: director.mobile || "-",
      ownerAttachment: director.attachment || null,
    };
  }, [vendorData]);

  // Map API data for Statutory Details
  const statutoryDetailsData = useMemo(() => {
    if (!vendorData) return { panNo: "-", gstNo: "-", statutoryDetails: [] };

    return {
      panNo: vendorData.pan_number || "-",
      gstNo: vendorData.gstin || "-",
      statutoryDetails: (vendorData.statutory_details || []).map((detail) => ({
        id: detail.id,
        name: detail.name || "-",
        code: detail.code || "-",
        value: detail.statutory_detail_value || "-",
        attachment: detail.attachment || null,
      })),
    };
  }, [vendorData]);

  // Map API data for Prequalification
  const prequalificationData = useMemo(() => {
    if (!vendorData) return { annualTurnover: [], majorCustomers: [] };

    return {
      annualTurnover: (vendorData.annual_turnovers || []).map((at) => {
        const fy = at.financial_year?.toString();
        const formattedYear =
          fy && fy.length === 4 && !isNaN(fy)
            ? `${fy}-${Number(fy) + 1}`
            : fy || "-";
        return {
          year: formattedYear,
          turnover: at.turnover?.toString() || "-",
          keyMarkets: at.key_markets || "-",
          attachmentUrl: at.attachment?.attachment_url || null,
          attachmentName: at.attachment?.document_name || "No file attached",
        };
      }),
      majorCustomers: (vendorData.major_customers || []).map((mc) => ({
        companyName: mc.name || "-",
        siteType: mc.site_type || "-",
        workDone: mc.work_done || "-",
        contactPerson: mc.contact_person || "-",
        designation: mc.designation_id || "-",
        country: mc.country_name || "-",
        phone: mc.phone || "-",
        mobile: mc.mobile || "-",
        yearsOfAssociation: mc.years_of_association || "-",
        serviceFrom: mc.service_provided_from || "-",
        serviceTo: mc.service_provided_to || "-",
        businessLast12Months: mc.turn_over?.toString() || "-",
        majorCompetitors: mc.major_competitors || "-",
        stageOfProject: mc.stage_of_project || "-",
      })),
    };
  }, [vendorData]);

  // Map API data for Preview & Declarations
  const declarationsData = useMemo(() => {
    if (!vendorData || !vendorData.supplier_declaration) return [];

    return vendorData.supplier_declaration.map((decl) => ({
      question: decl.question_text || "-",
      answer: decl.selected_option || "-",
      explanation: decl.explanation || "",
    }));
  }, [vendorData]);

  const handleSave = async () => {
    try {
      // Validate all scores
      const financialQuestions = [];
      financialPreQualSections.forEach((sec) =>
        financialQuestions.push(...sec.items)
      );

      const technicalQuestions = [];
      technicalPreQualSections.forEach((sec) =>
        technicalQuestions.push(...sec.items)
      );

      // Validate Financial Mandatory
      if (isFinancialEditable) {
        for (const q of financialQuestions) {
          const score = scoreByApprover[q.id];
          if (score === undefined || score === "" || score === null) {
            toast.error(
              `Score By Approver is mandatory for question: ${q.particulars}`
            );
            return;
          }
        }
      }

      // Validate Technical Mandatory
      if (isTechnicalEditable) {
        for (const q of technicalQuestions) {
          const score = scoreByApprover[q.id];
          if (score === undefined || score === "" || score === null) {
            toast.error(
              `Score By Approver is mandatory for question: ${q.particulars}`
            );
            return;
          }
        }
      }

      // Range validation for any provided scores
      const allPendingQuestions = [
        ...financialQuestions,
        ...technicalQuestions,
      ];
      for (const q of allPendingQuestions) {
        const score = scoreByApprover[q.id];
        if (score !== undefined && score !== "" && score !== null) {
          const numScore = Number(score);
          if (numScore > q.totalScore) {
            toast.error(
              `Score By Approver (${numScore}) cannot be greater than Total Score (${q.totalScore}) for: ${q.particulars}`
            );
            return;
          }
          if (numScore < 0) {
            toast.error(
              `Score By Approver cannot be negative for: ${q.particulars}`
            );
            return;
          }
        }
      }

      if (!approverRemark || approverRemark.trim() === "") {
        toast.error("Approver Remark is mandatory");
        return;
      }

      const snagAnswers = {};
      const allQuestionIds = new Set([
        ...Object.keys(scoreByApprover),
        ...Object.keys(remarkByApprover),
      ]);

      allQuestionIds.forEach((id) => {
        let qChecklistId = null;
        checklistConfig.forEach((cat) => {
          cat.subcats.forEach((sub) => {
            const question = sub.questions.find(
              (q) => String(q.id) === String(id)
            );
            if (question) {
              qChecklistId = question.checklist_id;
            }
          });
        });

        snagAnswers[id] = {
          checklist_id: qChecklistId,
          passing_score: Number(scoreByApprover[id]) || 0,
          remarks: remarkByApprover[id] || (markAllNaTechnical ? "NA" : ""),
        };
      });

      const historyIds =
        historyIdsFromUrl ||
        approvalLogs
          .map((log) => log.id)
          .filter((id) => id)
          .join(",");
      const userId = sessionStorage.getItem("user_id") || 45;

      const payload = {
        status: qualificationStatus.toLowerCase(),
        remarks: approverRemark,
        user_id: userId,
        history_ids: historyIds,
        snag_answers: snagAnswers,
        pms_supplier: {
          higher_rate_app: higherRateApplicable,
          pan_aadhar_linked: !panAadharNotLinked,
          withholding_type_id: 2,
          withholding_section_id: Number(withholdingSection) || null,
          type_of_recipient_id: Number(typeOfRecipient) || null,
        },
      };

      const url = `${baseURL}/pms/suppliers/${supplierId}/update_status.json`;
      const config = {
        params: token ? { token } : {},
      };

      console.log("Saving qualification status...", payload);
      const response = await axios.put(url, payload, config);

      if (response.status === 200 || response.status === 204) {
        toast.success("Status updated successfully!");
        // alert("Status updated successfully!");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      const errorMsg =
        error.response?.data?.message ||
        "Failed to update status. Please try again.";
      toast.error(errorMsg);
    }
  };

  const handleRefreshFilingDetails = async () => {
    const gstin = vendorData?.gstin;
    if (!gstin) {
      alert("GSTIN not found in vendor details.");
      return;
    }

    try {
      setRefreshingFiling(true);
      // Use the new API endpoint requested by the user
      const url = `${baseURL}/pms/suppliers/fetch_and_save_return_filing_status?gstin=${gstin}`;
      const config = {
        params: token ? { token } : {},
      };

      console.log(
        "Fetching return filing status from new API for GSTIN:",
        gstin
      );
      const response = await axios.get(url, config);
      const data = response.data;

      if (data && data.data) {
        const filingList = data.data;

        // Map the new API fields to what the UI Expects
        // rtytype -> rtntyp, is_valid -> valid, ret_prd -> ret_period
        const processedList = filingList.map((item) => ({
          ...item,
          ret_period: item.ret_prd,
          rtntyp: item.rtntype,
          valid: item.is_valid,
        }));

        const g1 = processedList.filter(
          (f) => f.rtntyp === "GSTR1" || f.rtntyp === "GSTR-1"
        );
        const g3b = processedList.filter(
          (f) => f.rtntyp === "GSTR3B" || f.rtntyp === "GSTR-3B"
        );

        setGstr1Details(g1);
        setGstr3bDetails(g3b);
        alert(data.message || "Return filing data refreshed successfully!");
      } else {
        alert("No return filing records found or error retrieving details.");
      }
    } catch (error) {
      console.error("Error fetching return filing details:", error);
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while fetching return filing details.";
      alert(errorMessage);
    } finally {
      setRefreshingFiling(false);
    }
  };

  const handleDelegate = async () => {
    // Validate required fields
    if (!delegateRemark.trim()) {
      toast.error("Please enter delegate remark.");
      return;
    }

    if (!delegateDepartment) {
      toast.error("Please select a department.");
      return;
    }

    try {
      // Get the first history_id from URL or logs
      const historyIdStr = historyIdsFromUrl
        ? historyIdsFromUrl.split(",")[0]
        : approvalLogs[0]?.id || "";

      console.log("Selected Department State:", delegateDepartment);
      const deptId = delegateDepartment
        ? parseInt(delegateDepartment, 10)
        : null;

      const payload = {
        history_id:
          historyIdStr && !isNaN(historyIdStr)
            ? Number(historyIdStr)
            : historyIdStr,
        department_id: isNaN(deptId) ? null : deptId,
        delegate_remark: delegateRemark,
      };

      const url = `${baseURL}/pms/admin/invoice_approvals/${supplierId}/delegate_approvals.json`;
      const config = {
        params: token ? { token } : {},
      };

      console.log("Delegating approval with payload:", payload);
      const response = await axios.post(url, payload, config);

      if (
        response.status === 200 ||
        response.status === 201 ||
        response.status === 204
      ) {
        if (response.data && response.data.success === false) {
          toast.error(response.data.error || "Failed to delegate approval.");
          return;
        }
        toast.success("Approval delegated successfully!");
        setShowDelegateApproval(false);
        setDelegateRemark("");
        setDelegateDepartment("");
      }
    } catch (error) {
      console.error("Error delegating approval:", error);
      const apiError =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to delegate approval. Please try again.";
      toast.error(apiError);
    }
  };

  const handleStepClick = (index) => {
    setCurrentStep(index);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>
      <style>{scrollbarStyles}</style>
      {loading ? (
        <div
          className="website-content d-flex justify-content-center align-items-center"
          style={{ minHeight: "80vh" }}
        >
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading Vendor Details...</p>
          </div>
        </div>
      ) : (
        <div className="website-content overflowY-auto">
          <div>
            {/* Top-right buttons */}
            <div
              className="d-flex justify-content-end mx-5 mt-3"
              style={{ gap: 12 }}
            >
              <button
                type="button"
                className="purple-btn2"
                onClick={() => setShowApprovalLog(true)}
              >
                Approval Logs
              </button>
              <button
                type="button"
                className="purple-btn2"
                onClick={() => setShowReturnFiling(true)}
              >
                Return Filling Details
              </button>
              <button
                type="button"
                className="purple-btn2"
                onClick={() => setShowDelegateApproval(true)}
              >
                Delegate
              </button>
            </div>

            {/* Stepper UI */}
            <div
              className="stepper mb-5 d-flex align-items-center justify-content-between mx-5 mt-5"
              style={{ gap: 0 }}
            >
              {steps.map((step, idx) => {
                const isCurrent = currentStep === idx;
                const isCompleted = completed[idx];

                // Unified sizes
                const circleSize = 40;
                const labelMinWidth = 130;
                const labelMaxWidth = 150;

                return (
                  <React.Fragment key={step.label}>
                    <div
                      className="d-flex flex-column align-items-center"
                      style={{
                        minWidth: 70,
                        justifyContent: "center",
                      }}
                    >
                      {/* Step Circle */}
                      <button
                        type="button"
                        className="step-circle btn btn-sm"
                        onClick={() => handleStepClick(idx)}
                        style={{
                          borderRadius: "50%",
                          width: circleSize,
                          height: circleSize,
                          fontWeight: "bold",
                          zIndex: 2,
                          background: isCurrent
                            ? "#e95420"
                            : isCompleted
                            ? "#e95420"
                            : "#fff",
                          color: isCurrent || isCompleted ? "#fff" : "#000",
                          border: `2px solid ${
                            isCurrent || isCompleted ? "#e95420" : "#ccc"
                          }`,
                          boxShadow: isCurrent
                            ? "0 0 8px #e95420"
                            : isCompleted
                            ? "0 0 4px #e95420"
                            : "none",
                          transition: "all 0.3s ease",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                        }}
                      >
                        {idx + 1}
                      </button>

                      {/* Step Label */}
                      <div
                        className="step-label d-flex align-items-center justify-content-center"
                        title={step.label}
                        style={{
                          marginTop: 10,
                          fontSize: 13,
                          minWidth: labelMinWidth,
                          maxWidth: labelMaxWidth,
                          height: 36,
                          textAlign: "center",
                          border: "2px solid #e95420",
                          borderRadius: 8,
                          padding: "4px 8px",
                          background: isCurrent ? "#e95420" : "#fff",
                          color: isCurrent ? "#fff" : "#000",
                          boxShadow: isCurrent
                            ? "0 0 8px #e95420"
                            : isCompleted
                            ? "0 0 4px #e95420"
                            : "none",
                          fontWeight: isCurrent ? "bold" : "normal",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "all 0.3s ease",
                        }}
                      >
                        <span
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            flex: 1,
                          }}
                        >
                          {step.label}
                        </span>
                        {isCompleted && (
                          <span
                            style={{
                              color: "green",
                              fontWeight: "bold",
                              fontSize: 18,
                              marginLeft: 6,
                              display: "inline-flex",
                              alignItems: "center",
                            }}
                          >
                            ✔
                          </span>
                        )}
                      </div>
                    </div>

                    {idx < steps.length - 1 && (
                      <div
                        className="flex-grow-1"
                        style={{
                          height: 2,
                          borderBottom: `2px dotted ${
                            isCompleted ? "#e95420" : "#aaa"
                          }`,
                          margin: "0 4px",
                          background: isCompleted ? "#e95420" : "none",
                          transition: "all 0.3s ease",
                          zIndex: 1,
                        }}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Step Content */}

            {/* Organization Detail */}
            {normalize(steps[currentStep]?.label || "") ===
              normalize("Organization Detail") && (
              <div className="card mx-4 pb-4 mt-4">
                {/* Organization Details Card */}
                <div className="card mx-4 pb-4 mt-4 mt-5">
                  <div className="card-header3">
                    <h3 className="card-title">Organization Details</h3>
                  </div>
                  <div className="card-body mt-0">
                    <div className="row px-3">
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                        <div className="col-4 ">
                          <label>Company</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {organizationData.companyName}
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
                            {organizationData.certifyingCompanyGstin || "-"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                        <div className="col-4 ">
                          <label>Site</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {organizationData.site || "-"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                        <div className="col-6">
                          <label>Department</label>
                        </div>
                        <div className="col-6">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {organizationData.department || "-"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                        <div className="col-4 ">
                          <label>Invited By</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {organizationData.invitedBy || "-"}
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
                            {organizationData.contactNumber || "-"}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Basic Information Card */}
                <div className="card mx-4 pb-4 mt-5">
                  <div className="card-header3">
                    <h3 className="card-title">Basic Information</h3>
                  </div>
                  <div className="card-body mt-0">
                    <div className="row px-3">
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3">
                        <div className="col-4">
                          <label>Vendor Organization Name</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {organizationData.vendorOrganizationName || "-"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3">
                        <div className="col-4">
                          <label>Type of Organization</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {organizationData.organizationType || "-"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 mt-2">
                        <div className="col-4">
                          <label>Nature of Business</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {organizationData.natureOfBusiness || "-"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 mt-2">
                        <div className="col-4">
                          <label>Vendor Type</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {organizationData.vendorType || "-"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 mt-2">
                        <div className="col-4">
                          <label>Type of Industry</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {organizationData.typeOfIndustry || "-"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 mt-2">
                        <div className="col-4">
                          <label>Type of Work</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {organizationData.typeOfWork || "-"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 mt-2">
                        <div className="col-4">
                          <label>Full Name</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {organizationData.fullName || "-"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 mt-2">
                        <div className="col-4">
                          <label>Email</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {organizationData.email || "-"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 mt-2">
                        <div className="col-4">
                          <label>Mobile</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {organizationData.mobile || "-"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 mt-2">
                        <div className="col-4">
                          <label>Key Market</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {organizationData.keyMarket || "-"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 mt-2">
                        <div className="col-4">
                          <label>Schema Group</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {organizationData.schemaGroup || "-"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 mt-2">
                        <div className="col-4">
                          <label>PAN No.</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {organizationData.panNo || "-"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 mt-2">
                        <div className="col-4">
                          <label>PAN Attachment</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {organizationData.panAttachments &&
                            organizationData.panAttachments.length > 0
                              ? organizationData.panAttachments.map(
                                  (file, index) => (
                                    <a
                                      key={index}
                                      href={`${baseURL}${file.file_url}`}
                                      download
                                      className="text-primary d-flex align-items-center mb-1"
                                      style={{ textDecoration: "none" }}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={18}
                                        height={18}
                                        fill="#DE7008"
                                        className="bi bi-download me-2"
                                        viewBox="0 0 16 16"
                                      >
                                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                      </svg>
                                      {file.document_name || "PAN Document"}
                                    </a>
                                  )
                                )
                              : "-"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 mt-2">
                        <div className="col-4">
                          <label>CIN/LLP No.</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {organizationData.cinNo || "-"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 mt-2">
                        <div className="col-4">
                          <label>CIN/LLP Attachment</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {organizationData.cinAttachments &&
                            organizationData.cinAttachments.length > 0
                              ? organizationData.cinAttachments.map(
                                  (file, index) => (
                                    <a
                                      key={index}
                                      href={`${baseURL}${file.file_url}`}
                                      download
                                      className="text-primary d-flex align-items-center mb-1"
                                      style={{ textDecoration: "none" }}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={18}
                                        height={18}
                                        fill="#DE7008"
                                        className="bi bi-download me-2"
                                        viewBox="0 0 16 16"
                                      >
                                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                      </svg>
                                      {file.document_name || "CIN Document"}
                                    </a>
                                  )
                                )
                              : "-"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 mt-2">
                        <div className="col-4">
                          <label>Date of Incorporation</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {organizationData.dateOfIncorporation || "-"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 mt-2">
                        <div className="col-4">
                          <label>GSTIN Applicable</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {organizationData.gstinApplicable || "-"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 mt-2">
                        <div className="col-4">
                          <label>GSTIN Classification</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {organizationData.gstinClassification || "-"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 mt-2">
                        <div className="col-4">
                          <label>GSTIN</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {organizationData.gstin || "-"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 mt-2">
                        <div className="col-4">
                          <label>GSTIN Attachment</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {organizationData.gstinAttachments &&
                            organizationData.gstinAttachments.length > 0
                              ? organizationData.gstinAttachments.map(
                                  (file, index) => (
                                    <a
                                      key={index}
                                      href={`${baseURL}${file.file_url}`}
                                      download
                                      className="text-primary d-flex align-items-center mb-1"
                                      style={{ textDecoration: "none" }}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={18}
                                        height={18}
                                        fill="#DE7008"
                                        className="bi bi-download me-2"
                                        viewBox="0 0 16 16"
                                      >
                                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                      </svg>
                                      {file.document_name || "GSTIN Document"}
                                    </a>
                                  )
                                )
                              : "-"}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Vendor Details Card */}
                <div className="card mx-4 pb-4 mt-5">
                  <div className="card-header3">
                    <h3 className="card-title">Additional Vendor Details</h3>
                  </div>
                  <div className="card-body mt-0">
                    <div className="row px-3">
                      {/* Row 1 */}
                      <div className="col-lg-4 col-md-6 col-sm-12 row px-3">
                        <div className="col-4">
                          <label>Delivery Lead Period (In Days)</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {additionalDetailsData.deliveryLeadPeriod || "-"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-12 row px-3">
                        <div className="col-4">
                          <label>Specify Warranty Period (In Years)</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {additionalDetailsData.warrantyPeriod || "-"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-12 row px-3">
                        <div className="col-4">
                          <label>AMC Provided</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {additionalDetailsData.amcProvided || "-"}
                          </label>
                        </div>
                      </div>

                      {/* Row 2 */}
                      <div className="col-lg-4 col-md-6 col-sm-12 row px-3 mt-2">
                        <div className="col-4">
                          <label>Website</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            <a
                              href={
                                additionalDetailsData.website?.startsWith(
                                  "http"
                                )
                                  ? additionalDetailsData.website
                                  : `https://${additionalDetailsData.website}`
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                color: "#e95420",
                                textDecoration: "underline",
                              }}
                            >
                              {additionalDetailsData.website || "-"}
                            </a>
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-12 row px-3 mt-2">
                        <div className="col-4">
                          <label>Currency Type</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {additionalDetailsData.currencyType || "-"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-12 row px-3 mt-2">
                        <div className="col-4">
                          <label>MSME/Udyam Number Applicable</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {additionalDetailsData.msmeApplicable || "-"}
                          </label>
                        </div>
                      </div>

                      {/* Row 3 */}
                      <div className="col-lg-4 col-md-6 col-sm-12 row px-3 mt-2">
                        <div className="col-4">
                          <label>MSME/Udyam Number</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {additionalDetailsData.msmeNo || "-"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-12 row px-3 mt-2">
                        <div className="col-4">
                          <label>Date of Udyam Registration</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {additionalDetailsData.udyamRegistrationDate || "-"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-12 row px-3 mt-2">
                        <div className="col-4">
                          <label>Classification Year</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {additionalDetailsData.classificationYear || "-"}
                          </label>
                        </div>
                      </div>

                      {/* Row 4 */}
                      <div className="col-lg-4 col-md-6 col-sm-12 row px-3 mt-2">
                        <div className="col-4">
                          <label>Major Activity</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {additionalDetailsData.majorActivity || "-"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-12 row px-3 mt-2">
                        <div className="col-4">
                          <label>MSME/Udyam Valid From</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {additionalDetailsData.validFrom || "-"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-12 row px-3 mt-2">
                        <div className="col-4">
                          <label>MSME/Udyam Valid Till</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {additionalDetailsData.validTill || "-"}
                          </label>
                        </div>
                      </div>

                      {/* Row 5 */}
                      <div className="col-lg-4 col-md-6 col-sm-12 row px-3 mt-2">
                        <div className="col-4">
                          <label>MSME Enterprise Type</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {additionalDetailsData.enterpriseType || "-"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-12 row px-3 mt-2">
                        <div className="col-4">
                          <label>Download Specimen</label>
                        </div>
                        <div className="col-8">
                          <label className="text d-flex align-items-center">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            <a
                              href={
                                additionalDetailsData.msmeApplicable === "Yes"
                                  ? `${baseURL}pms/suppliers/download_specimen?yes_msme=true`
                                  : `${baseURL}pms/suppliers/download_specimen?no_msme=true`
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                color: "#e95420",
                                textDecoration: "underline",
                              }}
                              title="Download Specimen"
                            >
                              <span className="material-symbols-outlined align-middle me-1">
                                download
                              </span>
                              {additionalDetailsData.msmeApplicable === "Yes"
                                ? "Specimen For Yes Msme.pdf"
                                : "Specimen For No Msme.pdf"}
                            </a>
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-12 row px-3 mt-2">
                        <div className="col-4">
                          <label>MSME Attachment</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {additionalDetailsData.msmeAttachments &&
                            additionalDetailsData.msmeAttachments.length > 0
                              ? additionalDetailsData.msmeAttachments.map(
                                  (file, index) => (
                                    <a
                                      key={index}
                                      href={`${baseURL}${file.file_url}`}
                                      download
                                      className="text-primary d-flex align-items-center"
                                      style={{
                                        color: "#e95420",
                                        textDecoration: "none",
                                        marginBottom:
                                          index <
                                          additionalDetailsData.msmeAttachments
                                            .length -
                                            1
                                            ? "8px"
                                            : "0",
                                      }}
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
                                      <span className="me-2 ms-2">
                                        {file.document_name ||
                                          "MSME Certificate"}
                                      </span>
                                    </a>
                                  )
                                )
                              : "No attachments available"}
                          </label>
                        </div>
                      </div>

                      {/* Row 6 */}
                      <div className="col-lg-4 col-md-6 col-sm-12 row px-3 mt-2">
                        <div className="col-4">
                          <label>E-invoicing Applicable</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {additionalDetailsData.einvoicingApplicable || "-"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-12 row px-3 mt-2">
                        <div className="col-4">
                          <label>E-invoicing Attachment</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {additionalDetailsData.einvoicingAttachments &&
                            additionalDetailsData.einvoicingAttachments.length >
                              0
                              ? additionalDetailsData.einvoicingAttachments.map(
                                  (file, index) => (
                                    <a
                                      key={index}
                                      href={`${baseURL}${file.file_url}`}
                                      download
                                      className="text-primary d-flex align-items-center mb-1"
                                      style={{ textDecoration: "none" }}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={18}
                                        height={18}
                                        fill="#DE7008"
                                        className="bi bi-download me-2"
                                        viewBox="0 0 16 16"
                                      >
                                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                      </svg>
                                      {file.document_name ||
                                        "E-invoicing Document"}
                                    </a>
                                  )
                                )
                              : "-"}
                          </label>
                        </div>
                      </div>

                      {/* Extra Rows for previously added fields */}
                      {/* <div className="col-lg-4 col-md-6 col-sm-12 row px-3 mt-2">
                                                    <div className="col-4">
                                                        <label>Purchasing Organization</label>
                                                    </div>
                                                    <div className="col-8">
                                                        <label className="text">
                                                            <span className="me-3">
                                                                <span className="text-dark">:</span>
                                                            </span>
                                                            {additionalDetailsData.purchasingOrganization || "-"}
                                                        </label>
                                                    </div>
                                                </div> */}
                      <div className="col-lg-4 col-md-6 col-sm-12 row px-3 mt-2">
                        <div className="col-4">
                          <label>Business Personality Type</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {additionalDetailsData.businessPersonalityType ||
                              "-"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-12 row px-3 mt-2">
                        <div className="col-4">
                          <label>Term of Payment</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {additionalDetailsData.termOfPayment || "-"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-12 row px-3 mt-2">
                        <div className="col-4">
                          <label>Organization</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {additionalDetailsData.organization || "-"}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="col-lg-2 col-md-2 col-sm-12 mt-2 ms-auto">
                                                    <label htmlFor="status-select" className="form-label">Status</label>
                                                    <select
                                                        className="form-select"
                                                        value={organizationStatus}
                                                        onChange={(e) => setOrganizationStatus(e.target.value)}
                                                        id="status-select"
                                                    >
                                                        <option value="Approved">Approved</option>
                                                        <option value="Pending">Pending</option>
                                                        <option value="Completed">Completed</option>
                                                    </select>
                                                </div> */}
              </div>
            )}

            {/* Communication & Register Address */}
            {normalize(steps[currentStep]?.label || "") ===
              normalize("Communication & Register Address") && (
              <div className="card mx-4 pb-4 mt-4">
                {/* Billing / Registered Office Card */}
                <div className="card mx-3 pb-4 mt-4">
                  <div className="card-header3">
                    <h3 className="card-title">Billing / Registered Office</h3>
                  </div>
                  <div className="card-body mt-0">
                    <div className="row px-3">
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3">
                        <div className="col-4">
                          <label>Address</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {registeredAddressData.address1 || "-"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3">
                        <div className="col-4">
                          <label>Address Line 2</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {registeredAddressData.address2 || "-"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 mt-2">
                        <div className="col-4">
                          <label>Address Line 3</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {registeredAddressData.address3 || "-"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 mt-2">
                        <div className="col-4">
                          <label>Address Line 4</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {registeredAddressData.address4 || "-"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 mt-2">
                        <div className="col-4">
                          <label>Address Line 5</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {registeredAddressData.address5 || "-"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 mt-2">
                        <div className="col-4">
                          <label>Country</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {registeredAddressData.country || "-"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 mt-2">
                        <div className="col-4">
                          <label>State</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {registeredAddressData.state || "-"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 mt-2">
                        <div className="col-4">
                          <label>City</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {registeredAddressData.city || "-"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 mt-2">
                        <div className="col-4">
                          <label>Pin Code</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {registeredAddressData.pincode || "-"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 mt-2">
                        <div className="col-4">
                          <label>Contact Number</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {registeredAddressData.mobile || "-"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 mt-2">
                        <div className="col-4">
                          <label>Ordering Email ID</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {registeredAddressData.orderingEmail || "-"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 mt-2">
                        <div className="col-4">
                          <label>Billing & Accounting Email ID</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {registeredAddressData.billingEmail || "-"}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Communication Address Card */}
                <div className="card mx-3 pb-4 mt-4">
                  <div className="card-header3">
                    <h3 className="card-title">Communication Address</h3>
                  </div>
                  <div className="card-body mt-0">
                    <div className="row ms-1"></div>
                    <div className="row px-3">
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3">
                        <div className="col-4">
                          <label>Address</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {communicationAddressData.address1 || "-"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3">
                        <div className="col-4">
                          <label>Address Line 2</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {communicationAddressData.address2 || "-"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 mt-2">
                        <div className="col-4">
                          <label>Address Line 3</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {communicationAddressData.address3 || "-"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 mt-2">
                        <div className="col-4">
                          <label>Address Line 4</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {communicationAddressData.address4 || "-"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 mt-2">
                        <div className="col-4">
                          <label>Address Line 5</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {communicationAddressData.address5 || "-"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 mt-2">
                        <div className="col-4">
                          <label>Country</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {communicationAddressData.country || "-"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 mt-2">
                        <div className="col-4">
                          <label>State</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {communicationAddressData.state || "-"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 mt-2">
                        <div className="col-4">
                          <label>City</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {communicationAddressData.city || "-"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 mt-2">
                        <div className="col-4">
                          <label>Pin Code</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {communicationAddressData.pincode || "-"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 mt-2">
                        <div className="col-4">
                          <label>Contact Number</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {communicationAddressData.mobile || "-"}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 mt-2">
                        <div className="col-4">
                          <label>Email ID</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {communicationAddressData.orderingEmail || "-"}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bank Details */}
            {normalize(steps[currentStep]?.label || "") ===
              normalize("Bank Details") && (
              <div className="card mx-4 pb-4 mt-4">
                {bankDetailsData.map((bank, idx) => (
                  <div key={idx} className="card mx-3 pb-4 mt-4">
                    <div className="card-header3">
                      <h3 className="card-title">
                        Bank Details
                        {bankDetailsData.length > 1 ? ` (${idx + 1})` : ""}
                      </h3>
                    </div>
                    <div className="card-body mt-0">
                      <div className="row px-3">
                        {/* Row 1 */}
                        <div className="col-lg-4 col-md-6 col-sm-12 row px-3">
                          <div className="col-4">
                            <label>Bank Name</label>
                          </div>
                          <div className="col-8">
                            <label className="text">
                              <span className="me-3">
                                <span className="text-dark">:</span>
                              </span>
                              {bank.bankName || "-"}
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 row px-3">
                          <div className="col-4">
                            <label>Address</label>
                          </div>
                          <div className="col-8">
                            <label className="text">
                              <span className="me-3">
                                <span className="text-dark">:</span>
                              </span>
                              {bank.address || "-"}
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 row px-3 ">
                          <div className="col-4">
                            <label>Country</label>
                          </div>
                          <div className="col-8">
                            <label className="text">
                              <span className="me-3">
                                <span className="text-dark">:</span>
                              </span>
                              {bank.country || "-"}
                            </label>
                          </div>
                        </div>

                        {/* Row 2 */}
                        <div className="col-lg-4 col-md-6 col-sm-12 row px-3 mt-2">
                          <div className="col-4">
                            <label>State</label>
                          </div>
                          <div className="col-8">
                            <label className="text">
                              <span className="me-3">
                                <span className="text-dark">:</span>
                              </span>
                              {bank.state || "-"}
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 row px-3 mt-2">
                          <div className="col-4">
                            <label>City</label>
                          </div>
                          <div className="col-8">
                            <label className="text">
                              <span className="me-3">
                                <span className="text-dark">:</span>
                              </span>
                              {bank.city || "-"}
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 row px-3 mt-2">
                          <div className="col-4">
                            <label>Pin Code</label>
                          </div>
                          <div className="col-8">
                            <label className="text">
                              <span className="me-3">
                                <span className="text-dark">:</span>
                              </span>
                              {bank.pincode || "-"}
                            </label>
                          </div>
                        </div>

                        {/* Row 3 */}
                        <div className="col-lg-4 col-md-6 col-sm-12 row px-3 mt-2">
                          <div className="col-4">
                            <label>Account Type</label>
                          </div>
                          <div className="col-8">
                            <label className="text">
                              <span className="me-3">
                                <span className="text-dark">:</span>
                              </span>
                              {bank.accountType || "-"}
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 row px-3 mt-2">
                          <div className="col-4">
                            <label>Account Number</label>
                          </div>
                          <div className="col-8">
                            <label className="text">
                              <span className="me-3">
                                <span className="text-dark">:</span>
                              </span>
                              {bank.accountNumber || "-"}
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 row px-3 mt-2">
                          <div className="col-4">
                            <label>Confirm Account Number</label>
                          </div>
                          <div className="col-8">
                            <label className="text">
                              <span className="me-3">
                                <span className="text-dark">:</span>
                              </span>
                              {bank.accountNumber || "-"}
                            </label>
                          </div>
                        </div>

                        {/* Row 4 */}
                        <div className="col-lg-4 col-md-6 col-sm-12 row px-3 mt-2">
                          <div className="col-4">
                            <label>Branch Name</label>
                          </div>
                          <div className="col-8">
                            <label className="text">
                              <span className="me-3">
                                <span className="text-dark">:</span>
                              </span>
                              {bank.branchName || "-"}
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 row px-3 mt-2">
                          <div className="col-4">
                            <label>MICR No.</label>
                          </div>
                          <div className="col-8">
                            <label className="text">
                              <span className="me-3">
                                <span className="text-dark">:</span>
                              </span>
                              {bank.micrNumber || "-"}
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 row px-3 mt-2">
                          <div className="col-4">
                            <label>IFSC Code</label>
                          </div>
                          <div className="col-8">
                            <label className="text">
                              <span className="me-3">
                                <span className="text-dark">:</span>
                              </span>
                              {bank.ifscCode || "-"}
                            </label>
                          </div>
                        </div>

                        {/* Row 5 */}
                        <div className="col-lg-4 col-md-6 col-sm-12 row px-3 mt-2">
                          <div className="col-4">
                            <label>Beneficiary Name</label>
                          </div>
                          <div className="col-8">
                            <label className="text">
                              <span className="me-3">
                                <span className="text-dark">:</span>
                              </span>
                              {bank.beneficiaryName || "-"}
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 row px-3 mt-2">
                          <div className="col-4">
                            <label>Virtual Account</label>
                          </div>
                          <div className="col-8">
                            <label className="text">
                              <span className="me-3">
                                <span className="text-dark">:</span>
                              </span>
                              {bank.virtualAccount || "-"}
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 row px-3 mt-2">
                          <div className="col-4">
                            <label>Select Company</label>
                          </div>
                          <div className="col-8">
                            <label className="text">
                              <span className="me-3">
                                <span className="text-dark">:</span>
                              </span>
                              {bank.selectCompany || "-"}
                            </label>
                          </div>
                        </div>

                        {/* Row 6 */}
                        <div className="col-lg-4 col-md-6 col-sm-12 row px-3 mt-2">
                          <div className="col-4">
                            <label>Generated Virtual Account Code</label>
                          </div>
                          <div className="col-8">
                            <label className="text">
                              <span className="me-3">
                                <span className="text-dark">:</span>
                              </span>
                              {bank.virtualAccountCode || "-"}
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 row px-3 mt-2">
                          <div className="col-4">
                            <label>Cancelled Cheque / Bank Copy</label>
                          </div>
                          <div className="col-8">
                            <label className="text">
                              <span className="me-3">
                                <span className="text-dark">:</span>
                              </span>
                              {bank.cancelledCheque ? (
                                <a
                                  href={
                                    bank.cancelledCheque.attachment_url
                                      ? `${baseURL}${bank.cancelledCheque.attachment_url}`
                                      : bank.cancelledCheque.file_url
                                  }
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    color: "#e95420",
                                    textDecoration: "none",
                                  }}
                                  className="d-flex align-items-center"
                                  download
                                >
                                  <span className="material-symbols-outlined align-middle me-1">
                                    download
                                  </span>
                                  {bank.cancelledCheque.document_name}
                                </a>
                              ) : (
                                "-"
                              )}
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 row px-3 mt-2">
                          <div className="col-4">
                            <label>Remark</label>
                          </div>
                          <div className="col-8">
                            <label className="text">
                              <span className="me-3">
                                <span className="text-dark">:</span>
                              </span>
                              {bank.remark || "-"}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Additional Details */}

            {normalize(steps[currentStep]?.label || "") ===
              normalize("Additional Details") && (
              <div className="card mx-4 pb-4 mt-4">
                <div className="card mx-4 pb-4 mt-4">
                  <div className="card-header3">
                    <h3 className="card-title">Client References</h3>
                    <div className="d-flex align-items-center">
                      <img
                        src="/assets/images/Trash.svg"
                        alt="Trash"
                        className="img-fluid ms-3"
                      />
                    </div>
                  </div>
                  <div className="card-body mt-0">
                    <div className="row px-3">
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                        <div className="col-4 ">
                          <label>Site Type</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {clientReferencesData.siteType}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                        <div className="col-6 ">
                          <label>Service Provided From</label>
                        </div>
                        <div className="col-6">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {clientReferencesData.serviceProvidedFrom}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                        <div className="col-4 ">
                          <label>Client Name</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {clientReferencesData.clientName}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                        <div className="col-6 ">
                          <label>Contact Person</label>
                        </div>
                        <div className="col-6">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {clientReferencesData.contactPerson}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                        <div className="col-4 ">
                          <label>Country</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {clientReferencesData.clientCountry}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                        <div className="col-6 ">
                          <label>Contact No.</label>
                        </div>
                        <div className="col-6">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {clientReferencesData.contactNo}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                        <div className="col-4 ">
                          <label>WO/PO Amount in Last 12 month in lacs</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {clientReferencesData.woPoAmount}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                        <div className="col-6 ">
                          <label>Stage Of Project</label>
                        </div>
                        <div className="col-6">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {clientReferencesData.stageOfProject}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                        <div className="col-4 ">
                          <label>Product or Service Provided</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {clientReferencesData.productOrServiceProvided}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Factory Warehouse Details Card */}
                <div className="card mx-4 pb-4 mt-4">
                  <div className="card-header3">
                    <h3 className="card-title">Factory Warehouse Details</h3>
                    <div className="d-flex align-items-center">
                      <img
                        src="/assets/images/Trash.svg"
                        alt="Trash"
                        className="img-fluid ms-3"
                      />
                    </div>
                  </div>
                  <div className="card-body mt-0">
                    <div className="row px-3">
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                        <div className="col-4 ">
                          <label>Address</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {factoryWarehouseDetailsData.factoryAddress}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                        <div className="col-6 ">
                          <label>Country</label>
                        </div>
                        <div className="col-6">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {factoryWarehouseDetailsData.factoryCountry}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                        <div className="col-4 ">
                          <label>State</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {factoryWarehouseDetailsData.factoryState}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                        <div className="col-6 ">
                          <label>City</label>
                        </div>
                        <div className="col-6">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {factoryWarehouseDetailsData.factoryCity}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                        <div className="col-4 ">
                          <label>Contact Number</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {factoryWarehouseDetailsData.factoryContactNumber}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                        <div className="col-6 ">
                          <label>Contact Person</label>
                        </div>
                        <div className="col-6">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {factoryWarehouseDetailsData.factoryContactPerson}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                        <div className="col-4 ">
                          <label>Contact Person Email</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {
                              factoryWarehouseDetailsData.factoryContactPersonEmail
                            }
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                        <div className="col-6 ">
                          <label>Attachment Existing File</label>
                        </div>
                        <div className="col-6">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {factoryWarehouseDetailsData.factoryAttachment ? (
                              <a
                                href={
                                  factoryWarehouseDetailsData.factoryAttachment
                                    .attachment_url
                                }
                                download
                                className="d-flex align-items-center"
                                style={{
                                  color: "#e95420",
                                  textDecoration: "none",
                                }}
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
                                <span className="me-2 ms-2">
                                  {
                                    factoryWarehouseDetailsData
                                      .factoryAttachment.document_name
                                  }
                                </span>
                              </a>
                            ) : (
                              "No file chosen"
                            )}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Owner / Director Details Card */}
                <div className="card mx-4 pb-4 mt-4">
                  <div className="card-header3">
                    <h3 className="card-title">Owner / Director Details</h3>
                    <div className="d-flex align-items-center">
                      <img
                        src="/assets/images/Trash.svg"
                        alt="Trash"
                        className="img-fluid ms-3"
                      />
                    </div>
                  </div>
                  <div className="card-body mt-0">
                    <div className="row px-3">
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                        <div className="col-4 ">
                          <label>First Name</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {ownerDirectorDetailsData.ownerFirstName}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                        <div className="col-6 ">
                          <label>Last Name</label>
                        </div>
                        <div className="col-6">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {ownerDirectorDetailsData.ownerLastName}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                        <div className="col-4 ">
                          <label>Designation</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {ownerDirectorDetailsData.ownerDesignation}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                        <div className="col-6 ">
                          <label>Qualification</label>
                        </div>
                        <div className="col-6">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {ownerDirectorDetailsData.ownerQualification}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                        <div className="col-4 ">
                          <label>Experience</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {ownerDirectorDetailsData.ownerExperience}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                        <div className="col-6 ">
                          <label>Email</label>
                        </div>
                        <div className="col-6">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {ownerDirectorDetailsData.ownerEmail}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                        <div className="col-4 ">
                          <label>Contact Number</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {ownerDirectorDetailsData.ownerContactNumber}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                        <div className="col-6 ">
                          <label>Attachment Existing File</label>
                        </div>
                        <div className="col-6">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {ownerDirectorDetailsData.ownerAttachment ? (
                              <a
                                href={
                                  ownerDirectorDetailsData.ownerAttachment
                                    .attachment_url
                                }
                                download
                                className="d-flex align-items-center"
                                style={{
                                  color: "#e95420",
                                  textDecoration: "none",
                                }}
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
                                <span className="me-2 ms-2">
                                  {
                                    ownerDirectorDetailsData.ownerAttachment
                                      .document_name
                                  }
                                </span>
                              </a>
                            ) : (
                              "No file chosen"
                            )}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Branch Office Details Card */}
                <div className="card mx-4 pb-4 mt-4">
                  <div className="card-header3">
                    <h3 className="card-title">Branch Office Details</h3>
                    <div className="d-flex align-items-center">
                      <img
                        src="/assets/images/Trash.svg"
                        alt="Trash"
                        className="img-fluid ms-3"
                      />
                    </div>
                  </div>
                  <div className="card-body mt-0">
                    <div className="row px-3">
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                        <div className="col-4 ">
                          <label>Address</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {branchOfficeDetailsData.branchAddress}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                        <div className="col-6 ">
                          <label>Country</label>
                        </div>
                        <div className="col-6">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {branchOfficeDetailsData.branchCountry}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                        <div className="col-4 ">
                          <label>State</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {branchOfficeDetailsData.branchState}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                        <div className="col-6 ">
                          <label>City</label>
                        </div>
                        <div className="col-6">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {branchOfficeDetailsData.branchCity}
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                        <div className="col-4 ">
                          <label>Pin Code</label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark">:</span>
                            </span>
                            {branchOfficeDetailsData.branchPinCode}
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
                            {branchOfficeDetailsData.branchContactNumber}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Person Details Section */}
                {contactPersonDetailsData.length > 0 &&
                  contactPersonDetailsData.map((contact, index) => (
                    <div key={index} className="card mx-4 pb-4 mt-4">
                      <div className="card-header3">
                        <h3 className="card-title">
                          Contact Person Details{" "}
                          {contactPersonDetailsData.length > 1
                            ? `(${index + 1})`
                            : ""}
                        </h3>
                        <div className="d-flex align-items-center">
                          <img
                            src="/assets/images/Trash.svg"
                            alt="Trash"
                            className="img-fluid ms-3"
                          />
                        </div>
                      </div>
                      <div className="card-body mt-0">
                        <div className="row px-3">
                          {/* Row 1 */}
                          <div className="col-lg-4 col-md-4 col-sm-12 row px-3">
                            <div className="col-4">
                              <label>Escalation Level</label>
                            </div>
                            <div className="col-8">
                              <label className="text">
                                <span className="me-3">
                                  <span className="text-dark">:</span>
                                </span>
                                {contact.escalationLevel}
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-12 row px-3">
                            <div className="col-4">
                              <label>Name Title</label>
                            </div>
                            <div className="col-8">
                              <label className="text">
                                <span className="me-3">
                                  <span className="text-dark">:</span>
                                </span>
                                {contact.nameTitle}
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-12 row px-3">
                            <div className="col-4">
                              <label>First Name</label>
                            </div>
                            <div className="col-8">
                              <label className="text">
                                <span className="me-3">
                                  <span className="text-dark">:</span>
                                </span>
                                {contact.firstName}
                              </label>
                            </div>
                          </div>

                          {/* Row 2 */}
                          <div className="col-lg-4 col-md-4 col-sm-12 row px-3 mt-2">
                            <div className="col-4">
                              <label>Last Name</label>
                            </div>
                            <div className="col-8">
                              <label className="text">
                                <span className="me-3">
                                  <span className="text-dark">:</span>
                                </span>
                                {contact.lastName}
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-12 row px-3 mt-2">
                            <div className="col-4">
                              <label>Designation</label>
                            </div>
                            <div className="col-8">
                              <label className="text">
                                <span className="me-3">
                                  <span className="text-dark">:</span>
                                </span>
                                {contact.designation}
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-12 row px-3 mt-2">
                            <div className="col-4">
                              <label>Primary Email ID</label>
                            </div>
                            <div className="col-8">
                              <label className="text">
                                <span className="me-3">
                                  <span className="text-dark">:</span>
                                </span>
                                {contact.primaryEmailId}
                              </label>
                            </div>
                          </div>

                          {/* Row 3 */}
                          <div className="col-lg-4 col-md-4 col-sm-12 row px-3 mt-2">
                            <div className="col-4">
                              <label>Secondary Email ID</label>
                            </div>
                            <div className="col-8">
                              <label className="text">
                                <span className="me-3">
                                  <span className="text-dark">:</span>
                                </span>
                                {contact.secondaryEmailId}
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-12 row px-3 mt-2">
                            <div className="col-4">
                              <label>Primary Contact No.</label>
                            </div>
                            <div className="col-8">
                              <label className="text">
                                <span className="me-3">
                                  <span className="text-dark">:</span>
                                </span>
                                {contact.primaryContactNo}
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-12 row px-3 mt-2">
                            <div className="col-4">
                              <label>Secondary Contact No.</label>
                            </div>
                            <div className="col-8">
                              <label className="text">
                                <span className="me-3">
                                  <span className="text-dark">:</span>
                                </span>
                                {contact.secondaryContactNo}
                              </label>
                            </div>
                          </div>

                          {/* Row 4 */}
                          <div className="col-lg-4 col-md-4 col-sm-12 row px-3 mt-2">
                            <div className="col-4">
                              <label>Nationality</label>
                            </div>
                            <div className="col-8">
                              <label className="text">
                                <span className="me-3">
                                  <span className="text-dark">:</span>
                                </span>
                                {contact.nationality}
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-12 row px-3 mt-2">
                            <div className="col-4">
                              <label>Date of Birth</label>
                            </div>
                            <div className="col-8">
                              <label className="text">
                                <span className="me-3">
                                  <span className="text-dark">:</span>
                                </span>
                                {contact.dateOfBirth}
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-12 row px-3 mt-2">
                            <div className="col-4">
                              <label>Attachment Existing File</label>
                            </div>
                            <div className="col-8">
                              <label className="text">
                                <span className="me-3">
                                  <span className="text-dark">:</span>
                                </span>
                                {contact.attachment ? (
                                  <a
                                    href={`${baseURL}${contact.attachment.attachment_url}`}
                                    download
                                    className="d-flex align-items-center"
                                    style={{
                                      color: "#e95420",
                                      textDecoration: "none",
                                    }}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width={18}
                                      height={18}
                                      fill="#DE7008"
                                      className="bi bi-download"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                      <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                    </svg>
                                    <span className="ms-2">
                                      {contact.attachment.document_name}
                                    </span>
                                  </a>
                                ) : (
                                  "-"
                                )}
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                {/* Annual Turnover Table */}
                <div className="card mx-3 pb-4 mt-4">
                  <div className="card-header3 mb-3">
                    <h3 className="card-title">Annual Turnover</h3>
                  </div>
                  <div
                    className="tbl-container mx-3 mt-3"
                    style={{ overflowX: "auto", display: "block" }}
                  >
                    <table className="w-100">
                      <thead>
                        <tr>
                          <th className="text-start">FY</th>
                          <th className="text-start">TurnOver</th>
                          <th className="text-start">Attachment</th>
                        </tr>
                      </thead>
                      <tbody>
                        {prequalificationData.annualTurnover.length > 0 ? (
                          prequalificationData.annualTurnover.map((at, idx) => (
                            <tr key={idx}>
                              <td className="text-start">{at.year}</td>
                              <td className="text-start">
                                {!at.turnover || at.turnover === "null"
                                  ? "Not available"
                                  : at.turnover}
                              </td>
                              <td className="text-start">
                                {at.attachmentUrl ? (
                                  <a
                                    href={at.attachmentUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                      color: "#e95420",
                                      textDecoration: "underline",
                                    }}
                                  >
                                    {at.attachmentName}
                                  </a>
                                ) : (
                                  at.attachmentName || "No file attached"
                                )}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="3" className="text-center py-3">
                              No turnover data available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Statutory Details */}
            {normalize(steps[currentStep]?.label || "") ===
              normalize("Statutory Details") && (
              <div className="card mx-4 pb-4 mt-4">
                <div className="card-header3">
                  <h3 className="card-title">Statutory Details</h3>
                </div>
                <div className="card-body mt-0">
                  <div className="row px-3">
                    {/* <div className="col-lg-6 col-md-6 col-sm-12 row px-3 mt-2">
                                    <div className="col-4">
                                        <label>PAN Number</label>
                                    </div>
                                    <div className="col-8">
                                        <label className="text">
                                            <span className="me-3">
                                                <span className="text-dark">:</span>
                                            </span>
                                            {statutoryDetailsData.panNo}
                                        </label>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12 row px-3 mt-2">
                                    <div className="col-4">
                                        <label>GST Number</label>
                                    </div>
                                    <div className="col-8">
                                        <label className="text">
                                            <span className="me-3">
                                                <span className="text-dark">:</span>
                                            </span>
                                            {statutoryDetailsData.gstNo}
                                        </label>
                                    </div>
                                </div> */}

                    {/* Dynamically render all statutory details */}
                    {statutoryDetailsData.statutoryDetails &&
                    statutoryDetailsData.statutoryDetails.length > 0
                      ? statutoryDetailsData.statutoryDetails.map(
                          (detail, index) => (
                            <React.Fragment key={detail.id || index}>
                              <div className="col-lg-6 col-md-6 col-sm-12 row px-3 mt-2">
                                <div className="col-4">
                                  <label>{detail.name}</label>
                                </div>
                                <div className="col-8">
                                  <label className="text d-flex align-items-center">
                                    <span className="me-3">
                                      <span className="text-dark">:</span>
                                    </span>
                                    {detail.value}
                                  </label>
                                </div>
                              </div>
                              {detail.attachment && (
                                <div className="col-lg-6 col-md-6 col-sm-12 row px-3 mt-2">
                                  <div className="col-4">
                                    <label>Attachment</label>
                                  </div>
                                  <div className="col-8">
                                    <label className="text">
                                      <div className="d-flex align-items-center">
                                        <span className="me-3">
                                          <span className="text-dark">:</span>
                                        </span>
                                        <a
                                          href={
                                            detail.attachment.attachment_url
                                              ? `${baseURL}${detail.attachment.attachment_url}`
                                              : detail.attachment.file_url
                                              ? `${baseURL}${detail.attachment.file_url}`
                                              : detail.attachment.url
                                          }
                                          download
                                          className="text-primary d-flex align-items-center"
                                          style={{ textDecoration: "none" }}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={18}
                                            height={18}
                                            fill="#DE7008"
                                            className="bi bi-download me-2"
                                            viewBox="0 0 16 16"
                                          >
                                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                          </svg>
                                          {detail.attachment.document_name ||
                                            detail.attachment.filename ||
                                            "View Document"}
                                        </a>
                                      </div>
                                    </label>
                                  </div>
                                </div>
                              )}
                            </React.Fragment>
                          )
                        )
                      : null}
                  </div>
                </div>
              </div>
            )}

            {/* Prequalification */}
            {normalize(steps[currentStep]?.label || "") ===
              normalize("Prequalification") && (
              <>
                {/* Financial Pre-Qualification */}
                <div
                  className="card mx-4 mt-5 pb-4"
                  style={{ overflow: "hidden" }}
                >
                  <div className="card-header3 mb-3">
                    <h3 className="card-title">Financial Pre-Qualification</h3>
                  </div>
                  <div
                    className="tbl-container mx-3 mt-3"
                    style={{ overflowX: "auto", display: "block" }}
                  >
                    <table className="w-100" style={{ minWidth: "1200px" }}>
                      <thead>
                        <tr>
                          <th className="text-start" style={{ width: 66 }}>
                            Sr. No.
                          </th>
                          <th className="text-start">Particulars</th>
                          <th className="text-start">Vendor Reply</th>
                          <th className="text-start">Required Documents</th>
                          <th className="text-start">Remark by Vendor</th>
                          <th className="text-start">Total Score</th>
                          <th className="text-start">Passing Score</th>
                          <th className="text-start" style={{ width: 200 }}>
                            Score By Approver
                          </th>
                          <th className="text-start" style={{ width: 200 }}>
                            Remark by Approver
                          </th>
                          <th
                            className="text-center"
                            style={{ width: 180, minWidth: 180 }}
                          >
                            <div
                              className="d-flex align-items-center justify-content-center"
                              style={{ gap: "6px" }}
                            >
                              <span
                                style={{
                                  fontSize: "12px",
                                  whiteSpace: "nowrap",
                                  fontWeight: "700",
                                }}
                              >
                                Mark All NA
                              </span>
                              <div
                                className="form-check form-switch mb-0 p-0"
                                style={{ minHeight: "unset" }}
                              >
                                <input
                                  className="form-check-input mark-all-na-toggle"
                                  type="checkbox"
                                  role="switch"
                                  style={{
                                    cursor: "pointer",
                                    margin: 0,
                                    float: "none",
                                    marginLeft: 0,
                                  }}
                                  id="markAllNaToggle_fin"
                                  checked={markAllNaFinancial}
                                  onChange={(e) =>
                                    setMarkAllNaFinancial(e.target.checked)
                                  }
                                  disabled={!isFinancialEditable}
                                />
                                <label
                                  className="form-check-label visually-hidden"
                                  htmlFor="markAllNaToggle_fin"
                                >
                                  Toggle to mark all remarks as NA
                                </label>
                              </div>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {financialPreQualSections.map((section) => (
                          <React.Fragment key={section.id}>
                            <tr>
                              <td
                                className="text-start"
                                style={{
                                  color: "#000",
                                  fontWeight: "bold",
                                  fontSize: "1.1em",
                                  backgroundColor: "#f5f5f5",
                                }}
                              >
                                {section.srNo}
                              </td>
                              <td
                                className="text-start"
                                style={{
                                  color: "#000",
                                  fontWeight: "bold",
                                  fontSize: "1.1em",
                                  backgroundColor: "#f5f5f5",
                                }}
                              >
                                {section.title}
                              </td>
                              <td style={{ backgroundColor: "#f5f5f5" }} />
                              <td style={{ backgroundColor: "#f5f5f5" }} />
                              <td style={{ backgroundColor: "#f5f5f5" }} />
                              <td
                                className="text-start"
                                style={{
                                  color: "#000",
                                  fontWeight: "bold",
                                  fontSize: "1.1em",
                                  backgroundColor: "#f5f5f5",
                                }}
                              >
                                {section.totalScore}
                              </td>
                              <td
                                className="text-start total_passing_score"
                                style={{
                                  color: "#000",
                                  fontWeight: "bold",
                                  fontSize: "1.1em",
                                  backgroundColor: "#f5f5f5",
                                }}
                              >
                                {section.passingScore}
                              </td>
                              <td style={{ backgroundColor: "#f5f5f5" }} />
                              <td style={{ backgroundColor: "#f5f5f5" }} />
                              <td style={{ backgroundColor: "#f5f5f5" }} />
                            </tr>
                            {section.items.map((row) => (
                              <tr key={row.id}>
                                <td className="text-start">{row.srNo}</td>
                                <td className="text-start">
                                  {row.particulars}{" "}
                                  {/* <i style={{ fontSize: 16, color: "black", marginLeft: 6 }} className="fa">
                                                                            {"\uF129"}
                                                                        </i> */}
                                </td>
                                <td className="text-start">
                                  {markAllNaFinancial ? "NA" : row.vendorReply}
                                </td>
                                <td className="text-start">
                                  {row.documentUrl ? (
                                    <a
                                      href={row.documentUrl}
                                      download
                                      className="d-flex align-items-center"
                                      style={{
                                        color: "#e95420",
                                        textDecoration: "none",
                                      }}
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
                                      <span className="me-2 ms-2">
                                        {row.requiredDocuments ||
                                          "Document Attached"}
                                      </span>
                                    </a>
                                  ) : (
                                    row.requiredDocuments || "-"
                                  )}
                                </td>
                                <td>{row.remarkByVendor}</td>
                                <td>{row.totalScore}</td>
                                <td></td>
                                <td>
                                  <input
                                    type="number"
                                    className="form-control passing_score"
                                    max={row.totalScore}
                                    min={0}
                                    value={scoreByApprover[row.id] ?? ""}
                                    disabled={!isFinancialEditable}
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      if (
                                        val === "" ||
                                        (Number(val) <= row.totalScore &&
                                          Number(val) >= 0)
                                      ) {
                                        setScoreByApprover((p) => ({
                                          ...p,
                                          [row.id]: val,
                                        }));
                                      } else if (Number(val) > row.totalScore) {
                                        toast.warn(
                                          `Score cannot exceed total score (${row.totalScore})`
                                        );
                                        setScoreByApprover((p) => ({
                                          ...p,
                                          [row.id]: row.totalScore,
                                        }));
                                      }
                                    }}
                                  />
                                </td>
                                <td>
                                  <textarea
                                    className="form-control approver-remark-textarea"
                                    value={
                                      remarkByApprover[row.id] ??
                                      (markAllNaFinancial ? "NA" : "")
                                    }
                                    disabled={!isFinancialEditable}
                                    onChange={(e) =>
                                      setRemarkByApprover((p) => ({
                                        ...p,
                                        [row.id]: e.target.value,
                                      }))
                                    }
                                  />
                                </td>
                                <td />
                              </tr>
                            ))}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="details_page">
                    <div className="row px-3">
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3">
                        <div className="col-4">
                          <label className="fw-bold">
                            Total Obtained Marks
                          </label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark total_score">
                                : {totalObtainedMarks}
                              </span>
                            </span>
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3">
                        <div className="col-4">
                          <label className="fw-bold">
                            Qualification Status
                          </label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark status unqualified">
                                : Pending
                              </span>
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Technical Pre-Qualification */}
                <div
                  className="card mx-4 mt-5 pb-4"
                  style={{ overflow: "hidden" }}
                >
                  <div className="card-header3 mb-3">
                    <h3 className="card-title">Technical Pre-Qualification</h3>
                  </div>
                  <div
                    className="tbl-container mx-3 mt-3"
                    style={{ overflowX: "auto", display: "block" }}
                  >
                    <table className="w-100" style={{ minWidth: "1200px" }}>
                      <thead>
                        <tr>
                          <th className="text-start" style={{ width: 66 }}>
                            Sr. No.
                          </th>
                          <th className="text-start">Particulars</th>
                          <th className="text-start">Vendor Reply</th>
                          <th className="text-start">Required Documents</th>
                          <th className="text-start">Remark by Vendor</th>
                          <th className="text-start">Total Score</th>
                          <th className="text-start">Passing Score</th>
                          <th className="text-start" style={{ width: 200 }}>
                            Score By Approver
                          </th>
                          <th className="text-start" style={{ width: 200 }}>
                            Remark by Approver
                          </th>
                          <th
                            className="text-center"
                            style={{ width: 180, minWidth: 180 }}
                          >
                            <div
                              className="d-flex align-items-center justify-content-center"
                              style={{ gap: "6px" }}
                            >
                              <span
                                style={{
                                  fontSize: "12px",
                                  whiteSpace: "nowrap",
                                  fontWeight: "700",
                                }}
                              >
                                Mark All NA
                              </span>
                              <div
                                className="form-check form-switch mb-0 p-0"
                                style={{ minHeight: "unset" }}
                              >
                                <input
                                  className="form-check-input mark-all-na-toggle"
                                  type="checkbox"
                                  role="switch"
                                  style={{
                                    cursor: "pointer",
                                    margin: 0,
                                    float: "none",
                                    marginLeft: 0,
                                  }}
                                  id="markAllNaToggle_tech"
                                  checked={markAllNaTechnical}
                                  onChange={(e) =>
                                    setMarkAllNaTechnical(e.target.checked)
                                  }
                                  disabled={!isTechnicalEditable}
                                />
                                <label
                                  className="form-check-label visually-hidden"
                                  htmlFor="markAllNaToggle_tech"
                                >
                                  Toggle to mark all remarks as NA
                                </label>
                              </div>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {technicalPreQualSections.map((section) => (
                          <React.Fragment key={section.id}>
                            <tr>
                              <td
                                className="text-start"
                                style={{
                                  color: "#000",
                                  fontWeight: "bold",
                                  fontSize: "1.1em",
                                  backgroundColor: "#f5f5f5",
                                }}
                              >
                                {section.srNo}
                              </td>
                              <td
                                className="text-start"
                                style={{
                                  color: "#000",
                                  fontWeight: "bold",
                                  fontSize: "1.1em",
                                  backgroundColor: "#f5f5f5",
                                }}
                              >
                                {section.title}
                              </td>
                              <td style={{ backgroundColor: "#f5f5f5" }} />
                              <td style={{ backgroundColor: "#f5f5f5" }} />
                              <td style={{ backgroundColor: "#f5f5f5" }} />
                              <td
                                className="text-start"
                                style={{
                                  color: "#000",
                                  fontWeight: "bold",
                                  fontSize: "1.1em",
                                  backgroundColor: "#f5f5f5",
                                }}
                              >
                                {section.totalScore}
                              </td>
                              <td
                                className="text-start total_passing_score"
                                style={{
                                  color: "#000",
                                  fontWeight: "bold",
                                  fontSize: "1.1em",
                                  backgroundColor: "#f5f5f5",
                                }}
                              >
                                {section.passingScore}
                              </td>
                              <td style={{ backgroundColor: "#f5f5f5" }} />
                              <td style={{ backgroundColor: "#f5f5f5" }} />
                              <td style={{ backgroundColor: "#f5f5f5" }} />
                            </tr>
                            {section.items.map((row) => (
                              <tr key={row.id}>
                                <td className="text-start">{row.srNo}</td>
                                <td className="text-start">
                                  {row.particulars}{" "}
                                  {/* <i style={{ fontSize: 16, color: "black", marginLeft: 6 }} className="fa">
                                                                            {"\uF129"}
                                                                        </i> */}
                                </td>
                                <td className="text-start">
                                  {markAllNaTechnical ? "NA" : row.vendorReply}
                                </td>
                                <td className="text-start">
                                  {row.documentUrl ? (
                                    <a
                                      href={row.documentUrl}
                                      download
                                      className="d-flex align-items-center"
                                      style={{
                                        color: "#e95420",
                                        textDecoration: "none",
                                      }}
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
                                      <span className="me-2 ms-2">
                                        {row.requiredDocuments ||
                                          "Document Attached"}
                                      </span>
                                    </a>
                                  ) : (
                                    row.requiredDocuments || "-"
                                  )}
                                </td>
                                <td>{row.remarkByVendor}</td>
                                <td>{row.totalScore}</td>
                                <td></td>
                                <td>
                                  <input
                                    type="number"
                                    className="form-control passing_score"
                                    max={row.totalScore}
                                    min={0}
                                    value={scoreByApprover[row.id] ?? ""}
                                    disabled={!isTechnicalEditable}
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      if (
                                        val === "" ||
                                        (Number(val) <= row.totalScore &&
                                          Number(val) >= 0)
                                      ) {
                                        setScoreByApprover((p) => ({
                                          ...p,
                                          [row.id]: val,
                                        }));
                                      } else if (Number(val) > row.totalScore) {
                                        toast.warn(
                                          `Score cannot exceed total score (${row.totalScore})`
                                        );
                                        setScoreByApprover((p) => ({
                                          ...p,
                                          [row.id]: row.totalScore,
                                        }));
                                      }
                                    }}
                                  />
                                </td>
                                <td>
                                  <textarea
                                    className="form-control approver-remark-textarea"
                                    value={
                                      remarkByApprover[row.id] ??
                                      (markAllNaTechnical ? "NA" : "")
                                    }
                                    disabled={!isTechnicalEditable}
                                    onChange={(e) =>
                                      setRemarkByApprover((p) => ({
                                        ...p,
                                        [row.id]: e.target.value,
                                      }))
                                    }
                                  />
                                </td>
                                <td />
                              </tr>
                            ))}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="details_page">
                    <div className="row px-3">
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3">
                        <div className="col-4">
                          <label className="fw-bold">
                            Total Obtained Marks
                          </label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark total_score">
                                : {totalObtainedMarks}
                              </span>
                            </span>
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 row px-3">
                        <div className="col-4">
                          <label className="fw-bold">
                            Qualification Status
                          </label>
                        </div>
                        <div className="col-8">
                          <label className="text">
                            <span className="me-3">
                              <span className="text-dark status unqualified">
                                : Pending
                              </span>
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom remarks + status + save */}
                <div className="mt-4 mx-4">
                  <div className="mx-1">
                    <div className="mb-2">
                      <label>Invitation Remark</label>
                    </div>
                    <textarea
                      className="form-control"
                      rows={3}
                      value={invitationRemark}
                      onChange={(e) => setInvitationRemark(e.target.value)}
                    />
                  </div>

                  <div className="card mx-2 pb-4 mt-4">
                    <div>
                      <h3
                        className="card-title"
                        style={{ color: "white", margin: 0, fontSize: "14px" }}
                      >
                        Withholding Tax Data
                      </h3>
                    </div>
                    <div className="card-body mt-4">
                      <div className="row px-3">
                        <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
                          <label className="form-label">
                            Withholding Section{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <select
                            className="form-select"
                            value={withholdingSection}
                            onChange={(e) =>
                              setWithholdingSection(e.target.value)
                            }
                          >
                            <option value="">Select Withholding Section</option>
                            {withholdingSections.map((ws) => (
                              <option key={ws.value} value={ws.value}>
                                {ws.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
                          <label className="form-label">
                            Type Of Recipient{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <select
                            className="form-select"
                            value={typeOfRecipient}
                            onChange={(e) => setTypeOfRecipient(e.target.value)}
                          >
                            <option value="">Select Type Of Recipient</option>
                            {typeOfRecipients.map((tr) => (
                              <option key={tr.value} value={tr.value}>
                                {tr.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card mx-2  mt-4">
                    <div
                    // style={{ background: '#e95420', width: 'fit-content', borderRadius: '4px', padding: '5px 15px', marginTop: '-15px', marginLeft: '15px' }}
                    >
                      <h3
                        className="card-title"
                        // style={{ color: 'white', margin: 0, fontSize: '14px' }}
                      >
                        206AB Compliance
                      </h3>
                    </div>
                    <div className="card-body mt-6">
                      <div className="row px-2 mt-4">
                        <div className="col-lg-6 col-md-6 col-sm-12 d-flex align-items-center">
                          <input
                            type="checkbox"
                            className="form-check-input me-2"
                            checked={higherRateApplicable}
                            onChange={(e) =>
                              setHigherRateApplicable(e.target.checked)
                            }
                          />
                          <label className="form-check-label">
                            Higher Rate Applicable
                          </label>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 d-flex align-items-center mt-4">
                          <input
                            type="checkbox"
                            className="form-check-input me-2"
                            checked={panAadharNotLinked}
                            onChange={(e) =>
                              setPanAadharNotLinked(e.target.checked)
                            }
                          />
                          <label className="form-check-label">
                            Pan & Aadhar Not Linked
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mx-1 mt-3">
                    <div className="mb-2">
                      <label>
                        Approver Remark <span style={{ color: "red" }}>*</span>
                      </label>
                    </div>
                    <textarea
                      className="form-control"
                      rows={4}
                      value={approverRemark}
                      onChange={(e) => setApproverRemark(e.target.value)}
                    />
                  </div>

                  <div className="d-flex justify-content-end mt-3">
                    <div style={{ minWidth: 260 }}>
                      <label className="mb-1">Status</label>
                      <select
                        className="form-select"
                        value={qualificationStatus}
                        onChange={(e) => setQualificationStatus(e.target.value)}
                      >
                        <option value="">Select Status</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                        <option value="request_for_resubmission">
                          Request For Resubmission
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Save and Cancel buttons moved to bottom navigation bar */}
                </div>
              </>
            )}
          </div>

          {/* Navigation Buttons - Back, Save, Cancel, Next */}
          <div className="d-flex justify-content-center align-items-center gap-3 mb-4 mt-4 mx-5 flex-wrap">
            {currentStep > 0 && (
              <button
                type="button"
                className="purple-btn1 px-4 py-2"
                onClick={handlePrevious}
                style={{ minWidth: "100px", margin: 0 }}
              >
                Back
              </button>
            )}

            {normalize(steps[currentStep]?.label) === "prequalification" && (
              <>
                <button
                  type="button"
                  className="purple-btn2 px-4 py-2"
                  onClick={handleSave}
                  style={{ minWidth: "100px", margin: 0 }}
                >
                  Save
                </button>
                {/* <button
                                type="button"
                                className="purple-btn2 px-4 py-2"
                                onClick={() => {
                                    setApproverRemark("");
                                }}
                                style={{ minWidth: '100px', margin: 0 }}
                            >
                                Cancel
                            </button> */}
              </>
            )}

            {currentStep < steps.length - 1 && (
              <button
                type="button"
                className="purple-btn1 px-4 py-2"
                onClick={handleNext}
                style={{
                  backgroundColor: "#f57c00",
                  color: "#fff",
                  border: "none",
                  fontWeight: "500",
                  minWidth: "100px",
                  margin: 0,
                }}
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}

      {/* Approval Log Modal */}
      <DynamicModalBox
        show={showApprovalLog}
        onHide={() => setShowApprovalLog(false)}
        size="xl"
        title="Approval Log"
      >
        <div className="row mt-1 px-2">
          <div className="col-12">
            <div className="tbl-container me-2 mt-3 overflow-auto">
              <table
                className="w-100 table table-bordered"
                style={{ width: "100% !important" }}
              >
                <thead>
                  <tr>
                    <th style={{ width: "66px" }}>Sr.No.</th>
                    <th>Category</th>
                    <th>Sub Category</th>
                    <th>Approval Section</th>
                    <th>Approved By</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Remark</th>
                    <th>Delegate To</th>
                    <th>Delegate Remark</th>
                    <th>Users</th>
                  </tr>
                </thead>
                <tbody>
                  {approvalLogs.map((row) => (
                    <tr key={row.srNo}>
                      <td>{row.srNo}</td>
                      <td>{row.category}</td>
                      <td>{row.subCategory}</td>
                      <td>{row.approvalSection}</td>
                      <td>{row.approvedBy}</td>
                      <td>{row.date}</td>
                      <td>
                        <span
                          className="px-2 py-1 rounded"
                          style={{
                            backgroundColor:
                              row.status === "Approved"
                                ? "#198754"
                                : row.status === "Pending"
                                ? "yellow"
                                : "#dc3545",
                            color: row.status === "Pending" ? "black" : "white",
                          }}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td>
                        <p>{row.remark}</p>
                      </td>
                      <td>{row.delegateTo}</td>
                      <td>{row.delegateRemark}</td>
                      <td>
                        {Array.isArray(row.users)
                          ? row.users
                              .map((u) =>
                                typeof u === "object"
                                  ? u.full_name || u.name || ""
                                  : u
                              )
                              .filter((u) => u)
                              .join(", ")
                          : typeof row.users === "string"
                          ? row.users
                              .split(/\s+/)
                              .filter((u) => u)
                              .join(", ")
                          : row.users}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </DynamicModalBox>

      {/* Return Filling Details Modal */}
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
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  />
                  Refreshing...
                </>
              ) : (
                "Refresh"
              )}
            </button>

            <div className="mt-4">
              <div className="mt-4 d-flex justify-content-between align-items-center">
                <h5 className="fw-bold">GSTR1 Details</h5>
              </div>
              <div className="tbl-container me-2 mt-2">
                <table
                  className="w-100 table table-bordered table-hover"
                  style={{ width: "100% !important" }}
                >
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
                          <td>{item.gstin || vendorData?.gstin}</td>
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
                        <td colSpan={8} className="text-center">
                          No records found for GSTR1
                        </td>
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
                <table
                  className="w-100 table table-bordered table-hover"
                  style={{ width: "100% !important" }}
                >
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
                          <td>{item.gstin || vendorData?.gstin}</td>
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
                        <td colSpan={8} className="text-center">
                          No records found for GSTR3B
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </DynamicModalBox>

      {/* Delegate Approval Modal */}
      <DynamicModalBox
        show={showDelegateApproval}
        onHide={() => setShowDelegateApproval(false)}
        size="md"
        title={<span style={{ color: "#de7008" }}>Delegate Approval</span>}
        footerButtons={[
          {
            label: "Delegate",
            onClick: handleDelegate,
            props: { type: "button" },
          },
        ]}
      >
        <div className="row">
          <div className="col-12 mb-3">
            <label className="form-label">
              Remark <span style={{ color: "red" }}>*</span>
            </label>
            <textarea
              className="form-control"
              rows={3}
              placeholder="Enter delegate remark..."
              value={delegateRemark}
              onChange={(e) => setDelegateRemark(e.target.value)}
            />
          </div>
          <div className="col-12">
            <label className="form-label">
              Department <span style={{ color: "red" }}>*</span>
            </label>
            <select
              className="form-select"
              value={delegateDepartment}
              onChange={(e) => setDelegateDepartment(e.target.value)}
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option
                  key={dept.value || dept.id}
                  value={dept.value || dept.id}
                >
                  {dept.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </DynamicModalBox>

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

export default VendorDetailFormStepper;
