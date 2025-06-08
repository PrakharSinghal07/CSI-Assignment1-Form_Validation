import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const init = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  phoneCode: "",
  phoneNumber: "",
  country: "",
  city: "",
  pan: "",
  aadhar: "",
};

function FormPage() {
  const [data, setData] = useState(init);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [valid, setValid] = useState(false);
  const nav = useNavigate();

  const countries = {
    India: ["Delhi", "Mumbai", "Jaipur"],
    USA: ["New York", "San Francisco", "Chicago"],
  };

  function validateForm() {
    const errs = {};

    if (data.firstName === "" || data.firstName === undefined) {
      errs.firstName = "First Name is required";
    }

    if (data.lastName === "" || data.lastName === undefined) {
      errs.lastName = "Last Name is required";
    }

    if (data.username === "" || data.username === undefined) {
      errs.username = "Username is required";
    }

    if (data.email === "" || data.email === undefined) {
      errs.email = "Email is required";
    } else {
      // Simple email pattern check
      if (!data.email.includes("@") || !data.email.includes(".")) {
        errs.email = "Please enter a valid email";
      }
    }

    if (data.password === "" || data.password === undefined) {
      errs.password = "Password is required";
    } else if (data.password.length < 6) {
      errs.password = "Password must be at least 6 characters";
    }

    if (data.phoneCode === "" || data.phoneCode === undefined) {
      errs.phoneCode = "Phone code is required";
    }

    if (data.phoneNumber === "" || data.phoneNumber === undefined) {
      errs.phoneNumber = "Phone number is required";
    } else if (data.phoneNumber.length !== 10) {
      errs.phoneNumber = "Phone number must be 10 digits";
    } else if (isNaN(Number(data.phoneNumber))) {
      errs.phoneNumber = "Phone number must contain only numbers";
    }

    if (data.country === "" || data.country === undefined) {
      errs.country = "Please select a country";
    }

    if (data.city === "" || data.city === undefined) {
      errs.city = "Please select a city";
    }

    if (data.pan === "" || data.pan === undefined) {
      errs.pan = "PAN is required";
    } else {
      // Check PAN length and format manually
      if (data.pan.length !== 10) {
        errs.pan = "PAN must be 10 characters";
      } else {
        const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
        if (!panPattern.test(data.pan)) {
          errs.pan = "PAN format is invalid";
        }
      }
    }

    if (data.aadhar === "" || data.aadhar === undefined) {
      errs.aadhar = "Aadhar is required";
    } else if (data.aadhar.length !== 12) {
      errs.aadhar = "Aadhar must be 12 digits";
    } else if (isNaN(Number(data.aadhar))) {
      errs.aadhar = "Aadhar must contain only numbers";
    }

    return errs;
  }

  useEffect(() => {
    setErrors(validateForm());
  }, [data]);

  useEffect(() => {
    const noErrors = Object.keys(errors).length === 0;
    const allFilled = Object.values(data).every((val) => val !== "");
    setValid(noErrors && allFilled);
  }, [errors, data]);

  function handleChange(e) {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }

  function handleBlur(e) {
    const name = e.target.name;
    setTouched((prev) => ({ ...prev, [name]: true }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Mark all as touched on submit so errors show up
    const allTouched = {};
    for (let key in data) {
      allTouched[key] = true;
    }
    setTouched(allTouched);

    if (valid) {
      nav("/summary", { state: data });
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: 450, margin: "30px auto" }}
    >
      <h2>Register</h2>

      {[
        "firstName",
        "lastName",
        "username",
        "email",
        "phoneCode",
        "phoneNumber",
        "pan",
        "aadhar",
      ].map((field) => (
        <div key={field} style={{ marginBottom: 14 }}>
          <label className="label">
            {field[0].toUpperCase() + field.slice(1)}:{" "}
            <input
              type="text"
              name={field}
              value={data[field]}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </label>
          {touched[field] && errors[field] && (
            <div style={{ color: "red", fontSize: 12 }}>{errors[field]}</div>
          )}
        </div>
      ))}

      <div style={{ marginBottom: 14 }}>
        <label>
          Password:{" "}
          <input
            type={showPass ? "text" : "password"}
            name="password"
            value={data.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            style={{ marginLeft: 8, cursor: "pointer" }}
          >
            {showPass ? "Hide" : "Show"}
          </button>
        </label>
        {touched.password && errors.password && (
          <div style={{ color: "red", fontSize: 12 }}>{errors.password}</div>
        )}
      </div>

      <div style={{ marginBottom: 14 }}>
        <label>
          Country:{" "}
          <select
            name="country"
            value={data.country}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">-- Select --</option>
            {Object.keys(countries).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        {touched.country && errors.country && (
          <div style={{ color: "red", fontSize: 12 }}>{errors.country}</div>
        )}
      </div>

      <div style={{ marginBottom: 14 }}>
        <label>
          City:{" "}
          <select
            name="city"
            value={data.city}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={!data.country}
          >
            <option value="">-- Select --</option>
            {countries[data.country]?.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </label>
        {touched.city && errors.city && (
          <div style={{ color: "red", fontSize: 12 }}>{errors.city}</div>
        )}
      </div>

      <button
        type="submit"
        disabled={!valid}
        style={{
          padding: "10px 16px",
          cursor: valid ? "pointer" : "not-allowed",
        }}
      >
        Submit
      </button>
    </form>
  );
}

export default FormPage;
