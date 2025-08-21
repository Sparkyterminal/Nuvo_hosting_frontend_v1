// /* eslint-disable no-unused-vars */
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useForm, Controller } from "react-hook-form";
// import { motion } from "framer-motion";
// import {
//   Form,
//   Input,
//   Button,
//   Upload,
//   Radio,
//   Select,
//   DatePicker,
//   Checkbox,
//   Row,
//   Col,
//   Card,
//   Divider,
// } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
// import { API_BASE_URL } from "../../config";

// const { Option } = Select;
// const { TextArea } = Input;

// const RecruitmentForm = () => {
//   const { control, handleSubmit, reset, watch } = useForm();
//   const [fileList, setFileList] = useState([]);
//   const [uploadedFileName, setUploadedFileName] = useState(null);
//   const navigate = useNavigate();

//   const [uploading, setUploading] = useState(false);
//   const [profilePhotoId, setProfilePhotoId] = useState(null);
//   const [uploadSuccess, setUploadSuccess] = useState(false);
//   const [uploadedMediaId, setUploadedMediaId] = useState(null);
//   const [otherExperienceChecked, setOtherExperienceChecked] = useState(false);
//   const [otherExperienceText, setOtherExperienceText] = useState("");

//   // Watch experienceAreas to detect when "other" is selected
//   const watchedExperienceAreas = watch("experienceAreas") || [];

//   // Update otherExperienceChecked when experienceAreas changes
//   React.useEffect(() => {
//     const isOtherSelected = watchedExperienceAreas.includes("other");
//     setOtherExperienceChecked(isOtherSelected);
//     if (!isOtherSelected) {
//       setOtherExperienceText("");
//     }
//   }, [watchedExperienceAreas]);

//   const handleUploadChange = ({ fileList: newFileList }) => {
//     setFileList(newFileList.slice(-1)); // keep only latest
//     setUploadSuccess(false);
//     setUploadedFileName(null);
//   };

//   const API = `${API_BASE_URL}api/media`;

//   const handleSavePicture = async () => {
//     if (!fileList.length) return;
//     setUploading(true);
//     const formData = new FormData();
//     formData.append("media", fileList[0].originFileObj);
//     try {
//       const response = await fetch(API, { method: "POST", body: formData });
//       if (!response.ok) throw new Error("Upload failed");
//       const data = await response.json();
//       // Use data.data for the ID
//       setProfilePhotoId(data.data || null);
//       setUploadSuccess(true);
//       setUploadedFileName(data.filename || data.fileName || data.name || null);
//     } catch (e) {
//       setUploadSuccess(false);
//       setUploadedFileName(null);
//       setProfilePhotoId(null);
//       alert("Upload failed");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleDeletePicture = () => {
//     setFileList([]);
//     setUploadSuccess(false);
//     setUploadedFileName(null);
//     setProfilePhotoId(null);
//   };

//   const onSubmit = async (data) => {
//     const languages = [];
//     for (let i = 1; i <= 4; i++) {
//       const name = data[`language${i}`];
//       const proficiency = data[`rate${i}`];
//       if (name && proficiency) {
//         languages.push({ name, proficiency });
//       }
//     }

//     let experienceAreas = data.experienceAreas || [];
//     if (Array.isArray(experienceAreas)) {
//       experienceAreas = experienceAreas.map((e) => e.toLowerCase());

//       // Replace "other" with the actual text if "other" was selected
//       if (experienceAreas.includes("other") && otherExperienceText.trim()) {
//         experienceAreas = experienceAreas.filter((area) => area !== "other");
//         experienceAreas.push(otherExperienceText.trim());
//       } else if (experienceAreas.includes("other")) {
//         // Remove "other" if no text was provided
//         experienceAreas = experienceAreas.filter((area) => area !== "other");
//       }
//     }

//     const images = uploadedMediaId ? { profilePhoto: [uploadedMediaId] } : {};

//     let availability = { fullDay: false, partTime: false, both: false };
//     if (data.workType === "full-time") availability.fullDay = true;
//     if (data.workType === "part-time") availability.partTime = true;
//     if (data.workType === "both") availability.both = true;

//     let dob = data.dob;
//     if (dob && typeof dob === "object" && dob.toISOString) {
//       dob = dob.toISOString();
//     }

//     let shoeSize = data.shoeSize;
//     if (typeof shoeSize === "string" && shoeSize.match(/^\d+$/)) {
//       shoeSize = parseInt(shoeSize, 10);
//     }

//     const payload = {
//       firstName: data.firstName || "",
//       lastName: data.lastName || "",
//       address: data.address || "",
//       city: data.city || "",
//       country: data.country || "",
//       placeOfBirth: data.placeOfBirth || "",
//       dob: dob || "",
//       status: data.status || "",
//       telephone: data.telephone || "",
//       cellPhone: data.cellPhone || "",
//       email: data.email || "",
//       weight: data.weight || "",
//       height: data.height || "",
//       shoeSize: shoeSize || "",
//       blazerSize: data.blazerSize || "",
//       trouserSize: data.trouserSize || "",
//       student: data.student || "",
//       school: data.school || "",
//       degree: data.degree || "",
//       languages,
//       hostessExperience: data.hostessExperience || "",
//       groupResponsible: data.groupResponsible || "",
//       agency: data.agency || "",
//       experienceAreas,
//       workType: data.workType || "",
//       holidayWork: data.holidayWork || "",
//       profilePhoto: profilePhotoId ? [profilePhotoId] : [],
//       availability,
//     };

//     try {
//       const response = await fetch(`${API_BASE_URL}api/staff-requests`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });
//       if (!response.ok) throw new Error("Failed to submit form");
//       reset();
//       setFileList([]);
//       setUploadSuccess(false);
//       setUploadedFileName(null);
//       setOtherExperienceChecked(false);
//       setOtherExperienceText("");
//       alert("Form submitted successfully!");
//     } catch (e) {
//       alert("Failed to submit form");
//     }
//   };

