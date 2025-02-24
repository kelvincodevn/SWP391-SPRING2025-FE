import { useState, useEffect } from "react";
import { FiEye, FiEyeOff, FiUpload } from "react-icons/fi";
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaHome, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import axios from "axios";

const RegistrationPage2 = () => {
  const [step, setStep] = useState(1);
  const [accountType, setAccountType] = useState("");
  const [includeChild, setIncludeChild] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const navigate = useNavigate();

  // Parent and Student Form Data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    password: "",
    confirmPassword: "",
    avatar: null,
    address: "",
  });

  // Child Form Data (for parent registration)
  const [childFormData, setChildFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    gender: "",
    grade: "",
    school: "",
  });

  const validateBasicInfo = () => {
    const newErrors = {};
    if (!formData.firstName || formData.firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }
    if (!/^[A-Za-z\s]+$/.test(formData.firstName)) {
      newErrors.firstName = "Name should not contain numbers";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateChildInfo = () => {
    const newErrors = {};
    if (includeChild) {
      if (!childFormData.firstName) {
        newErrors.childFirstName = "Child's first name is required";
      }
      if (!childFormData.dob) {
        newErrors.childDob = "Child's date of birth is required";
      }
      if (!childFormData.gender) {
        newErrors.childGender = "Child's gender is required";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e) => { // Receive event object
    e.preventDefault(); // Prevent default form submission
    let isValid = false;

    switch (step) {
      case 1:
        if (accountType) {
          isValid = true;
        }
        break;
      case 2:
        isValid = validateBasicInfo();
        break;
      case 3:
        if (accountType === "parent") {
          isValid = validateChildInfo();
        }
        break;
      default:
        isValid = true;
    }

    if (isValid) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if it's the final step before submitting
    if (!isLastStep()) {
      return; // Do nothing if it's not the last step
    }

    let isValid = false;

    switch (accountType) {
      case "student":
        isValid = validateBasicInfo();
        break;
      case "parent":
        isValid = validateBasicInfo() && (!includeChild || validateChildInfo());
        break;
      default:
        isValid = true;
    }

    if (isValid) {
      setLoading(true);
      try {
        // Prepare data based on account type
        const submitData = {
          ...formData,
          accountType,
          ...(accountType === "parent" && includeChild && { childInfo: childFormData }),
        };

        const response = await axios.post(
          "https://67a8962b6e9548e44fc1712a.mockapi.io/api/v1/User",
          submitData
        );
        toast.success("Registration Successful");
        navigate("/login");
      } catch (error) {
        toast.error(error.response?.data || "Registration failed");
      } finally {
        setLoading(false);
      }
    }
  };

  const renderAccountTypeSelection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-center mb-6">Choose Account Type</h3>
      <div className="grid grid-cols-1 gap-4">
        {["student", "parent"].map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setAccountType(type)}
            className={`p-4 rounded-lg border-2 ${
              accountType === type
                ? "border-purple-500 bg-purple-50"
                : "border-gray-200 hover:border-purple-200"
            } transition-all duration-200`}
          >
            <div className="font-medium capitalize">{type}</div>
            <div className="text-sm text-gray-500 mt-1">
              {type === "student" && "Register as a student to access mental health support"}
              {type === "parent" && "Register as a parent and optionally add your child"}
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderBasicInfoForm = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-center mb-6">Basic Information</h3>
      <div className="flex gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className={`w-full px-4 py-2 rounded-lg border ${
              errors.firstName ? "border-red-300" : "border-gray-300"
            } focus:ring-2 focus:ring-purple-200 outline-none`}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
          )}
        </div>
        <div className="flex-1">
          <input
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-200 outline-none"
          />
        </div>
      </div>

      <input
        type="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className={`w-full px-4 py-2 rounded-lg border ${
          errors.email ? "border-red-300" : "border-gray-300"
        } focus:ring-2 focus:ring-purple-200 outline-none`}
      />
      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}

      <input
        type="tel"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        className={`w-full px-4 py-2 rounded-lg border ${
          errors.phone ? "border-red-300" : "border-gray-300"
        } focus:ring-2 focus:ring-purple-200 outline-none`}
      />
      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}

      <div className="flex gap-4">
        <div className="flex-1">
        <input
            type="date"
            value={formData.dob}
            max={format(new Date(), "yyyy-MM-dd")}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-200 outline-none"
          />
        </div>
        <div className="flex-1">
          <select
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-200 outline-none"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-200 outline-none"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-2.5 text-gray-400"
        >
          {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
        </button>
      </div>

      <input
        type="password"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-200 outline-none"
      />

      <div className="flex flex-col items-center justify-center">
        <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center relative overflow-hidden">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              alt="Avatar Preview"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <FiUpload size={24} className="text-gray-400" />
          )}
          <input
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setFormData({ ...formData, avatar: file });
                const reader = new FileReader();
                reader.onloadend = () => setAvatarPreview(reader.result);
                reader.readAsDataURL(file);
              }
            }}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );

  const renderParentChildForm = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-center mb-6">Child Information</h3>

      <div className="mb-6">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={includeChild}
            onChange={(e) => setIncludeChild(e.target.checked)}
            className="form-checkbox h-5 w-5 text-purple-600"
          />
          <span className="text-gray-700">Would you like to register your child?</span>
        </label>
      </div>

      {includeChild && (
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Child's First Name"
                value={childFormData.firstName}
                onChange={(e) =>
                  setChildFormData({ ...childFormData, firstName: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-200 outline-none"
              />
            </div>
            <div className="flex-1">
              <input
                type="text"
                placeholder="Child's Last Name"
                value={childFormData.lastName}
                onChange={(e) =>
                  setChildFormData({ ...childFormData, lastName: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-200 outline-none"
              />
            </div>
          </div>

          <input
            type="email"
            placeholder="Child's Email Address"
            value={childFormData.email}
            onChange={(e) =>
              setChildFormData({ ...childFormData, email: e.target.value })
            }
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-200 outline-none"
          />

          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="date"
                placeholder="Child's Date of Birth"
                value={childFormData.dob}
                max={format(new Date(), "yyyy-MM-dd")}
                onChange={(e) =>
                  setChildFormData({ ...childFormData, dob: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-200 outline-none"
              />
            </div>
            <div className="flex-1">
              <select
                value={childFormData.gender}
                onChange={(e) =>
                  setChildFormData({ ...childFormData, gender: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-200 outline-none"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <input
            type="text"
            placeholder="School Name"
            value={childFormData.school}
            onChange={(e) =>
              setChildFormData({ ...childFormData, school: e.target.value })
            }
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-200 outline-none"
          />

          <select
            value={childFormData.grade}
            onChange={(e) =>
              setChildFormData({ ...childFormData, grade: e.target.value })
            }
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-200 outline-none"
          >
            <option value="">Select Grade</option>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                Grade {i + 1}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return renderAccountTypeSelection();
      case 2:
        return renderBasicInfoForm();
      case 3:
        if (accountType === "parent") {
          return renderParentChildForm();
        }
        return null;
      default:
        return null;
    }
  };

  const isLastStep = () => {
    if (accountType === "student") return step === 2;
    if (accountType === "parent") return step === 3;
    return false;
  };

  return (
    <div className="min-h-screen flex overflow-y-auto">
      {/* Left Side - Image */}
      <div className="hidden lg:flex flex-1 relative">
        <img
          src="src/assests1/mental/mental_health_register.jpg"
          alt="Mental Health"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0">
          <Link to="/" className="flex items-center">
            <img
              src="src/assests1/mental/medical-aid.png"
              alt="FCare Logo"
              className="w-16 h-16 object-contain m-4"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-800">
              FCare
            </span>
          </Link>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="lg:w-1/2 ml-auto min-h-screen overflow-y-auto flex flex-col items-center p-8 bg-white">
        <div className="max-w-md w-full space-y-8">
          {/* Progress Steps */}
          <div className="flex justify-center items-center space-x-4 mb-8">
            {[1, 2, 3].map((stepNumber) => (
              <div
                key={stepNumber}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= stepNumber
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {stepNumber}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {renderStepContent()}

            <div className="flex justify-between space-x-4">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  <FaArrowLeft className="mr-2" /> Back
                </button>
              )}

              {!isLastStep() ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 ml-auto"
                >
                  Next <FaArrowRight className="ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 ml-auto"
                >
                  {loading ? "Registering..." : "Complete Registration"}
                </button>
              )}
            </div>
          </form>

          <div className="flex justify-between items-center mt-6">
            <Link
              to="/"
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <FaHome className="mr-2" /> Home
            </Link>
            <Link to="/login" className="text-purple-600 hover:text-purple-700">
              Already have an account? Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage2;