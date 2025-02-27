import React, { useState, useEffect } from "react";
import CollapsedCardKYC from "../../../components/base/Card/CollapsedCardKYC";
import CardBodyKYC from "../../../components/base/Card/CardBodyKYC";
import CardBodyMsme from "../../../components/base/Card/CardBodyMsme";
import axios from "axios";

import { SelectBox } from "../../../components";
import { useParams } from 'react-router-dom';
import SingleSelector from "../../../components/base/Select/SingleSelector";


const SectionReKYCDetails = () => {
  const { id} = useParams();
  const [supplierData, setSupplierData] = useState({});
  const [eInvoicingApplicable, setEInvoicingApplicable] = useState('');
  const [rekycId, setRekycId] = useState(null);

  // const [bankDetailsList, setBankDetailsList] = useState([{ id: Date.now() }]);

  // Function to add 
  // const addBankDetails = () => {
  //   setBankDetailsList([
  //     ...bankDetailsList,
  //     { id: Date.now() },
  //   ]);
  // };

  // Function to delete 
  // const deleteBankDetails = (id) => {
  //   setBankDetailsList(bankDetailsList.filter((item) => item.id !== id));
  // };

  // States to track the dropdown selections
  // const [eInvoicingApplicable, setEInvoicingApplicable] = useState("Yes");
  const [msmeUdyamApplicable, setMsmeUdyamApplicable] = useState("");
  const [msmeEnterpriseType, setMsmeEnterpriseType] = useState("");

  // // Handle change in "E-invoicing Applicable" dropdown
  // const handleEInvoicingChange = (event) => {
  //   setEInvoicingApplicable(event.target.value);
  // };


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

  console.log("msme type", msmeEnterpriseType)
  // api details 

   // Function to fetch supplier data
   const fetchSupplierData = async () => {
    try {
      const response = await axios.get(`https://vendors.lockated.com/pms/suppliers/${id}/rekyc_by_sections.json?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414`);
      
      // Update the state with the response data
      setSupplierData(response.data);
      setEInvoicingApplicable(response.data?.einvoicing);
      setMsmeUdyamApplicable(response.data?.msme_details?.msme);
      setMsmeEnterpriseType(response.data?.msme_details?.enterprise);
      setBankDetailsList(response.data?.bank_details);
      setMsmeNo(response.data?.msme_details?.msme_no);
      setValidFrom(response.data?.msme_details?.valid_from);
      setValidTill(response.data?.msme_details?.valid_till);
      setRekycId(response.data?.id);
      // setSelectedCountry(response.data?.bank_details.country)

      console.log("enterprise:", response.data?.msme_details?.enterprise);

    } catch (error) {
      console.error('There was an error fetching the data!', error);
    }
  };


  useEffect(() => {
    // Fetch data from the API
    console.log("fetch.........");

    fetchSupplierData(id);


    // axios.get('https://vendors.lockated.com//pms/suppliers/7409/rekyc_by_sections.json?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414')
    //   .then(response => {
    //     setSupplierData(response.data); // Update the state with the response data
    //     setEInvoicingApplicable(response.data?.einvoicing);
    //     setMsmeUdyamApplicable(response.data?.msme_details?.msme)
    //     setMsmeEnterpriseType(response.data?.msme_details?.enterprise);
    //     setBankDetailsList(response.data?.bank_details);
    //     setMsmeNo(response.data?.msme_details?.msme_no)
    //     setValidFrom(response.data?.msme_details?.valid_from)
    //     setValidTill(response.data?.msme_details?.valid_till)
    //     setRekycId(response.data?.id)
    //     console.log("enterprise:",response.data?.msme_details?.enterprise)
    //   })
    //   .catch(error => {
    //     console.error('There was an error fetching the data!', error);
    //   });
    // store this in function
  }, [id]); // Empty dependency array ensures this runs once on mount


  console.log("supplier data:", supplierData);


  // country and state

  const [countries, setCountries] = useState([]); // Store country options
  const [states, setStates] = useState([]); // Store states based on selected country
  const [selectedCountry, setSelectedCountry] = useState(null); // Store selected country
  const [selectedState, setSelectedState] = useState(null); // Store selected state








  // useEffect(() => {
  //   axios
  //     .get('https://vendor.panchshil.com/pms/dropdown_countries?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414')
  //     .then(response => {
  //       if (response.data) {
  //         // Format country options for the SelectBox
  //         const formattedCountries = response.data.countries.map(country => ({
  //           value: country.id, // Assuming the API returns `id` and `name` for countries
  //           label: country.name,
  //         }));
  //         setCountries(formattedCountries);
  //         // console.log("countries:",response.data)
  //       }
  //     })
  //     .catch(error => {
  //       console.error('Error fetching countries:', error);
  //     });
  // }, []);


  useEffect(() => {
    axios
      .get('https://vendors.lockated.com/pms/dropdown_countries?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414')
      .then(response => {
        if (response.data) {
          // Format country options for the SelectBox
          const formattedCountries = response.data.countries.map(country => ({
            value: country.value, // Correct field from your data
            label: country.name, // Correct field from your data
          }));
          setCountries(formattedCountries);
   console.log("country:",formattedCountries)

           // Set selected country if bank data exists
           console.log("banck detail country:",supplierData.bank_details[0]?.country)
           if (supplierData?.bank_details) {
            console.log("banck detail country:",supplierData.bank_details[0]?.country)
            const preSelectedCountry = formattedCountries.find(
              country => country.label === supplierData.bank_details[0]?.country
            );
            setSelectedCountry(preSelectedCountry || null);
          }
        }
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });
  }, [supplierData]);

  // const handleCountryChange = (selectedOption) => {
  //   console.log("selected option :",selectedOption)
  //   const countryId = selectedOption?.value;
  //   // setSelectedCountry(countryId);
  //   setSelectedCountry(selectedOption)
  //   console.log("contry id:",countryId)




  // useEffect(() => {
  //   if (selectedCountry) {
  //     // Fetch states based on the selected country
  //     axios
  //       .get(`https://vendors.lockated.com/pms/dropdown_states?country_id=${selectedCountry.value}&&token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414`)
  //       .then(response => {
  //         if (response.data) {
  //           const formattedStates = response.data.states.map(state => ({
  //             value: state.id,
  //             label: state.name,
  //           }));
  //           setStates(formattedStates);

  //           // Set selected state if bank data exists
  //           if (supplierData?.bank_details) {
  //             const preSelectedState = formattedStates.find(
  //               state => state.label === supplierData.bank_details[0]?.state
  //             );
  //             setSelectedState(preSelectedState || null);
  //           }
  //         }
  //       })
  //       .catch(error => {
  //         console.error('Error fetching states:', error);
  //       });
  //   }
  // }, [selectedCountry]);

  

  useEffect(() => {
    if (selectedCountry) {
      // Fetch states based on the selected country
      console.log("selected country for states:",selectedCountry)
      axios
        .get(`https://vendors.lockated.com/pms/dropdown_states?country_id=${selectedCountry.value}&&token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414`)
        .then(response => {
          if (response.data) {
            const formattedStates = response.data.states.map(state => ({
              value: state.id,
              label: state.name,
            }));
            setStates(formattedStates);

            // Set selected state if bank data exists
            if (supplierData?.bank_details) {
              const preSelectedState = formattedStates.find(
                state => state.label === supplierData.bank_details[0]?.state
              );
              setSelectedState(preSelectedState || null);
            }
          }
        })
        .catch(error => {
          console.error('Error fetching states:', error);
        });
    }
  }, [selectedCountry,supplierData]);



  const handleCountryChange = (e,selectedOption, bankDetailId) => {
    // Update the selected country
    setSelectedCountry(selectedOption); 
    console.log("selected option :", selectedOption)
  
    // Update the country in the bankDetailsList
    setBankDetailsList(prevDetails =>
      prevDetails.map(bankDetail =>
        bankDetail.id === bankDetailId
          ? { ...bankDetail, country: selectedOption }  // Update the country
          : bankDetail
      )
      
    );
    
    }


  
  //   // Clear state and fetch new states based on the selected country
  //   setSelectedState(null);  // Clear state selection
  //   setStates([]);  // Clear state dropdown
  
  //   // Fetch new states based on the selected country
  //   axios
  //     .get(`https://vendors.lockated.com/pms/dropdown_states?country_id=${selectedOption.value}&token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414`)
  //     .then(response => {
  //       if (response.data) {
  //         const formattedStates = response.data.states.map(state => ({
  //           value: state.id,
  //           label: state.name,
  //         }));
  //         setStates(formattedStates);
  //       }
  //     })
  //     .catch(error => {
  //       console.error('Error fetching states:', error);
  //     });
  // };

  // const handleCountryChange = (selectedOption) => {
  //   setSelectedCountry(selectedOption);  // Set selected country
  //   setSelectedState(null);  // Clear state
  //   setStates([]);  // Clear state dropdown
  // };

  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);  // Set selected state
  };


  // const handleCountryChange = (selectedOption) => {
  //   console.log("Selected country:", selectedOption); // Logs the full option
  //   setSelectedCountry(selectedOption); // Set the full option object
  //   setSelectedState(null)
  //   setStates([])

  //   // Fetch states based on selected country
  //   axios
  //     .get(`https://vendors.lockated.com/pms/dropdown_states?country_id=${selectedOption}&&token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414`)
  //     .then(response => {
  //       if (response.data) {
  //         const formattedStates = response.data.states.map(state => ({
  //           value: state.id,
  //           label: state.name,
  //         }));
  //         setStates(formattedStates);
  //         console.log("states:", formattedStates)
          
  //       }
  //     })
  //     .catch(error => {
  //       console.error('Error fetching states:', error);
  //     });
  // };

  // // Fetch states based on selected country
  // axios
  //   .get(`https://vendor.panchshil.com/pms/dropdown_states?country_id=${countryId}&&token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414`)
  //   .then(response => {
  //     if (response.data) {
  //       const formattedStates = response.data.states.map(state => ({
  //         value: state.id,
  //         label: state.name,
  //       }));
  //       setStates(formattedStates);
  //     }
  //   })
  //   .catch(error => {
  //     console.error('Error fetching states:', error);
  //   });
  // };

  // const handleStateChange = (selectedOption) => {
  //   setSelectedState(selectedOption?.value);
  // };


  // banck

  const [bankDetailsList, setBankDetailsList] = useState([
    // Dummy data as an example
    // { id: 1, bank_name: 'Bank A', address: 'Address A', country: 'USA', city: 'City A' },
    // { id: 2, bank_name: 'Bank B', address: 'Address B', country: 'Canada', city: 'City B' },
  ]);
  
  // Function to handle field changes
  // const handleInputChange = (e, bankId, field) => {
  //   const { value } = e.target;
  //   setBankDetailsList((prev) =>
  //     prev.map((bank) =>
  //       bank.id === bankId ? { ...bank, [field]: value } : bank
  //     )
  //   );
  // };


  // const handleInputChange = (e, id, field) => {
  //   const { value } = e.target;
  //   setBankDetailsList(prevDetails =>
  //     prevDetails.map(bankDetail =>
  //       bankDetail.id === id ? { ...bankDetail, [field]: value } : bankDetail
  //     )
  //   );
  // };

  const handleInputChange = (e, id, field) => {
    const { value } = e.target;
    setBankDetailsList(prevDetails =>
      prevDetails.map(bankDetail =>
        bankDetail.id === id ? { ...bankDetail, [field]: value } : bankDetail
      )
    );
  };
  
  // Function to add a new bank detail
  const addBankDetails = () => {
    setBankDetailsList([
      ...bankDetailsList,
      { id: Date.now(), bank_name: '', address: '', country: '',state:'', city: '',pin_code:'',account_type:'',account_number:'',
        confirm_account_number:'',branch_name:'',micr_number:'',ifsc_code:'',beneficiary_name:'', remark:'' },
    ]);
  };
  
  // Function to delete bank details
  const deleteBankDetails = (id) => {
    setBankDetailsList(bankDetailsList.filter((item) => item.id !== id));
  };


  const handleFileChangeBank = (e, id) => {
    const file = e.target.files[0]; // Get the selected file
    if (!file) return;
  
    // If you want to use base64 or file URLs, you can do something like this:
    const fileReader = new FileReader();
    
    fileReader.onloadend = () => {
      // Update the `bankDetail` state with the file URL (base64 in this case)
      const fileUrl = fileReader.result;
      
      setBankDetailsList(prevDetails =>
        prevDetails.map(bankDetail =>
          bankDetail.id === id ? { 
            ...bankDetail, 
            attachment: fileUrl // Set the file URL in the bank detail
          } : bankDetail
        )
      );
    };
  
    fileReader.readAsDataURL(file); // Read the file as a base64 string
  };
  console.log("banck details :",bankDetailsList)

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
 
   // Handler for MSME/Udyam Applicable
  //  const handleMsmeUdyamChange = (e) => {
  //    setMsmeUdyamApplicable(e.target.value);
  //  };
 
   // Handler for MSME Enterprise Type
  //  const handleMsmeEnterpriseChange = (e) => {
  //    setMsmeEnterpriseType(e.target.value);
  //  };
 
   // Handler for MSME/Udyam Number
   const handleMsmeNoChange = (e) => {
     setMsmeNo(e.target.value);
   };
 
   // Handler for Valid From date
   const handleValidFromChange = (e) => {
     setValidFrom(e.target.value);
   };
 
   // Handler for Valid Till date
   const handleValidTillChange = (e) => {
     setValidTill(e.target.value);
   };
 
   // Handler for Attachment (File Input)
  //  const handleFileChange = (e) => {
  //    setAttachment(e.target.files[0]);
  //  };

    // Handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the first file selected

    if (file) {
      const attachment = {
        content_type: file.type, // Content type (e.g., "application/pdf")
        contect: file, // The file object itself
        filename: file.name, // File name
      };

      // Update the state with the file details
      setMsmeAttachments([...msmeAttachments, attachment]);
    }
  };

  // Handle eInvoicing File Change
  const handleEinvoicingFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file

    if (file) {
      const attachment = {
        content_type: file.type, // Content type (e.g., "application/pdf")
        contect: file, // The file object itself
        filename: file.name, // File name
      };

      // Update the eInvoicing attachments state
      setEinvoicingAttachments([...einvoicingAttachments, attachment]);
    }
  };
  