//   return (
//     <div
//       style={{
//         height: "100vh",
//         overflowY: "auto",
//         background: "#000",
//         color: "#fff",
//         margin: 0,
//         padding: 0,
//       }}
//     >
//       <style>{`
//         body, html, #root {
//           margin: 0;
//           padding: 0;
//           background: #000 !important;
//         }
//         .ant-form-item-label > label,
//         .ant-checkbox-wrapper,
//         .ant-radio-wrapper {
//           color: #fff !important;
//         }
//       `}</style>

//       {/* Back Button */}
//       <motion.div
//         style={{ marginTop: 24, marginBottom: 16 }}
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7, ease: "easeOut" }}
//       >
//         <button
//           type="button"
//           onClick={() => navigate(-1)}
//           style={{
//             minWidth: 100,
//             fontSize: 16,
//             padding: "8px 20px",
//             borderRadius: "999px",
//             color: "#fff",
//             background: "transparent",
//             border: "1px solid #fff",
//             cursor: "pointer",
//           }}
//         >
//           <span style={{ marginRight: 6 }}>&#8592;</span> Back
//         </button>
//       </motion.div>

//       {/* Title */}
//       <motion.h1
//         className="text-2xl font-bold text-center my-8"
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7, ease: "easeOut" }}
//         style={{ color: "#fff" }}
//       >
//         Join Our <span style={{ color: "#FFD700" }}>Team</span>
//       </motion.h1>

//       {/* Form */}
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
//       >
//         <Form
//           layout="vertical"
//           onFinish={handleSubmit(onSubmit)}
//           style={{
//             maxWidth: 700,
//             margin: "32px auto",
//             padding: 24,
//             borderRadius: 16,
//           }}
//         >
//           {/* Upload */}
//           <Card style={{ background: "#000", border: "none" }}>
//             <Divider
//               style={{
//                 color: "#fff",
//                 borderColor: "#FFD700",
//                 fontWeight: 700,
//               }}
//               orientation="left"
//             >
//               Upload
//             </Divider>
//             <Form.Item label="Upload your picture">
//               <Upload
//                 listType="picture-card"
//                 maxCount={1}
//                 fileList={fileList}
//                 beforeUpload={(file) => {
//                   // Check for valid filename (no spaces or special characters except underscore and hyphen)
//                   // const regex = /^[a-zA-Z0-9_-]+\.[a-zA-Z0-9]+$/;
//                   // if (!regex.test(file.name)) {
//                   //   alert(
//                   //     "Invalid file name! Use only letters, numbers, underscore, or hyphen. No spaces or special characters."
//                   //   );
//                   //   return Upload.LIST_IGNORE;
//                   // }

//                   // File size check (max 2MB)
//                   const isLt2M = file.size / 1024 / 1024 < 2;
//                   if (!isLt2M) {
//                     alert("File must be smaller than 2MB!");
//                     return Upload.LIST_IGNORE;
//                   }

//                   return false; // prevent auto-upload, keep manual save
//                 }}
//                 onChange={handleUploadChange}
//                 showUploadList={{
//                   showPreviewIcon: false,
//                   showRemoveIcon: false,
//                 }}
//               >
//                 {fileList.length >= 1 ? null : (
//                   <div style={{ textAlign: "center", color: "#999" }}>
//                     <UploadOutlined />
//                     <div style={{ marginTop: 8 }}>Upload</div>
//                   </div>
//                 )}
//               </Upload>
//               <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
//                 {fileList.length > 0 && !uploadSuccess && (
//                   <Button
//                     size="small"
//                     type="primary"
//                     loading={uploading}
//                     onClick={handleSavePicture}
//                   >
//                     {uploading ? "Saving..." : "Save"}
//                   </Button>
//                 )}
//                 {fileList.length > 0 && (
//                   <Button size="small" danger onClick={handleDeletePicture}>
//                     Delete
//                   </Button>
//                 )}
//                 {uploadSuccess && (
//                   <span style={{ color: "#00ff00", fontSize: 13 }}>Saved!</span>
//                 )}
//               </div>
//               <small style={{ color: "#FFD700" }}>Max file size 2MB</small>
//             </Form.Item>
//           </Card>

//           {/* Personal Info */}
//           <Card
//             style={{ background: "#000", border: "none", marginBottom: 24 }}
//           >
//             <Divider
//               style={{
//                 color: "#fff",
//                 borderColor: "#FFD700",
//                 fontWeight: 700,
//               }}
//               orientation="left"
//             >
//               Personal Info
//             </Divider>
//             <Row gutter={16}>
//               <Col span={12}>
//                 <Controller
//                   name="firstName"
//                   control={control}
//                   render={({ field }) => (
//                     <Form.Item label="First Name">
//                       <Input {...field} />
//                     </Form.Item>
//                   )}
//                 />
//               </Col>
//               <Col span={12}>
//                 <Controller
//                   name="lastName"
//                   control={control}
//                   render={({ field }) => (
//                     <Form.Item label="Last Name">
//                       <Input {...field} />
//                     </Form.Item>
//                   )}
//                 />
//               </Col>
//             </Row>
//             <Row gutter={16}>
//               <Col span={12}>
//                 <Controller
//                   name="address"
//                   control={control}
//                   render={({ field }) => (
//                     <Form.Item label="Address">
//                       <Input {...field} />
//                     </Form.Item>
//                   )}
//                 />
//               </Col>
//               <Col span={12}>
//                 <Controller
//                   name="city"
//                   control={control}
//                   render={({ field }) => (
//                     <Form.Item label="City">
//                       <Input {...field} />
//                     </Form.Item>
//                   )}
//                 />
//               </Col>
//             </Row>
//             <Row gutter={16}>
//               <Col span={12}>
//                 <Controller
//                   name="country"
//                   control={control}
//                   render={({ field }) => (
//                     <Form.Item label="Country">
//                       <Input {...field} />
//                     </Form.Item>
//                   )}
//                 />
//               </Col>
//               <Col span={12}>
//                 <Controller
//                   name="placeOfBirth"
//                   control={control}
//                   render={({ field }) => (
//                     <Form.Item label="Place Of Birth">
//                       <Input {...field} />
//                     </Form.Item>
//                   )}
//                 />
//               </Col>
//             </Row>
//             <Row gutter={16}>
//               <Col span={12}>
//                 <Controller
//                   name="dob"
//                   control={control}
//                   render={({ field }) => (
//                     <Form.Item label="Date of Birth">
//                       <DatePicker
//                         {...field}
//                         style={{ width: "100%" }}
//                         format="DD/MM/YYYY"
//                       />
//                     </Form.Item>
//                   )}
//                 />
//               </Col>
//               <Col span={12}>
//                 <Controller
//                   name="status"
//                   control={control}
//                   render={({ field }) => (
//                     <Form.Item label="Status">
//                       <Select {...field}>
//                         <Option value="single">Single</Option>
//                         <Option value="married">Married</Option>
//                       </Select>
//                     </Form.Item>
//                   )}
//                 />
//               </Col>
//             </Row>
//             <Row gutter={16}>
//               <Col span={12}>
//                 <Controller
//                   name="telephone"
//                   control={control}
//                   render={({ field }) => (
//                     <Form.Item label="Telephone">
//                       <Input {...field} />
//                     </Form.Item>
//                   )}
//                 />
//               </Col>
//               <Col span={12}>
//                 <Controller
//                   name="cellPhone"
//                   control={control}
//                   render={({ field }) => (
//                     <Form.Item label="Cell Phone">
//                       <Input {...field} />
//                     </Form.Item>
//                   )}
//                 />
//               </Col>
//             </Row>
//             <Row gutter={16}>
//               <Col span={24}>
//                 <Controller
//                   name="email"
//                   control={control}
//                   render={({ field }) => (
//                     <Form.Item label="Email">
//                       <Input type="email" {...field} />
//                     </Form.Item>
//                   )}
//                 />
//               </Col>
//             </Row>
//           </Card>

//           {/* Dimensions */}
//           <Card
//             style={{ background: "#000", border: "none", marginBottom: 24 }}
//           >
//             <Divider
//               style={{
//                 color: "#fff",
//                 borderColor: "#FFD700",
//                 fontWeight: 700,
//               }}
//               orientation="left"
//             >
//               Dimensions
//             </Divider>
//             <Row gutter={16}>
//               <Col span={12}>
//                 <Controller
//                   name="weight"
//                   control={control}
//                   render={({ field }) => (
//                     <Form.Item label="Weight (kg)">
//                       <Input type="number" {...field} />
//                     </Form.Item>
//                   )}
//                 />
//               </Col>
//               <Col span={12}>
//                 <Controller
//                   name="height"
//                   control={control}
//                   render={({ field }) => (
//                     <Form.Item label="Height (cm)">
//                       <Input type="number" {...field} />
//                     </Form.Item>
//                   )}
//                 />
//               </Col>
//             </Row>
//             <Row gutter={16}>
//               <Col span={8}>
//                 <Controller
//                   name="shoeSize"
//                   control={control}
//                   render={({ field }) => (
//                     <Form.Item label="Shoe Size">
//                       <Select {...field}>
//                         {[3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((s) => (
//                           <Option key={s} value={s}>{`UK ${s}`}</Option>
//                         ))}
//                       </Select>
//                     </Form.Item>
//                   )}
//                 />
//               </Col>
//               <Col span={8}>
//                 <Controller
//                   name="blazerSize"
//                   control={control}
//                   render={({ field }) => (
//                     <Form.Item label="Blazer Size">
//                       <Select {...field}>
//                         {["XS", "S", "M", "L", "XL", "XXL"].map((s) => (
//                           <Option key={s} value={s}>
//                             {s}
//                           </Option>
//                         ))}
//                       </Select>
//                     </Form.Item>
//                   )}
//                 />
//               </Col>
//               <Col span={8}>
//                 <Controller
//                   name="trouserSize"
//                   control={control}
//                   render={({ field }) => (
//                     <Form.Item label="Trouser/Skirt Size">
//                       <Select {...field}>
//                         {["XS", "S", "M", "L", "XL", "XXL"].map((s) => (
//                           <Option key={s} value={s}>
//                             {s}
//                           </Option>
//                         ))}
//                       </Select>
//                     </Form.Item>
//                   )}
//                 />
//               </Col>
//             </Row>
//           </Card>

//           {/* Education */}
//           <Card
//             style={{ background: "#000", border: "none", marginBottom: 24 }}
//           >
//             <Divider
//               style={{
//                 color: "#fff",
//                 borderColor: "#FFD700",
//                 fontWeight: 700,
//               }}
//               orientation="left"
//             >
//               Education
//             </Divider>
//             <Row gutter={16}>
//               <Col span={12}>
//                 <Controller
//                   name="student"
//                   control={control}
//                   render={({ field }) => (
//                     <Form.Item label="Are you a student?">
//                       <Radio.Group {...field}>
//                         <Radio value="yes">Yes</Radio>
//                         <Radio value="no">No</Radio>
//                       </Radio.Group>
//                     </Form.Item>
//                   )}
//                 />
//               </Col>
//               <Col span={12}>
//                 <Controller
//                   name="school"
//                   control={control}
//                   render={({ field }) => (
//                     <Form.Item label="School/University">
//                       <Input {...field} />
//                     </Form.Item>
//                   )}
//                 />
//               </Col>
//             </Row>
//             <Row>
//               <Col span={24}>
//                 <Controller
//                   name="degree"
//                   control={control}
//                   render={({ field }) => (
//                     <Form.Item label="Highest Education Degree">
//                       <Input {...field} />
//                     </Form.Item>
//                   )}
//                 />
//               </Col>
//             </Row>
//           </Card>