// edit pay load

const payload = {
  authenticity_token: "[FILTERED]", // No quotes for the token value, but the key is a string
  vendor_re_kyc: {
    status: "details_submitted_by_vendor"
  },
  pms_supplier: {
    rekyc_id: rekycId,
    msme: msmeUdyamApplicable ||"",
    msme_no: msmeUdyamApplicable === "No" ? "" :msmeNo|| "",
    valid_from:msmeUdyamApplicable === "No" ? "" : validFrom ||"",
    valid_till: msmeUdyamApplicable === "No" ? "" : validTill ||"",
    enterprise: msmeUdyamApplicable === "No" ? "" : msmeEnterpriseType ||"",
    msme_attachments: msmeUdyamApplicable === "No" ? [] : msmeAttachments,
    einvoicing:  eInvoicingApplicable||"",
    einvoicing_attachments: eInvoicingApplicable === "No" ? einvoicingAttachments: [], //added
    bank_details_attributes: bankDetailsList
    // {
    //   "1740052205996": { // Note this key remains a string
    //     _destroy: "false",
    //     bank_name: "BAnk",
    //     address: "aaaaaaa",
    //     country_id: 70, // No quotes for numeric values
    //     state_id: 87, // Same for numeric state_id
    //     city_name: "ssssssssss",
    //     pincode: "444444",
    //     account_type: "34444444444444444",
    //     account_number: "33333333333333",
    //     confirm_account_number: "33333333333333",
    //     branch_name: "SOME",
    //     micr_number: "ssssssssss",
    //     ifsc_code: "ssssssssssssssss",
    //     benficary_name: "sssssssssssss",
    //     remark: ""
    //   }
    // }
  }
};