//           {/* Languages */}
//           <Card
//             style={{ background: "#000", border: "none", marginBottom: 24 }}
//           >
//             <Divider
//               style={{
//                 color: "#fff",
//                 borderColor: "#FFD700",
//                 fontWeight: 700,
//               }}
//               orientation="left"
//             >
//               Languages
//             </Divider>
//             {Array.from({ length: 4 }).map((_, i) => (
//               <Row gutter={8} key={i}>
//                 <Col span={16}>
//                   <Controller
//                     name={`language${i + 1}`}
//                     control={control}
//                     render={({ field }) => (
//                       <Form.Item label={`Language ${i + 1}`}>
//                         <Select
//                           {...field}
//                           allowClear
//                           showSearch
//                           placeholder="Language"
//                         >
//                           {[
//                             "English",
//                             "Hindi",
//                             "Kannada",
//                             "Telugu",
//                             "Tamil",
//                             "Malayalam",
//                           ].map((lang) => (
//                             <Option key={lang} value={lang}>
//                               {lang}
//                             </Option>
//                           ))}
//                         </Select>
//                       </Form.Item>
//                     )}
//                   />
//                 </Col>
//                 <Col span={8}>
//                   <Controller
//                     name={`rate${i + 1}`}
//                     control={control}
//                     render={({ field }) => (
//                       <Form.Item label="Rate">
//                         <Select {...field} allowClear>
//                           {["Basic", "Conversational", "Fluent", "Native"].map(
//                             (rate) => (
//                               <Option key={rate} value={rate}>
//                                 {rate}
//                               </Option>
//                             )
//                           )}
//                         </Select>
//                       </Form.Item>
//                     )}
//                   />
//                 </Col>
//               </Row>
//             ))}
//           </Card>

//           {/* Experience */}
//           <Card
//             style={{ background: "#000", border: "none", marginBottom: 24 }}
//           >
//             <Divider
//               style={{
//                 color: "#fff",
//                 borderColor: "#FFD700",
//                 fontWeight: 700,
//               }}
//               orientation="left"
//             >
//               Experience
//             </Divider>
//             <Row gutter={16}>
//               <Col span={12}>
//                 <Controller
//                   name="hostessExperience"
//                   control={control}
//                   render={({ field }) => (
//                     <Form.Item label="Worked as host/hostess?">
//                       <Radio.Group {...field}>
//                         <Radio value="yes">Yes</Radio>
//                         <Radio value="no">No</Radio>
//                       </Radio.Group>
//                     </Form.Item>
//                   )}
//                 />
//               </Col>
//               <Col span={12}>
//                 <Controller
//                   name="groupResponsible"
//                   control={control}
//                   render={({ field }) => (
//                     <Form.Item label="Been responsible for a group?">
//                       <Radio.Group {...field}>
//                         <Radio value="yes">Yes</Radio>
//                         <Radio value="no">No</Radio>
//                       </Radio.Group>
//                     </Form.Item>
//                   )}
//                 />
//               </Col>
//             </Row>
//             <Row>
//               <Col span={24}>
//                 <Controller
//                   name="agency"
//                   control={control}
//                   render={({ field }) => (
//                     <Form.Item label="Agency you worked with">
//                       <Input {...field} />
//                     </Form.Item>
//                   )}
//                 />
//               </Col>
//             </Row>
//             <Row>
//               <Col span={24}>
//                 <Controller
//                   name="experienceAreas"
//                   control={control}
//                   render={({ field }) => (
//                     <Form.Item label="Area of Experience">
//                       <Checkbox.Group {...field}>
//                         <Row>
//                           {[
//                             "Actor/Actress",
//                             "Barman/barmaid",
//                             "Group Management",
//                             "Modeling",
//                             "Sales/Marketing",
//                             "Waiter/Waitress",
//                           ].map((label, i) => (
//                             <Col span={12} key={i}>
//                               <Checkbox value={label.toLowerCase()}>
//                                 {label}
//                               </Checkbox>
//                             </Col>
//                           ))}
//                           <Col span={12}>
//                             <Checkbox value="other">Other</Checkbox>
//                           </Col>
//                         </Row>
//                       </Checkbox.Group>
//                     </Form.Item>
//                   )}
//                 />
//               </Col>
//             </Row>

//             {/* Other Experience Text Area */}
//             {otherExperienceChecked && (
//               <Row>
//                 <Col span={24}>
//                   <Form.Item label="Please specify other experience">
//                     <TextArea
//                       rows={3}
//                       value={otherExperienceText}
//                       onChange={(e) => setOtherExperienceText(e.target.value)}
//                       placeholder="Describe your other experience..."
//                       maxLength={500}
//                     />
//                     <div style={{ color: "#999", fontSize: 12, marginTop: 4 }}>
//                       {otherExperienceText.length}/500 characters
//                     </div>
//                   </Form.Item>
//                 </Col>
//               </Row>
//             )}
//           </Card>

//           {/* Availability */}
//           {/* <Card
//             style={{ background: "#000", border: "none", marginBottom: 24 }}
//           >
//             <Divider
//               style={{
//                 color: "#fff",
//                 borderColor: "#FFD700",
//                 fontWeight: 700,
//               }}
//               orientation="left"
//             >
//               Availability
//             </Divider>
//             <Row gutter={16}>
//               <Col span={12}>
//                 <Controller
//                   name="workType"
//                   control={control}
//                   render={({ field }) => (
//                     <Form.Item label="Would you like to work">
//                       <Select {...field}>
//                         <Option value="full-time">Full-time</Option>
//                         <Option value="part-time">Part-time</Option>
//                         <Option value="both">Both</Option>
//                       </Select>
//                     </Form.Item>
//                   )}
//                 />
//               </Col>
//               <Col span={12}>
//                 <Controller
//                   name="holidayWork"
//                   control={control}
//                   render={({ field }) => (
//                     <Form.Item label="Willing to work on holidays?">
//                       <Radio.Group {...field}>
//                         <Radio value="yes">Yes</Radio>
//                         <Radio value="no">No</Radio>
//                       </Radio.Group>
//                     </Form.Item>
//                   )}
//                 />
//               </Col>
//             </Row>
//           </Card> */}

//           {/* Submit */}
//           <Form.Item style={{ marginTop: 24 }}>
//             <Button
//               type="primary"
//               htmlType="submit"
//               block
//               style={{
//                 background: "#13294B",
//                 color: "#fff",
//                 fontWeight: 700,
//                 fontSize: 18,
//                 letterSpacing: 1,
//                 boxShadow: "0 0 12px 2px #13294B",
//                 border: "none",
//                 height: "50px",
//               }}
//               className="submit-btn"
//             >
//               Submit
//             </Button>
//             <style>{`
//                 .submit-btn:hover {
//                   background: #2546a3 !important;
//                 }
//               `}</style>
//           </Form.Item>
//         </Form>
//       </motion.div>
//     </div>
//   );
// };

// export default RecruitmentForm;
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { motion } from "framer-motion";
import {
  Form,
  Input,
  Button,
  Upload,
  Radio,
  Select,
  DatePicker,
  Checkbox,
  Row,
  Col,
  Card,
  Divider,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { API_BASE_URL } from "../../config";

const { Option } = Select;
const { TextArea } = Input;

const RecruitmentForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({ mode: "onSubmit" });
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [profilePhotoId, setProfilePhotoId] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [otherExperienceChecked, setOtherExperienceChecked] = useState(false);
  const [otherExperienceText, setOtherExperienceText] = useState("");
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  // Watch experienceAreas to detect when "other" is selected
  const watchedExperienceAreas = watch("experienceAreas") || [];

  // Update otherExperienceChecked when experienceAreas changes
  // Update otherExperienceChecked when watchedExperienceAreas change
  useEffect(() => {
    const isOtherSelected = watchedExperienceAreas.includes("other");
    setOtherExperienceChecked((prev) =>
      prev !== isOtherSelected ? isOtherSelected : prev
    );
  }, [watchedExperienceAreas]);

  // Clear otherExperienceText and errors when "other" is deselected
  useEffect(() => {
    if (!otherExperienceChecked) {
      setOtherExperienceText((prev) => (prev !== "" ? "" : prev));
      setTimeout(() => clearErrors("otherExperienceText"), 0);
    }
  }, [otherExperienceChecked, clearErrors]);

  // Auto-upload on file select
  const handleUploadChange = async ({ fileList: newFileList }) => {
    const latestFileList = newFileList.slice(-1);
    setFileList(latestFileList);
    setUploadSuccess(false);
    setProfilePhotoId(null);

    if (latestFileList.length === 0) {
      setUploadSuccess(false);
      setProfilePhotoId(null);
      return;
    }

    const file = latestFileList[0].originFileObj;

    if (!file) return;

    // File size check (max 2MB)
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      messageApi.error("File must be smaller than 2MB!");
      setFileList([]);
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("media", file);

    try {
      const response = await fetch(`${API_BASE_URL}api/media`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();

      setProfilePhotoId(data.data || null);
      setUploadSuccess(true);
      messageApi.success("Photo uploaded successfully!");
    } catch (err) {
      messageApi.error("Image upload failed. Please try again.");
      setProfilePhotoId(null);
      setUploadSuccess(false);
      setFileList([]);
    } finally {
      setUploading(false);
    }
  };

  const handleDeletePicture = () => {
    setFileList([]);
    setUploadSuccess(false);
    setProfilePhotoId(null);
  };

  const onSubmit = async (data) => {
    // Validate profile photo presence
    if (!profilePhotoId) {
      messageApi.error("Please upload your profile photo.");
      return;
    }

    // Validate otherExperienceText if needed
    if (
      otherExperienceChecked &&
      (!otherExperienceText.trim() || otherExperienceText.trim().length === 0)
    ) {
      setError("otherExperienceText", {
        type: "required",
        message: "Please specify your other experience",
      });
      return;
    } else {
      clearErrors("otherExperienceText");
    }

    // Process languages
    const languages = [];
    for (let i = 1; i <= 4; i++) {
      const name = data[`language${i}`];
      const proficiency = data[`rate${i}`];
      if (name && proficiency) {
        languages.push({ name, proficiency });
      }
    }

    // Process experienceAreas replacing "other" with text if present
    let experienceAreas = data.experienceAreas || [];
    if (Array.isArray(experienceAreas)) {
      experienceAreas = experienceAreas.map((e) => e.toLowerCase());
      if (experienceAreas.includes("other") && otherExperienceText.trim()) {
        experienceAreas = experienceAreas.filter((area) => area !== "other");
        experienceAreas.push(otherExperienceText.trim());
      } else if (experienceAreas.includes("other")) {
        experienceAreas = experienceAreas.filter((area) => area !== "other");
      }
    }

    // Availability processing
    let availability = { fullDay: false, partTime: false, both: false };
    if (data.workType === "full-time") availability.fullDay = true;
    if (data.workType === "part-time") availability.partTime = true;
    if (data.workType === "both") availability.both = true;

    // Process DOB format
    let dob = data.dob;
    if (dob && typeof dob === "object" && dob.toISOString) {
      dob = dob.toISOString();
    }

    // Shoe size parse
    let shoeSize = data.shoeSize;
    if (typeof shoeSize === "string" && shoeSize.match(/^\d+$/)) {
      shoeSize = parseInt(shoeSize, 10);
    }

    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      city: data.city,
      country: data.country,
      placeOfBirth: data.placeOfBirth,
      dob: dob || "",
      status: data.status,
      telephone: data.telephone,
      cellPhone: data.cellPhone,
      email: data.email,
      weight: data.weight,
      height: data.height,
      shoeSize: shoeSize || "",
      blazerSize: data.blazerSize,
      trouserSize: data.trouserSize,
      student: data.student,
      school: data.school,
      degree: data.degree,
      languages,
      hostessExperience: data.hostessExperience,
      groupResponsible: data.groupResponsible,
      agency: data.agency,
      experienceAreas,
      workType: data.workType,
      holidayWork: data.holidayWork,
      profilePhoto: profilePhotoId ? [profilePhotoId] : [],
      availability,
    };

    try {
      const response = await fetch(`${API_BASE_URL}api/staff-requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to submit form");

      reset();
      setFileList([]);
      setUploadSuccess(false);
      setProfilePhotoId(null);
      setOtherExperienceChecked(false);
      setOtherExperienceText("");
      messageApi.success("Form submitted successfully!");
    } catch (e) {
      messageApi.error("Failed to submit form. Please try again.");
    }
  };
  return (
    // <div
    //   style={{
    //     height: "100vh",
    //     overflowY: "auto",
    //     background: "#000",
    //     color: "#fff",
    //     margin: 0,
    //     padding: 0,
    //   }}
    // >
    //   <style>{`
    //     body, html, #root {
    //       margin: 0;
    //       padding: 0;
    //       background: #000 !important;
    //     }
    //     .ant-form-item-label > label,
    //     .ant-checkbox-wrapper,
    //     .ant-radio-wrapper {
    //       color: #fff !important;
    //     }
    //   `}</style>
    <div
      style={{
        height: "100vh",
        overflowY: "auto",
        background: "#000",
        color: "#fff",
        margin: 0,
        padding: 0,
      }}
    >
      {contextHolder}
      <style>{`
        body, html {
          margin: 0; padding: 0; background: #000 !important;
        }
        .ant-form-item-label > label,
        .ant-checkbox-wrapper,
        .ant-radio-wrapper {
          color: #fff !important;
        }
      `}</style>

      {/* Back Button */}
      <motion.div
        style={{ marginTop: 24, marginBottom: 16 }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <button
          type="button"
          onClick={() => navigate(-1)}
          style={{
            minWidth: 100,
            fontSize: 16,
            padding: "8px 20px",
            borderRadius: "999px",
            color: "#fff",
            background: "transparent",
            border: "1px solid #fff",
            cursor: "pointer",
          }}
        >
          <span style={{ marginRight: 6 }}>&#8592;</span> Back
        </button>
      </motion.div>

      {/* Title */}
      <motion.h1
        className="text-2xl font-bold text-center my-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{ color: "#fff" }}
      >
        Join Our <span style={{ color: "#FFD700" }}>Team</span>
      </motion.h1>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit(onSubmit)}
          style={{
            maxWidth: 700,
            margin: "32px auto",
            padding: 24,
            borderRadius: 16,
          }}
        >
          {/* Upload */}
          <Card style={{ background: "#000", border: "none" }}>
            <Divider
              style={{
                color: "#fff",
                borderColor: "#FFD700",
                fontWeight: 700,
              }}
              orientation="left"
            >
              Upload
            </Divider>
            <Form.Item
              label={"Upload your picture"}
              validateStatus={
                !profilePhotoId && fileList.length === 0 ? "error" : ""
              }
              help={
                !profilePhotoId && fileList.length === 0
                  ? "Profile photo is required"
                  : ""
              }
              required
            >
              <Upload
                listType="picture-card"
                maxCount={1}
                fileList={fileList}
                beforeUpload={() => false} // disable default auto upload
                onChange={handleUploadChange}
                showUploadList={{
                  showPreviewIcon: false,
                  showRemoveIcon: false,
                }}
              >
                {fileList.length >= 1 ? null : (
                  <div style={{ textAlign: "center", color: "#999" }}>
                    <UploadOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </Upload>
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                {fileList.length > 0 && (
                  <Button size="small" danger onClick={handleDeletePicture}>
                    Delete
                  </Button>
                )}
                {uploadSuccess && (
                  <span style={{ color: "#00ff00", fontSize: 13 }}>Saved!</span>
                )}
              </div>
              <small style={{ color: "#FFD700" }}>Max file size 2MB</small>
            </Form.Item>
          </Card>

          {/* Personal Info */}
          <Card
            style={{ background: "#000", border: "none", marginBottom: 24 }}
          >
            <Divider
              style={{
                color: "#fff",
                borderColor: "#FFD700",
                fontWeight: 700,
              }}
              orientation="left"
            >
              Personal Info
            </Divider>
            <Row gutter={16}>
              <Col span={12}>
                <Controller
                  name="firstName"
                  control={control}
                  rules={{ required: "First Name is required" }}
                  render={({ field }) => (
                    <Form.Item
                      label={"First Name"}
                      validateStatus={errors.firstName ? "error" : ""}
                      help={errors.firstName?.message}
                      required
                    >
                      <Input {...field} />
                    </Form.Item>
                  )}
                />
              </Col>
              <Col span={12}>
                <Controller
                  name="lastName"
                  control={control}
                  rules={{ required: "Last Name is required" }}
                  render={({ field }) => (
                    <Form.Item
                      label={"Last Name"}
                      validateStatus={errors.lastName ? "error" : ""}
                      help={errors.lastName?.message}
                      required
                    >
                      <Input {...field} />
                    </Form.Item>
                  )}
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Controller
                  name="address"
                  control={control}
                  rules={{ required: "Address is required" }}
                  render={({ field }) => (
                    <Form.Item
                      label={"Address"}
                      validateStatus={errors.address ? "error" : ""}
                      help={errors.address?.message}
                      required
                    >
                      <Input {...field} />
                    </Form.Item>
                  )}
                />
              </Col>
              <Col span={12}>
                <Controller
                  name="city"
                  control={control}
                  rules={{ required: "City is required" }}
                  render={({ field }) => (
                    <Form.Item
                      label={"City"}
                      validateStatus={errors.city ? "error" : ""}
                      help={errors.city?.message}
                      required
                    >
                      <Input {...field} />
                    </Form.Item>
                  )}
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Controller
                  name="country"
                  control={control}
                  rules={{ required: "Country is required" }}
                  render={({ field }) => (
                    <Form.Item
                      label={"Country"}
                      validateStatus={errors.country ? "error" : ""}
                      help={errors.country?.message}
                      required
                    >
                      <Input {...field} />
                    </Form.Item>
                  )}
                />
              </Col>
              <Col span={12}>
                <Controller
                  name="placeOfBirth"
                  control={control}
                  rules={{ required: "Place of Birth is required" }}
                  render={({ field }) => (
                    <Form.Item
                      label={"Place Of Birth"}
                      validateStatus={errors.placeOfBirth ? "error" : ""}
                      help={errors.placeOfBirth?.message}
                      required
                    >
                      <Input {...field} />
                    </Form.Item>
                  )}
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Controller
                  name="dob"
                  control={control}
                  rules={{ required: "Date of Birth is required" }}
                  render={({ field }) => (
                    <Form.Item
                      label={"Date of Birth"}
                      validateStatus={errors.dob ? "error" : ""}
                      help={errors.dob?.message}
                      required
                    >
                      <DatePicker
                        {...field}
                        style={{ width: "100%" }}
                        format="DD/MM/YYYY"
                        onChange={(date) => field.onChange(date)}
                      />
                    </Form.Item>
                  )}
                />
              </Col>
              <Col span={12}>
                <Controller
                  name="status"
                  control={control}
                  rules={{ required: "Status is required" }}
                  render={({ field }) => (
                    <Form.Item
                      label={"Status"}
                      validateStatus={errors.status ? "error" : ""}
                      help={errors.status?.message}
                      required
                    >
                      <Select {...field} placeholder="Select status">
                        <Option value="single">Single</Option>
                        <Option value="married">Married</Option>
                      </Select>
                    </Form.Item>
                  )}
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Controller
                  name="telephone"
                  control={control}
                  rules={{ required: "Telephone is required" }}
                  render={({ field }) => (
                    <Form.Item
                      label={"Telephone"}
                      validateStatus={errors.telephone ? "error" : ""}
                      help={errors.telephone?.message}
                      required
                    >
                      <Input {...field} />
                    </Form.Item>
                  )}
                />
              </Col>
              <Col span={12}>
                <Controller
                  name="cellPhone"
                  control={control}
                  rules={{ required: "Cell Phone is required" }}
                  render={({ field }) => (
                    <Form.Item
                      label={"Cell Phone"}
                      validateStatus={errors.cellPhone ? "error" : ""}
                      help={errors.cellPhone?.message}
                      required
                    >
                      <Input {...field} />
                    </Form.Item>
                  )}
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: "Invalid email address",
                    },
                  }}
                  render={({ field }) => (
                    <Form.Item
                      label={"Email"}
                      validateStatus={errors.email ? "error" : ""}
                      help={errors.email?.message}
                      required
                    >
                      <Input type="email" {...field} />
                    </Form.Item>
                  )}
                />
              </Col>
            </Row>
          </Card>

          {/* Dimensions */}
          <Card
            style={{ background: "#000", border: "none", marginBottom: 24 }}
          >
            <Divider
              style={{ color: "#fff", borderColor: "#FFD700", fontWeight: 700 }}
              orientation="left"
            >
              Dimensions
            </Divider>
            <Row gutter={16}>
              <Col span={12}>
                <Controller
                  name="weight"
                  control={control}
                  rules={{ required: "Weight is required" }}
                  render={({ field }) => (
                    <Form.Item
                      label={"Weight (kg)"}
                      validateStatus={errors.weight ? "error" : ""}
                      help={errors.weight?.message}
                      required
                    >
                      <Input type="number" {...field} />
                    </Form.Item>
                  )}
                />
              </Col>
              <Col span={12}>
                <Controller
                  name="height"
                  control={control}
                  rules={{ required: "Height is required" }}
                  render={({ field }) => (
                    <Form.Item
                      label={"Height (cm)"}
                      validateStatus={errors.height ? "error" : ""}
                      help={errors.height?.message}
                      required
                    >
                      <Input type="number" {...field} />
                    </Form.Item>
                  )}
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={8}>
                <Controller
                  name="shoeSize"
                  control={control}
                  rules={{ required: "Shoe size is required" }}
                  render={({ field }) => (
                    <Form.Item
                      label={"Shoe Size"}
                      validateStatus={errors.shoeSize ? "error" : ""}
                      help={errors.shoeSize?.message}
                      required
                    >
                      <Select {...field} placeholder="Select shoe size">
                        {[3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((s) => (
                          <Option key={s} value={s}>{`UK ${s}`}</Option>
                        ))}
                      </Select>
                    </Form.Item>
                  )}
                />
              </Col>
              <Col span={8}>
                <Controller
                  name="blazerSize"
                  control={control}
                  rules={{ required: "Blazer size is required" }}
                  render={({ field }) => (
                    <Form.Item
                      label={"Blazer Size"}
                      validateStatus={errors.blazerSize ? "error" : ""}
                      help={errors.blazerSize?.message}
                      required
                    >
                      <Select {...field} placeholder="Select blazer size">
                        {["XS", "S", "M", "L", "XL", "XXL"].map((s) => (
                          <Option key={s} value={s}>
                            {s}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  )}
                />
              </Col>
              <Col span={8}>
                <Controller
                  name="trouserSize"
                  control={control}
                  rules={{ required: "Trouser/Skirt size is required" }}
                  render={({ field }) => (
                    <Form.Item
                      label={"Trouser/Skirt Size"}
                      validateStatus={errors.trouserSize ? "error" : ""}
                      help={errors.trouserSize?.message}
                      required
                    >
                      <Select
                        {...field}
                        placeholder="Select trouser/skirt size"
                      >
                        {["XS", "S", "M", "L", "XL", "XXL"].map((s) => (
                          <Option key={s} value={s}>
                            {s}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  )}
                />
              </Col>
            </Row>
          </Card>

          {/* Education */}
          <Card
            style={{ background: "#000", border: "none", marginBottom: 24 }}
          >
            <Divider
              style={{ color: "#fff", borderColor: "#FFD700", fontWeight: 700 }}
              orientation="left"
            >
              Education
            </Divider>
            <Row gutter={16}>
              <Col span={12}>
                <Controller
                  name="student"
                  control={control}
                  rules={{ required: "Please select if you are a student" }}
                  render={({ field }) => (
                    <Form.Item
                      label={"Are you a student?"}
                      validateStatus={errors.student ? "error" : ""}
                      help={errors.student?.message}
                      required
                    >
                      <Radio.Group {...field}>
                        <Radio value="yes">Yes</Radio>
                        <Radio value="no">No</Radio>
                      </Radio.Group>
                    </Form.Item>
                  )}
                />
              </Col>
              <Col span={12}>
                <Controller
                  name="school"
                  control={control}
                  rules={{ required: "School/University is required" }}
                  render={({ field }) => (
                    <Form.Item
                      label={"School/University"}
                      validateStatus={errors.school ? "error" : ""}
                      help={errors.school?.message}
                      required
                    >
                      <Input {...field} />
                    </Form.Item>
                  )}
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Controller
                  name="degree"
                  control={control}
                  rules={{ required: "Highest Education Degree is required" }}
                  render={({ field }) => (
                    <Form.Item
                      label={"Highest Education Degree"}
                      validateStatus={errors.degree ? "error" : ""}
                      help={errors.degree?.message}
                      required
                    >
                      <Input {...field} />
                    </Form.Item>
                  )}
                />
              </Col>
            </Row>
          </Card>

          {/* Languages */}
          <Card
            style={{ background: "#000", border: "none", marginBottom: 24 }}
          >
            <Divider
              style={{ color: "#fff", borderColor: "#FFD700", fontWeight: 700 }}
              orientation="left"
            >
              Languages
            </Divider>
            {Array.from({ length: 4 }).map((_, i) => (
              <Row gutter={8} key={i}>
                <Col span={16}>
                  <Controller
                    name={`language${i + 1}`}
                    control={control}
                    rules={{ required: `Language ${i + 1} is required` }}
                    render={({ field }) => (
                      <Form.Item
                        label={`Language ${i + 1}`}
                        validateStatus={
                          errors[`language${i + 1}`] ? "error" : ""
                        }
                        help={errors[`language${i + 1}`]?.message}
                        required
                      >
                        <Select
                          {...field}
                          allowClear
                          showSearch
                          placeholder="Language"
                        >
                          {[
                            "English",
                            "Hindi",
                            "Kannada",
                            "Telugu",
                            "Tamil",
                            "Malayalam",
                          ].map((lang) => (
                            <Option key={lang} value={lang}>
                              {lang}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    )}
                  />
                </Col>
                <Col span={8}>
                  <Controller
                    name={`rate${i + 1}`}
                    control={control}
                    rules={{ required: `Rate ${i + 1} is required` }}
                    render={({ field }) => (
                      <Form.Item
                        label="Rate"
                        validateStatus={errors[`rate${i + 1}`] ? "error" : ""}
                        help={errors[`rate${i + 1}`]?.message}
                        required
                      >
                        <Select {...field} allowClear placeholder="Rate">
                          {["Basic", "Conversational", "Fluent", "Native"].map(
                            (rate) => (
                              <Option key={rate} value={rate}>
                                {rate}
                              </Option>
                            )
                          )}
                        </Select>
                      </Form.Item>
                    )}
                  />
                </Col>
              </Row>
            ))}
          </Card>

          {/* Experience */}
          <Card
            style={{ background: "#000", border: "none", marginBottom: 24 }}
          >
            <Divider
              style={{ color: "#fff", borderColor: "#FFD700", fontWeight: 700 }}
              orientation="left"
            >
              Experience
            </Divider>
            <Row gutter={16}>
              <Col span={12}>
                <Controller
                  name="hostessExperience"
                  control={control}
                  rules={{ required: "Host/hostess experience is required" }}
                  render={({ field }) => (
                    <Form.Item
                      label={"Worked as host/hostess?"}
                      validateStatus={errors.hostessExperience ? "error" : ""}
                      help={errors.hostessExperience?.message}
                      required
                    >
                      <Radio.Group {...field}>
                        <Radio value="yes">Yes</Radio>
                        <Radio value="no">No</Radio>
                      </Radio.Group>
                    </Form.Item>
                  )}
                />
              </Col>
              <Col span={12}>
                <Controller
                  name="groupResponsible"
                  control={control}
                  rules={{ required: "Group responsibility is required" }}
                  render={({ field }) => (
                    <Form.Item
                      label={"Been responsible for a group?"}
                      validateStatus={errors.groupResponsible ? "error" : ""}
                      help={errors.groupResponsible?.message}
                      required
                    >
                      <Radio.Group {...field}>
                        <Radio value="yes">Yes</Radio>
                        <Radio value="no">No</Radio>
                      </Radio.Group>
                    </Form.Item>
                  )}
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Controller
                  name="agency"
                  control={control}
                  rules={{ required: "Agency is required" }}
                  render={({ field }) => (
                    <Form.Item
                      label={"Agency you worked with"}
                      validateStatus={errors.agency ? "error" : ""}
                      help={errors.agency?.message}
                      required
                    >
                      <Input {...field} />
                    </Form.Item>
                  )}
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Controller
                  name="experienceAreas"
                  control={control}
                  rules={{
                    required: "Please select at least one experience area",
                  }}
                  render={({ field }) => (
                    <Form.Item
                      label={"Area of Experience"}
                      validateStatus={errors.experienceAreas ? "error" : ""}
                      help={errors.experienceAreas?.message}
                      required
                    >
                      <Checkbox.Group {...field}>
                        <Row>
                          {[
                            "Actor/Actress",
                            "Barman/barmaid",
                            "Group Management",
                            "Modeling",
                            "Sales/Marketing",
                            "Waiter/Waitress",
                          ].map((label, i) => (
                            <Col span={12} key={i}>
                              <Checkbox value={label.toLowerCase()}>
                                {label}
                              </Checkbox>
                            </Col>
                          ))}
                          <Col span={12}>
                            <Checkbox value="other">Other</Checkbox>
                          </Col>
                        </Row>
                      </Checkbox.Group>
                    </Form.Item>
                  )}
                />
              </Col>
            </Row>

            {/* Other Experience Text Area with validation */}
            {otherExperienceChecked && (
              <Row>
                <Col span={24}>
                  <Form.Item
                    label={"Please specify other experience"}
                    validateStatus={errors.otherExperienceText ? "error" : ""}
                    help={errors.otherExperienceText?.message}
                    required
                  >
                    <TextArea
                      rows={3}
                      value={otherExperienceText}
                      onChange={(e) => setOtherExperienceText(e.target.value)}
                      placeholder="Describe your other experience..."
                      maxLength={500}
                    />
                    <div style={{ color: "#999", fontSize: 12, marginTop: 4 }}>
                      {otherExperienceText.length}/500 characters
                    </div>
                  </Form.Item>
                </Col>
              </Row>
            )}
          </Card>

          {/* Submit */}
          <Form.Item style={{ marginTop: 24 }}>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{
                background: "#13294B",
                color: "#fff",
                fontWeight: 700,
                fontSize: 18,
                letterSpacing: 1,
                boxShadow: "0 0 12px 2px #13294B",
                border: "none",
                height: "50px",
              }}
              className="submit-btn"
              loading={uploading}
            >
              Submit
            </Button>
            );
            <style>{`
              .submit-btn:hover {
                background: #2546a3 !important;
              }
            `}</style>
          </Form.Item>
        </Form>
      </motion.div>
    </div>
  );
};

export default RecruitmentForm;