console.log("payload:", payload)




// update api 


  // Handle the Update Button Click
  const handleUpdate = async () => {
    const payload = {
      authenticity_token: "[FILTERED]", // Add your actual token or logic to get it
      vendor_re_kyc: {
        status: "details_submitted_by_vendor"
      },
      pms_supplier: {
        rekyc_id: rekycId,
        msme: msmeUdyamApplicable || "",
        msme_no: msmeUdyamApplicable === "No" ? "" : msmeNo || "",
        valid_from: msmeUdyamApplicable === "No" ? "" : validFrom || "",
        valid_till: msmeUdyamApplicable === "No" ? "" : validTill || "",
        enterprise: msmeUdyamApplicable === "No" ? "" : msmeEnterpriseType || "",
        msme_attachments: msmeUdyamApplicable === "No" ? [] : msmeAttachments,
        einvoicing: eInvoicingApplicable || "",
        einvoicing_attachments: eInvoicingApplicable === "No" ? einvoicingAttachments : [],
        bank_details_attributes: bankDetailsList
      }
    };

    console.log("payload submition",payload)
    // Perform the PATCH request
    // try {
    //   const response = await fetch(`http://vendors.lockated.com/pms/suppliers/${rekycId}/update_rekyc_by_sections`, {
    //     method: 'PATCH',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json',
    //       // Add any necessary authentication token or session headers
    //       'token':'bfa5004e7b0175622be8f7e69b37d01290b737f82e078414',
    //       'Cookie': '_erp_session=YOUR_SESSION_ID' // Make sure to update your session ID if needed
    //     },
    //     body: JSON.stringify(payload)
    //   });

    //   const data = await response.json();
    //   if (response.ok) {
    //     console.log('Update successful:', data);
    //     alert("Update successfully")
    //     // Optionally handle success (e.g., show a success message or redirect)
    //   } else {
    //     console.error('Error during update:', data);
    //     // Optionally handle error (e.g., show an error message)
    //   }
    // } catch (error) {
    //   console.error('Network error:', error);
    //   // Handle network error if needed
    // }



    try {
      const response = await axios.patch(
        `https://vendors.lockated.com/pms/suppliers/${rekycId}/update_rekyc_by_sections.json?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414`,
        payload,
        // {
        //   headers: {
        //     // 'Accept': 'application/json',
        //     // 'Content-Type': 'application/json',
        //     'token': 'bfa5004e7b0175622be8f7e69b37d01290b737f82e078414', // Token should be valid
        //      // Replace with the actual session ID
        //   }
        // }
      );
    
      console.log('Response:', response.data); // Check the response data
      // await fetchSupplierData();
      if (response.status===200) {
            // console.log('Update successful:', data);
            alert("Updated successfully")
            // await fetchSupplierData();
            // Optionally handle success (e.g., show a success message or redirect)
          }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };


console.log("selecte country:" ,selectedCountry)

  return (
    <>
      <div className="website-content overflowY-auto">
        <div className="card mx-4 pb-4 mt-4">
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
                    {supplierData?.organization_name || ''}
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
                    {supplierData?.gstin || ''}
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
                    {supplierData?.organization_details?.site || ''}
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
                    {supplierData?.organization_details?.department || ''}
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
                    {supplierData?.organization_details?.invited_by || ''}
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
                    {supplierData?.organization_details?.contact_number || ''}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card mx-4 pb-4 mt-4">
          <div className="card mx-3 pb-4 mt-4">
            <div className="card-header3">
              <h3 className="card-title">Basic Information</h3>
            </div>
            <div className="card-body mt-0">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                  <div className="col-6 ">
                    <label>Vendor Organization Name</label>
                  </div>
                  <div className="col-6">
                    <label className="text">
                      <span className="me-3">
                        <span className="text-dark">:</span>
                      </span>
                      {supplierData?.basic_information?.vendor_organization_name || ''}
                    </label>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                  <div className="col-6 ">
                    <label>Type of Organization</label>
                  </div>
                  <div className="col-6">
                    <label className="text">
                      <span className="me-3">
                        <span className="text-dark">:</span>
                      </span>
                      {supplierData?.basic_information?.type_of_organization || ''}
                    </label>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                  <div className="col-6 ">
                    <label>Nature of Business</label>
                  </div>
                  <div className="col-6">
                    <label className="text">
                      <span className="me-3">
                        <span className="text-dark">:</span>
                      </span>
                      {supplierData?.basic_information?.nature_of_business || ''}
                    </label>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                  <div className="col-6 ">
                    <label>Vendor Type</label>
                  </div>
                  <div className="col-6">
                    <label className="text">
                      <span className="me-3">
                        <span className="text-dark">:</span>
                      </span>
                      {supplierData?.basic_information?.vendor_type || ''}
                    </label>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                  <div className="col-6 ">
                    <label>Type of Industry</label>
                  </div>
                  <div className="col-6">
                    <label className="text">
                      <span className="me-3">
                        <span className="text-dark">:</span>
                      </span>
                      {supplierData?.basic_information?.type_of_industry || ''}
                    </label>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                  <div className="col-6 ">
                    <label>Full Name</label>
                  </div>
                  <div className="col-6">
                    <label className="text">
                      <span className="me-3">
                        <span className="text-dark">:</span>
                      </span>
                      {supplierData?.basic_information?.full_name || ''}
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
                      {supplierData?.basic_information?.email || ''}
                    </label>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                  <div className="col-6 ">
                    <label>Mobile </label>
                  </div>
                  <div className="col-6">
                    <label className="text">
                      <span className="me-3">
                        <span className="text-dark">:</span>
                      </span>
                      {supplierData?.basic_information?.mobile || ''}
                    </label>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                  <div className="col-6 ">
                    <label>PAN No.</label>
                  </div>
                  <div className="col-6">
                    <label className="text">
                      <span className="me-3">
                        <span className="text-dark">:</span>
                      </span>
                      {supplierData?.basic_information?.pan_number || ''}
                    </label>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                  <div className="col-6 ">
                    <label>PAN Attachment</label>
                  </div>
                  <div className="col-6">
                    <label className="text">
                      <span className="me-3">
                        <span className="text-dark">:</span>
                      </span>
                      {supplierData?.basic_information?.pan_attachments?.length > 0 ? (
                        // Display the document name of the first attachment
                        supplierData?.basic_information?.pan_attachments[0]?.document_name
                      ) : (
                        // If no attachment is present, show a default message
                        'No Document Available'
                      )}
                    </label>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                  <div className="col-6 ">
                    <label>Schema Group</label>
                  </div>
                  <div className="col-6">
                    <label className="text">
                      <span className="me-3">
                        <span className="text-dark">:</span>
                      </span>
                      {supplierData?.schema_group || ''}
                    </label>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                  <div className="col-6 ">
                    <label>Date of Incorporation</label>
                  </div>
                  <div className="col-6">
                    <label className="text">
                      <span className="me-3">
                        <span className="text-dark">:</span>
                      </span>
                      {supplierData?.basic_information?.date_of_incorporation || ''}
                    </label>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                  <div className="col-6 ">
                    <label>GSTIN Applicable</label>
                  </div>
                  <div className="col-6">
                    <label className="text">
                      <span className="me-3">
                        <span className="text-dark">:</span>
                      </span>
                      {supplierData?.gstin_applicable || ''}
                    </label>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                  <div className="col-6 ">
                    <label>GSTIN Classification</label>
                  </div>
                  <div className="col-6">
                    <label className="text">
                      <span className="me-3">
                        <span className="text-dark">:</span>
                      </span>
                      {supplierData?.gst_classification || ''}
                    </label>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                  <div className="col-6 ">
                    <label>GSTIN No.</label>
                  </div>
                  <div className="col-6">
                    <label className="text">
                      <span className="me-3">
                        <span className="text-dark">:</span>
                      </span>
                      {supplierData?.basic_information?.gstin || ''}
                    </label>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                  <div className="col-6 ">
                    <label>GSTIN Attachment</label>
                  </div>
                  <div className="col-6">
                    <label className="text">
                      <span className="me-3">
                        <span className="text-dark">:</span>
                      </span>

                      {supplierData?.basic_information?.gstin_attachments?.length > 0 ? (
                        // Display the document name of the first attachment
                        supplierData?.basic_information?.gstin_attachments[0]?.document_name || 'No Document Available'
                      ) : (
                        // If no attachment is present, show a default message
                        'No Document Available'
                      )}

                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
         



{bankDetailsList.map((bankDetail) => (
  <CollapsedCardKYC
    key={bankDetail.id}
    title="Bank Details"
    onDelete={() => deleteBankDetails(bankDetail.id)}
  >
    <div className="row">
      {/* Bank Name */}
      <div className="col-md-4">
        <div className="form-group">
          <label>Bank Name <span>*</span></label>
          <input
            className="form-control"
            type="text"
            placeholder="Enter Bank name"
            value={bankDetail.bank_name}
            onChange={(e) => handleInputChange(e, bankDetail.id, 'bank_name')}
          />
        </div>
      </div>

      {/* Address */}
      <div className="col-md-4">
        <div className="form-group">
          <label>Address <span>*</span></label>
          <input
            className="form-control"
            type="text"
            placeholder="Enter Address"
            value={bankDetail.address}
            onChange={(e) => handleInputChange(e, bankDetail.id, 'address')}
          />
        </div>
      </div>

      {/* Country */}
      <div className="col-md-4">
        <div className="form-group">
          <label>Country <span>*</span></label>
          <SingleSelector
            options={countries}
            // value={bankDetail.country}
             value={selectedCountry}
            // value={countries.find(country => country.label === bankDetail.country) || {}} // Find the selected country object or use a default empty object if not found
            onChange={(selectedOption) => 
              // handleCountryChange(selectedOption)
              console.log("selected option onchange :",selectedOption)
            }
            // onChange={(e) => handleCountryChange(e, bankDetail.id)}  // Pass the bankDetail.id here
          />

          
        </div>
      </div>

      <div className="col-md-4">
        <div className="form-group">
          <label>State <span>*</span></label>
          <SingleSelector
            options={states}
            // value={bankDetail.state}
            // value={states.find(country => country.label === bankDetail.state) || {}}
            value={selectedState}
            onChange={(selectedOption) => handleStateChange(selectedOption)}
          />
        </div>
      </div>

      {/* City */}
      <div className="col-md-4 mt-2">
        <div className="form-group">
          <label>City <span>*</span></label>
          <input
            className="form-control"
            type="text"
            placeholder="Enter City Name"
            value={bankDetail.city}
            onChange={(e) => handleInputChange(e, bankDetail.id, 'city')}
          />
        </div>
      </div>

      {/* Pin Code */}
      <div className="col-md-4 mt-2">
        <div className="form-group">
          <label>Pin Code <span>*</span></label>
          <input
            className="form-control"
            type="number"
            placeholder="Enter Pin Code"
            value={bankDetail.pin_code}
            onChange={(e) => handleInputChange(e, bankDetail.id, 'pin_code')}
          />
        </div>
      </div>

      {/* Account Type */}
      <div className="col-md-4 mt-2">
        <div className="form-group">
          <label>Account Type <span>*</span></label>
          <input
            className="form-control"
            type="text"
            placeholder="Enter Account Type"
            value={bankDetail.account_type}
            onChange={(e) => handleInputChange(e, bankDetail.id, 'account_type')}
          />
        </div>
      </div>

      {/* Account Number */}
      <div className="col-md-4 mt-2">
        <div className="form-group">
          <label>Account Number <span>*</span></label>
          <input
            className="form-control"
            type="number"
            placeholder="Enter Account Number"
            value={bankDetail.account_number}
            onChange={(e) => handleInputChange(e, bankDetail.id, 'account_number')}
          />
        </div>
      </div>

      {/* Confirm Account Number */}
      <div className="col-md-4 mt-2">
        <div className="form-group">
          <label>Confirm Account Number <span>*</span></label>
          <input
            className="form-control"
            type="number"
            placeholder="Enter Confirm Account Number"
            value={bankDetail.confirm_account_number}
            onChange={(e) => handleInputChange(e, bankDetail.id, 'confirm_account_number')}
          />
        </div>
      </div>

      {/* Branch Name */}
      <div className="col-md-4 mt-2">
        <div className="form-group">
          <label>Branch Name <span>*</span></label>
          <input
            className="form-control"
            type="text"
            placeholder="Enter Branch Name"
            value={bankDetail.branch_name}
            onChange={(e) => handleInputChange(e, bankDetail.id, 'branch_name')}
          />
        </div>
      </div>

      {/* MICR No. */}
      <div className="col-md-4 mt-2">
        <div className="form-group">
          <label>MICR No. <span>*</span></label>
          <input
            className="form-control"
            type="text"
            placeholder="Enter MICR No."
            value={bankDetail.micr_number}
            onChange={(e) => handleInputChange(e, bankDetail.id, 'micr_number')}
          />
        </div>
      </div>

      {/* IFSC Code */}
      <div className="col-md-4 mt-2">
        <div className="form-group">
          <label>IFSC Code <span>*</span></label>
          <input
            className="form-control"
            type="text"
            placeholder="Enter IFSC Code"
            value={bankDetail.ifsc_code}
            onChange={(e) => handleInputChange(e, bankDetail.id, 'ifsc_code')}
          />
        </div>
      </div>

      {/* Beneficiary Name */}
      <div className="col-md-4 mt-2">
        <div className="form-group">
          <label>Beneficiary Name <span>*</span></label>
          <input
            className="form-control"
            type="text"
            placeholder="Enter Beneficiary Name"
            value={bankDetail.beneficiary_name}
            onChange={(e) => handleInputChange(e, bankDetail.id, 'beneficiary_name')}
          />
        </div>
      </div>

      {/* Cancelled Cheque / Bank Copy */}
      <div className="col-md-4 mt-2">
        <div className="form-group">
          <label>Cancelled Cheque / Bank Copy <span>*</span></label>
          <input
            className="form-control"
            type="file"
            onChange={(e) => handleFileChangeBank(e, bankDetail.id)}
          />
        </div>
      </div>

      {/* Remark */}
      <div className="col-md-4 mt-2">
        <div className="form-group">
          <label>Remark <span>*</span></label>
          <textarea
            className="form-control"
            rows="3"
            placeholder="Enter Remark"
            value={bankDetail.remark}
            onChange={(e) => handleInputChange(e, bankDetail.id, 'remark')}
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

          <div className="card mx-3 pb-4 mt-4">
            <div className="card-header3">
              <h3 className="card-title">MSME Details</h3>
            </div>
            {/* <CardBodyMsme /> */}


            <div className="card-body mt-0">
              <div className="row">
                {/* MSME/Udyam Number Applicable */}
                <div className="col-md-4 mt-2">
                  <div className="form-group">
                    <label>
                      MSME/Udyam Number Applicable <span>*</span>
                    </label>
                    <select
                      value={msmeUdyamApplicable}
                      onChange={handleMsmeUdyamChange}
                      className="form-control"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>

                {/* MSME/Udyam Number */}
                {msmeUdyamApplicable === "Yes" && (
                  <div className="col-md-4 mt-2">
                    <div className="form-group">
                      <label>
                        MSME/Udyam Number <span>*</span>
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
                    </div>
                  </div>
                )}

                {/* MSME/Udyam Valid From */}
                {msmeUdyamApplicable === "Yes" && (
                  <div className="col-md-4 mt-2">
                    <div className="form-group">
                      <label>
                        MSME/Udyam Valid From <span>*</span>
                      </label>
                      <input
                        className="form-control"
                        type="date"
                        name="name"
                        placeholder=""
                        value={validFrom}
                        onChange={handleValidFromChange} // Add onChange handler here
                        // value={supplierData?.msme_details?.valid_from}
                      />
                    </div>
                  </div>
                )}

                {/* MSME/Udyam Valid Till */}
                {msmeUdyamApplicable === "Yes" && (
                  <div className="col-md-4 mt-2">
                    <div className="form-group">
                      <label>
                        MSME/Udyam Valid Till <span>*</span>
                      </label>
                      <input
                        className="form-control"
                        type="date"
                        name="name"
                        placeholder=""
                        value={validTill}
                        onChange={handleValidTillChange}
                        // value={supplierData?.msme_details?.valid_till}
                      />
                    </div>
                  </div>
                )}

                {/* MSME Enterprise Type */}
                {msmeUdyamApplicable === "Yes" && (
                  <div className="col-md-4 mt-2">
                    <div className="form-group">
                      <label>
                        MSME Enterprise Type <span>*</span>
                      </label>
                      <select 
                      // className="form-control"
                        // value={supplierData?.msme_details?.enterprise}

                        onChange={handleMsmeEnterpriseChange}  // Handle value change
                        className="form-control"
                        value={msmeEnterpriseType} 
                      >
                        <option value="Micro">Micro</option>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Not_applicable">Not Applicable</option>
                      </select>
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
                        href="https://vendor.panchshil.com/assets/Yes%20_%20msme.pdf"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          fill="currentColor"
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
                          Specimen For E-Invoicing Declaration.pdf
                        </span>
                      </a>
                    </div>
                  </div>
                )}
                {/* MSME/Udyam Attachment */}
                {msmeUdyamApplicable === "Yes" && (
                  <div className="col-md-4 mt-2">
                    <div className="form-group">
                      <label>
                        MSME/Udyam Attachment <span>*</span>
                      </label>
                      <input className="form-control" type="file" name="" onChange={handleFileChange}  />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="card mx-3 pb-4 mt-4">
            <div className="card-header3">
              <h3 className="card-title">E-invoice</h3>
            </div>
            {/* <CardBodyKYC /> */}

            {/* e  invoice */}
            <div className="card-body mt-0">
              {/* E-Invoicing Applicable */}
              <div className="row">
                <div className="col-md-4 mt-2">
                  <div className="form-group">
                    <label>
                      E-invoicing Applicable <span>*</span>
                    </label>
                    <select
                      // value={eInvoicingApplicable}
                      // onChange={handleEInvoicingChange}
                      // className="form-control"
                      // value={supplierData?.einvoicing}


                      onChange={handleEInvoicingChange}  // Handle value change
              className="form-control"
              value={eInvoicingApplicable}  
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Conditional rendering for E-Invoicing - Hide Download Specimen and Upload Declaration */}
              {eInvoicingApplicable === "No" && (
                <div className="row">
                  <div className="col-md-4 mt-2">
                    <div className="form-group">
                      <label>
                        Download Specimen <span>*</span>
                      </label>
                      <a
                        download="Specimen_E-Invoicing_Declaration.docx"
                        className="text-primary d-flex align-items-center"
                        href="/assets/Specimen_E-Invoicing_Declaration.docx"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          fill="currentColor"
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
                          Specimen For E-Invoicing Declaration.pdf
                        </span>
                      </a>
                    </div>
                  </div>
                  <div className="col-md-4 mt-2">
                    <div className="form-group">
                      <label>
                        Upload Declaration <span>*</span>
                      </label>
                      <input
                        id="attachment"
                        accept=" "
                        className="form-control"
                        type="file"
                        name=""
                        onChange={handleEinvoicingFileChange}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Conditional rendering for MSME/Udyam - Hide Download Specimen and Upload Declaration */}
              {/* {msmeUdyamApplicable === "No" && (
                <div className="row">
                  <div className="col-md-4 mt-2">
                    <div className="form-group">
                      <label>
                        Download Specimen <span>*</span>
                      </label>
                      <a
                        download="Specimen_MSME_Udyam_Declaration.docx"
                        className="text-primary d-flex align-items-center"
                        href="https://vendor.panchshil.com/assets/Specimen_MSME_Udyam_Declaration.docx"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          fill="currentColor"
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
                          Specimen For MSME/Udyam Declaration.pdf
                        </span>
                      </a>
                    </div>
                  </div>
                  <div className="col-md-4 mt-2">
                    <div className="form-group">
                      <label>
                        Upload Declaration <span>*</span>
                      </label>
                      <input
                        id="attachment"
                        accept=" "
                        className="form-control"
                        type="file"
                        name=""
                        onChange={handleEinvoicingFileChange}
                      />
                    </div>
                  </div>
                </div>
              )} */}
            </div>




          </div>
          <div className="row mt-4 mx-3">
            <div className="col-md-12">
              <h5 className=" ">
                Declaration <span>*</span>
              </h5>
              <p>
                <span className="me-2 mt-2">
                  <input
                    type="checkbox"
                    id="declaration-checkbox"
                    required=""
                  />
                </span>{" "}
                I, undersigned, on behalf of M/S Dell Organization Test hereby
                certify that the information provided in this documents are the
                best of my knowledge &amp; particulars given in this submission
                are true and correct. I authorize M/S A2Z Online Services
                Private Limited to make direct inquiries and references to any
                person, firm, public official or organization named in this Form
                to verify information submitted herein or regarding the
                competence of the&nbsp;Organization
              </p>
              <div id="checkboxError" style={{ color: "red", display: "none" }}>
                Please check this box to proceed.
              </div>
            </div>
          </div>
        </div>
        <div className=" d-flex justify-content-center">
          <div className="col-md-2">
            <button className="purple-btn2" onClick={handleUpdate}>Update</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SectionReKYCDetails;
