import { useState, useRef, useEffect } from "react";
import { Button } from "./components/button";
import { Input } from "./components/input";
import { RadioGroup, RadioGroupItem } from "./components/radio-group";
import { Checkbox } from "./components/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/select";
import { Popover, PopoverContent, PopoverTrigger } from "./components/popover";
import { Calendar } from "./components/calendar";
import { Label } from "./components/label";
import { Slider } from "./components/slider";
import {
  CalendarIcon,
  StarIcon,
  UploadIcon,
  BotIcon,
  UserIcon,
  CheckCircleIcon,
} from "lucide-react";
import { format } from "date-fns";
import { apiRequest } from "./lib/utils";

const DEVchatbotID = "afb87a1e-a0d2-4776-9a64-bf87bf4fe8f8";

const styles = {
  page: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    position: "relative",
    overflow: "hidden",
  },
  header: {
    background: "rgba(255,255,255,0.95)",
    backdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(255,255,255,0.2)",
    padding: "20px 24px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
    position: "relative",
  },
  headerInner: {
    maxWidth: 1024,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  logo: { height: 40, width: "auto", display: "block" },
  h1: {
    fontSize: 24,
    fontWeight: 700,
    color: "#1a202c",
    margin: 0,
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  pDesc: {
    marginTop: 4,
    color: "#64748b",
    fontSize: "14px",
    fontWeight: 500,
  },

  shell: { flex: 1, overflow: "hidden" },
  shellInner: {
    maxWidth: 1024,
    margin: "0 auto",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  scrollPad: { padding: 24, height: "100%" },

  rowBase: {
    display: "flex",
    alignItems: "flex-end",
    gap: 16,
    marginBottom: "20px",
    animation: "slideInUp 0.6s ease-out",
  },
  rowLeft: { justifyContent: "flex-start" },
  rowRight: { justifyContent: "flex-end" },

  avatarBot: {
    width: 40,
    height: 40,
    borderRadius: "12px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)",
    border: "2px solid rgba(255,255,255,0.2)",
  },
  avatarUser: {
    width: 40,
    height: 40,
    borderRadius: "12px",
    background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    boxShadow: "0 8px 25px rgba(79, 70, 229, 0.4)",
    border: "2px solid rgba(255,255,255,0.2)",
  },

  bubble: {
    maxWidth: 560,
    padding: "16px 20px",
    borderRadius: "20px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
    position: "relative",
    fontSize: "15px",
    lineHeight: "1.6",
    fontWeight: 500,
  },
  bubbleBot: {
    background: "rgba(255,255,255,0.95)",
    color: "#2d3748",
    border: "1px solid rgba(255,255,255,0.3)",
    borderBottomLeftRadius: 8,
    backdropFilter: "blur(20px)",
  },
  bubbleUser: {
    background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
    color: "white",
    borderBottomRightRadius: 8,
    border: "1px solid rgba(255,255,255,0.2)",
  },

  card: {
    background: "rgba(255,255,255,0.95)",
    borderRadius: "20px",
    padding: "24px",
    border: "1px solid rgba(255,255,255,0.3)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
    maxWidth: 640,
    backdropFilter: "blur(20px)",
    position: "relative",
  },

  inputBar: {
    background: "rgba(255,255,255,0.95)",
    backdropFilter: "blur(20px)",
    borderTop: "1px solid rgba(255,255,255,0.2)",
    padding: "20px 24px",
    boxShadow: "0 -8px 32px rgba(0,0,0,0.1)",
  },
  inputInner: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    maxWidth: 1024,
    margin: "0 auto",
  },
  input: {
    fontSize: 16,
    border: "2px solid rgba(255,255,255,0.3)",
    outline: "none",
    paddingRight: 48,
    height: 56,
    borderRadius: 16,
    width: "100%",
    background: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(10px)",
    transition: "all 0.3s ease",
    fontWeight: 500,
  },
  inputFocus: {
    borderColor: "#667eea",
    boxShadow: "0 0 0 4px rgba(102, 126, 234, 0.1)",
    background: "rgba(255,255,255,1)",
  },
  sendBtn: {
    height: 56,
    width: 56,
    borderRadius: 16,
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    border: "none",
    boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },

  typingWrap: {
    display: "flex",
    alignItems: "flex-end",
    gap: 16,
    justifyContent: "flex-start",
    marginBottom: "20px",
  },
  typingBubble: {
    background: "rgba(255,255,255,0.9)",
    borderRadius: "20px",
    borderBottomLeftRadius: 8,
    padding: "16px 20px",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.3)",
    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
  },
  dot: {
    width: 8,
    height: 8,
    background: "#94a3b8",
    borderRadius: 9999,
    display: "inline-block",
    marginRight: 6,
    animation: "typingBounce 1.4s infinite ease-in-out",
  },

  loadingPage: {
    display: "flex",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  center: { textAlign: "center" },
  successBox: {
    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "20px",
    padding: "32px",
    textAlign: "center",
    maxWidth: 480,
    color: "white",
    boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)",
  },

  fieldSpace: { marginTop: 16 },
  sectionSpace: { display: "grid", gap: 16 },
  subtle: { color: "#64748b", fontSize: 14, fontWeight: 500 },

  dashedDrop: {
    border: "2px dashed rgba(102, 126, 234, 0.3)",
    borderRadius: 16,
    padding: 32,
    textAlign: "center",
    background: "rgba(102, 126, 234, 0.05)",
    transition: "all 0.3s ease",
  },
  blueText: { color: "#667eea", fontWeight: 600 },
  errorText: { color: "#ef4444", fontSize: 13, marginTop: 8, fontWeight: 500 },
};

function validateField(field, response) {
  const value = response;

  if (
    field.required &&
    (value == null ||
      value === "" ||
      (Array.isArray(value) && value.length === 0))
  ) {
    return { valid: false, message: "This field is required." };
  }

  // Matrix specific validation
  if (field.type === "matrix") {
    const rows = field.matrixRows || ["Row 1", "Row 2", "Row 3"];
    const objectValue = (value && typeof value === "object") ? value : {};
    if (field.required) {
      for (let i = 0; i < rows.length; i++) {
        const key = `${i}`;
        if (!objectValue[key] || String(objectValue[key]).trim() === "") {
          return { valid: false, message: "Please select an option for each row." };
        }
      }
    }
    return { valid: true, value: objectValue };
  }

  if (field.validation) {
    for (const rule of field.validation) {
      switch (rule.type) {
        case "min":
          if (typeof value === "string" && value.length < rule.value)
            return {
              valid: false,
              message: `Minimum ${rule.value} characters required.`,
            };
          if (typeof value === "number" && value < rule.value)
            return {
              valid: false,
              message: `Minimum value is ${rule.value}.`,
            };
          break;
        case "max":
          if (typeof value === "string" && value.length > rule.value)
            return {
              valid: false,
              message: `Maximum ${rule.value} characters allowed.`,
            };
          if (typeof value === "number" && value > rule.value)
            return {
              valid: false,
              message: `Maximum value is ${rule.value}.`,
            };
          break;
        case "email":
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value))
            return { valid: false, message: "Please enter a valid email." };
          break;
        case "url":
          try {
            new URL(value);
          } catch {
            return { valid: false, message: "Please enter a valid URL." };
          }
          break;
        case "pattern":
          const regex = new RegExp(rule.value);
          if (!regex.test(value))
            return {
              valid: false,
              message: rule.message || "Invalid format.",
            };
          break;
      }
    }
  }

  return { valid: true, value };
}

function TypingIndicator() {
  return (
    <div style={styles.typingWrap}>
      <div style={styles.avatarBot}>
        <BotIcon style={{ width: 20, height: 20 }} />
      </div>
      <div style={styles.typingBubble}>
        <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
          <div style={{ ...styles.dot, animationDelay: "0ms" }}></div>
          <div style={{ ...styles.dot, animationDelay: "200ms" }}></div>
          <div style={{ ...styles.dot, animationDelay: "400ms" }}></div>
        </div>
      </div>
    </div>
  );
}

function FieldRenderer({ field, onSubmit }) {
  const [value, setValue] = useState(
    field.type === "checkbox"
      ? []
      : field.type === "matrix"
      ? field.defaultValue || {}
      : field.defaultValue || ""
  );
  const [error, setError] = useState("");
  const [date, setDate] = useState();

  const handleSubmit = () => {
    let submitValue = value;
    if (field.type === "date" && date) {
      submitValue = format(date, "yyyy-MM-dd");
    }

    const validation = validateField(field, submitValue);
    if (!validation.valid) {
      setError(validation.message);
      return;
    }

    setError("");
    onSubmit(validation.value);
  };

  const fieldStyles = {
    container: {
      animation: "fadeInUp 0.5s ease-out",
    },
    button: {
      marginTop: "20px",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      border: "none",
      borderRadius: "12px",
      padding: "12px 24px",
      fontSize: "14px",
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
    },
  };

  switch (field.type) {
    case "text":
    case "email":
    case "url":
    case "password":
      return (
        <div style={fieldStyles.container}>
          <Input
            type={field.type}
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{
              marginBottom: "16px",
              borderRadius: "12px",
              border: "2px solid #e2e8f0",
              padding: "12px 16px",
              fontSize: "15px",
              transition: "all 0.3s ease",
              background: "rgba(255,255,255,0.9)",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#667eea";
              e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#e2e8f0";
              e.target.style.boxShadow = "none";
            }}
          />
          {error && <p style={styles.errorText}>{error}</p>}
          <Button
            onClick={handleSubmit}
            style={fieldStyles.button}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 8px 25px rgba(102, 126, 234, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.3)";
            }}
          >
            Submit Answer
          </Button>
        </div>
      );

    case "textarea":
      return (
        <div style={fieldStyles.container}>
          <textarea
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={4}
            style={{
              width: "100%",
              marginBottom: "16px",
              borderRadius: "12px",
              border: "2px solid #e2e8f0",
              padding: "12px 16px",
              fontSize: "15px",
              fontFamily: "inherit",
              resize: "vertical",
              transition: "all 0.3s ease",
              background: "rgba(255,255,255,0.9)",
              outline: "none",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#667eea";
              e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#e2e8f0";
              e.target.style.boxShadow = "none";
            }}
          />
          {error && <p style={styles.errorText}>{error}</p>}
          <Button
            onClick={handleSubmit}
            style={fieldStyles.button}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 8px 25px rgba(102, 126, 234, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.3)";
            }}
          >
            Submit Answer
          </Button>
        </div>
      );

    case "select":
      return (
        <div style={fieldStyles.container}>
          <Select value={value} onValueChange={setValue}>
            <SelectTrigger
              style={{
                marginBottom: "16px",
                borderRadius: "12px",
                border: "2px solid #e2e8f0",
                padding: "12px 16px",
                fontSize: "15px",
                transition: "all 0.3s ease",
                background: "rgba(255,255,255,0.9)",
              }}
            >
              <SelectValue placeholder={field.label} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {error && <p style={styles.errorText}>{error}</p>}
          <Button
            onClick={handleSubmit}
            style={fieldStyles.button}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 8px 25px rgba(102, 126, 234, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.3)";
            }}
          >
            Submit Answer
          </Button>
        </div>
      );

    case "radio":
      return (
        <div style={fieldStyles.container}>
          <RadioGroup
            value={value}
            onValueChange={setValue}
            style={{ marginBottom: "16px" }}
          >
            {field.options?.map((option) => (
              <div
                key={option}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "8px 0",
                  transition: "all 0.2s ease",
                }}
              >
                <RadioGroupItem value={option} id={option} />
                <Label
                  htmlFor={option}
                  style={{
                    fontSize: "15px",
                    fontWeight: 500,
                    cursor: "pointer",
                    color: "#374151",
                  }}
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
          {error && <p style={styles.errorText}>{error}</p>}
          <Button
            onClick={handleSubmit}
            style={fieldStyles.button}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 8px 25px rgba(102, 126, 234, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.3)";
            }}
          >
            Submit Answer
          </Button>
        </div>
      );

    case "checkbox":
      return (
        <div style={fieldStyles.container}>
          <div style={{ marginBottom: "16px" }}>
            {field.options?.map((option) => (
              <div
                key={option}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "8px 0",
                  transition: "all 0.2s ease",
                }}
              >
                <Checkbox
                  checked={value.includes(option)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setValue([...value, option]);
                    } else {
                      setValue(value.filter((v) => v !== option));
                    }
                  }}
                  id={option}
                />
                <Label
                  htmlFor={option}
                  style={{
                    fontSize: "15px",
                    fontWeight: 500,
                    cursor: "pointer",
                    color: "#374151",
                  }}
                >
                  {option}
                </Label>
              </div>
            ))}
          </div>
          {error && <p style={styles.errorText}>{error}</p>}
          <Button
            onClick={handleSubmit}
            style={fieldStyles.button}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 8px 25px rgba(102, 126, 234, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.3)";
            }}
          >
            Submit Answer
          </Button>
        </div>
      );

    case "date":
      return (
        <div style={fieldStyles.container}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                style={{
                  width: "100%",
                  justifyContent: "flex-start",
                  textAlign: "left",
                  marginBottom: "16px",
                  borderRadius: "12px",
                  border: "2px solid #e2e8f0",
                  padding: "12px 16px",
                  fontSize: "15px",
                  background: "rgba(255,255,255,0.9)",
                  color: date ? "#374151" : "#9ca3af",
                  fontWeight: 500,
                }}
              >
                <CalendarIcon
                  style={{ marginRight: 8, height: 16, width: 16 }}
                />
                {date
                  ? format(date, "PPP")
                  : field.placeholder || "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent style={{ width: "auto", padding: 0 }}>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {error && <p style={styles.errorText}>{error}</p>}
          <Button
            onClick={handleSubmit}
            style={fieldStyles.button}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 8px 25px rgba(102, 126, 234, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.3)";
            }}
          >
            Submit Answer
          </Button>
        </div>
      );

    case "rating":
      return (
        <div style={fieldStyles.container}>
          <div
            style={{
              display: "flex",
              gap: "8px",
              marginBottom: "16px",
              justifyContent: "center",
            }}
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                style={{
                  height: 32,
                  width: 32,
                  cursor: "pointer",
                  color: star <= value ? "#fbbf24" : "#d1d5db",
                  fill: star <= value ? "#fbbf24" : "transparent",
                  transition: "all 0.2s ease",
                }}
                onClick={() => setValue(star)}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)";
                }}
              />
            ))}
          </div>
          {error && <p style={styles.errorText}>{error}</p>}
          <Button
            onClick={handleSubmit}
            style={fieldStyles.button}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 8px 25px rgba(102, 126, 234, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.3)";
            }}
          >
            Submit Answer
          </Button>
        </div>
      );

    case "matrix": {
      const matrixRows = field.matrixRows || ["Row 1", "Row 2", "Row 3"];
      const matrixColumns = field.matrixColumns || ["1", "2", "3", "4", "5"];
      const matrixValue = (value && typeof value === "object") ? value : {};

      return (
        <div style={fieldStyles.container}>
          <div
            style={{
              border: "1px solid #e6eaf0",
              borderRadius: 12,
              overflowX: "auto",
              background: "#ffffff",
            }}
          >
            <table
              style={{
                width: "100%",
                fontSize: 14,
                borderCollapse: "separate",
                borderSpacing: 0,
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      textAlign: "left",
                      padding: 12,
                      borderBottom: "1px solid #eef2f7",
                      background: "#f8fafc",
                      minWidth: 140,
                      fontWeight: 600,
                      color: "#111827",
                    }}
                  ></th>
                  {matrixColumns.map((col, index) => (
                    <th
                      key={index}
                      style={{
                        textAlign: "center",
                        padding: 12,
                        borderBottom: "1px solid #eef2f7",
                        background: "#f8fafc",
                        minWidth: 48,
                        fontWeight: 600,
                        color: "#111827",
                      }}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {matrixRows.map((row, rowIndex) => (
                  <RadioGroup
                    key={rowIndex}
                    asChild
                    value={matrixValue[`${rowIndex}`] || ""}
                    onValueChange={(val) => {
                      const newValue = {
                        ...matrixValue,
                        [`${rowIndex}`]: val,
                      };
                      setValue(newValue);
                    }}
                    style={{ display: "table-row" }}
                  >
                    <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td
                        style={{
                          padding: 12,
                          fontWeight: 600,
                          color: "#374151",
                          background: rowIndex % 2 === 0 ? "#f8fafc" : "#ffffff",
                          borderRight: "1px solid #eef2f7",
                          minWidth: 160,
                        }}
                      >
                        {row}
                      </td>
                      {matrixColumns.map((_, colIndex) => (
                        <td key={colIndex} style={{ textAlign: "center", padding: 12 }}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <RadioGroupItem
                              value={`${colIndex + 1}`}
                              id={`${field.id}-${rowIndex}-${colIndex}`}
                              style={{ height: 16, width: 16 }}
                            />
                          </div>
                        </td>
                      ))}
                    </tr>
                  </RadioGroup>
                ))}
              </tbody>
            </table>

            {error && <p style={{ ...styles.errorText, margin: 12 }}>{error}</p>}
          </div>

          <Button
            onClick={handleSubmit}
            style={{ ...fieldStyles.button, marginTop: 14 }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-1px)";
              e.target.style.boxShadow = "0 8px 20px rgba(102, 126, 234, 0.35)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.25)";
            }}
          >
            Submit Answer
          </Button>
        </div>
      );
    }

    default:
      return (
        <div style={fieldStyles.container}>
          <p style={{ color: "#ef4444", fontWeight: 500 }}>
            Unsupported field type: {field.type}
          </p>
        </div>
      );
  }
}

export default function App() {
  const [conversation, setConversation] = useState([]);
  const [form, setForm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [answeredFields, setAnsweredFields] = useState({});
  const [activeField, setActiveField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [startTime] = useState(Date.now());
  const [isAiChatMode, setIsAiChatMode] = useState(false);
  const [aiChatStartIndex, setAiChatStartIndex] = useState(null);
  const [aiConversation, setAiConversation] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const [id, setId] = useState(null);

  const showError = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  };

  const textInputTypes = [
    "text",
    "textarea",
    "email",
    "number",
    "password",
    "url",
  ];

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      setId(DEVchatbotID);
    } else {
      const scriptTag = document.getElementById("gateway-chatbot");
      const chatbotId = scriptTag.getAttribute("chatbotId");
      if (chatbotId) {
        setId(chatbotId);
      } else {
        console.error("ChatbotID not found");
        setId(DEVchatbotID);
      }
    }
    loadForm();
  }, [id]);

  useEffect(() => {
    if (messagesEndRef.current)
      try {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      } catch {}
  }, [conversation, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (
      activeField &&
      activeField.type === "textarea" &&
      activeField.aiEnabled
    ) {
      setIsAiChatMode(true);
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setConversation((prev) => [
          ...prev,
          { role: "system", content: activeField.label, timestamp: new Date() },
        ]);
        setAiChatStartIndex(conversation.length);
      }, 1000);
    } else {
      setIsAiChatMode(false);
      setAiChatStartIndex(null);
    }
    if (inputRef.current) inputRef.current.focus();
  }, [activeField]);

  async function loadForm() {
    if (!id) return null;
    setIsLoading(true);
    try {
      const response = await apiRequest("GET", `/api/public/forms/${id}`);
      const formData = await response.json();
      setForm(formData);

      setTimeout(() => {
        setConversation([
          {
            role: "system",
            content: `Hi! Welcome to ${formData.title}. ${formData.description}. Let's get started!`,
            timestamp: new Date(),
          },
        ]);

        setTimeout(() => {
          const nextField = getNextField({}, formData.fields);
          setActiveField(nextField);
        }, 1000);
      }, 500);
    } catch (error) {
      console.error("Form not found");
    } finally {
      setIsLoading(false);
    }
  }

  function getNextField(currentAnswers, fields) {
    for (const field of fields) {
      if (!Object.prototype.hasOwnProperty.call(currentAnswers, field.id)) {
        const condition = field.conditionalLogic;
        if (
          condition &&
          condition.fieldId &&
          Object.prototype.hasOwnProperty.call(condition, "value")
        ) {
          if (currentAnswers[condition.fieldId] === condition.value)
            return field;
        } else {
          return field;
        }
      }
    }
    return null;
  }

  async function submitForm(answers, aiConvo = []) {
    setIsSubmitting(true);
    setIsTyping(true);

    try {
      const timeTaken = Math.floor((Date.now() - startTime) / 1000);
      const submission = await apiRequest(
        "POST",
        `/api/public/forms/${form.id}/submit`,
        {
          data: answers,
          timeTaken,
        }
      );
      const response = await submission.json();

      const payloads = aiConvo && aiConvo.length ? aiConvo : aiConversation;
      if (payloads && payloads.length) {
        await Promise.all(
          payloads.map((conv) =>
            apiRequest("POST", "/api/ai/saveAIConversation", {
              submissionId: response.submissionId,
              fieldId: conv.fieldId,
              messages: conv.messages.map((m) => ({
                role: m.role,
                content: m.content,
                timestamp: m.timestamp,
              })),
            })
          )
        );
      }

      setTimeout(() => {
        setIsTyping(false);
        setIsSubmitted(true);
        setConversation((prev) => [
          ...prev,
          {
            role: "system",
            content:
              "Perfect! Thank you for taking the time to complete this form. Your responses have been submitted successfully! 🎉",
            timestamp: new Date(),
          },
        ]);
      }, 1500);
    } catch (error) {
      setIsTyping(false);
      showError("Could not submit the form.");
    } finally {
      setIsSubmitting(false);
      if (inputRef.current) inputRef.current.focus();
    }
  }

  function handleFieldSubmit(field, value) {
    const {
      valid,
      value: validatedValue,
      message,
    } = validateField(field, value);
    if (!valid) {
      showError(message);
      return;
    }

    // add user response bubble
    const displayValue =
      field.type === "matrix"
        ? Object.entries(validatedValue)
            .map(([rowIndex, colValue]) => {
              const rowLabel = (field.matrixRows || ["Row 1", "Row 2", "Row 3"]) [Number(rowIndex)] || `Row ${Number(rowIndex) + 1}`;
              return `${rowLabel}: ${colValue}`;
            })
            .join("\n")
        : String(validatedValue);

    setConversation((prev) => [
      ...prev,
      { role: "system", content: field.label, timestamp: new Date() },
      { role: "user", content: displayValue, timestamp: new Date() },
    ]);

    const newAnswers = { ...answeredFields, [field.id]: validatedValue };
    setAnsweredFields(newAnswers);

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const nextField = getNextField(newAnswers, form.fields);
      setActiveField(nextField);
      if (!nextField) submitForm(newAnswers);
    }, 800);
  }

  async function handleUserInputChange() {
    if (!inputValue.trim() || !activeField) return;

    const currentInput = inputValue;
    setInputValue("");

    if (isAiChatMode && aiChatStartIndex !== null) {
      setConversation((prev) => [
        ...prev,
        { role: "user", content: currentInput, timestamp: new Date() },
      ]);
      setIsSubmitting(true);

      try {
        const response = await apiRequest("POST", "/api/ai/chat", {
          message: currentInput,
          thread: conversation.slice(aiChatStartIndex).map((msg) => ({
            role: msg.role === "system" ? "assistant" : "user",
            content: msg.content,
          })),
        });
        const result = (await response.json()).response; // { content, conversation_finished }

        setConversation((prev) => [
          ...prev,
          { role: "system", content: result.content, timestamp: new Date() },
        ]);

        if (result.conversation_finished) {
          // Summarize the AI chat and store transcripts
          const chatToSummarize = conversation
            .slice(aiChatStartIndex)
            .concat(
              { role: "user", content: currentInput, timestamp: new Date() },
              { role: "system", content: result.content, timestamp: new Date() }
            )
            .map(
              (msg) =>
                `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`
            )
            .join("\n");

          const summaryRes = await apiRequest("POST", "/api/ai/summarize", {
            conversation: chatToSummarize,
          });
          const summary =
            (await summaryRes.json()).response || "User provided feedback.";

          let aiConvo = [];
          setAiConversation((prev) => {
            aiConvo = [
              ...prev,
              {
                submissionId: form.id,
                fieldId: activeField.id,
                messages: conversation
                  .slice(aiChatStartIndex)
                  .concat(
                    {
                      role: "user",
                      content: currentInput,
                      timestamp: new Date(),
                    },
                    {
                      role: "system",
                      content: result.content,
                      timestamp: new Date(),
                    }
                  )
                  .map((msg) => ({
                    role: msg.role === "system" ? "assistant" : "user",
                    content: msg.content,
                    timestamp:
                      msg.timestamp instanceof Date
                        ? msg.timestamp.toISOString()
                        : new Date().toISOString(),
                  })),
              },
            ];
            return aiConvo;
          });

          const newAnswers = { ...answeredFields, [activeField.id]: summary };
          setAnsweredFields(newAnswers);
          const nextField = getNextField(newAnswers, form.fields);
          setActiveField(nextField);

          if (!nextField) submitForm(newAnswers, aiConvo);
        }
      } catch (error) {
        setIsTyping(false);
        setIsSubmitting(false);
        showError("The assistant is unavailable.");
        setConversation((prev) => prev.slice(0, aiChatStartIndex));
        setIsAiChatMode(false);
      } finally {
        setIsSubmitting(false);
        setTimeout(() => {
          if (inputRef.current) inputRef.current.focus();
        }, 0);
      }
    } else {
      // Simple text answer flow
      handleFieldSubmit(activeField, currentInput);
    }
  }

  if (isLoading) {
    return null;
  }

  if (!isLoading && !form) {
    console.error("Chatbot not found!");
    return null;
  }

  return (
    <>
      <style>{`
        @keyframes typingBounce {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          30% {
            transform: translateY(-12px);
            opacity: 1;
          }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        .message-enter {
          animation: slideInUp 0.5s ease-out;
        }
        
        .chat-window::-webkit-scrollbar {
          width: 6px;
        }
        
        .chat-window::-webkit-scrollbar-track {
          background: rgba(241, 245, 249, 0.5);
          border-radius: 3px;
        }
        
        .chat-window::-webkit-scrollbar-thumb {
          background: rgba(203, 213, 225, 0.8);
          border-radius: 3px;
        }
        
        .chat-window::-webkit-scrollbar-thumb:hover {
          background: rgba(148, 163, 184, 0.9);
        }

        /* Background decoration */
        .bg-decoration {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(255,255,255,0.05) 0%, transparent 50%);
          pointer-events: none;
        }
      `}</style>

      {/* Chat Window */}
      <div
        style={{
          position: "fixed",
          bottom: "96px",
          right: "20px",
          width: "420px",
          height: "600px",
          backgroundColor: "rgba(255,255,255,0.95)",
          border: "1px solid rgba(255,255,255,0.3)",
          borderRadius: "24px",
          boxShadow:
            "0 32px 64px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1)",
          transition: "all 400ms cubic-bezier(0.4, 0, 0.2, 1)",
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          opacity: isOpen ? 1 : 0,
          transform: isOpen
            ? "scale(1) translateY(0)"
            : "scale(0.9) translateY(20px)",
          pointerEvents: isOpen ? "auto" : "none",
          fontFamily: "system-ui, -apple-system, sans-serif",
          backdropFilter: "blur(20px)",
          overflow: "hidden",
        }}
      >
        {/* Background decoration */}
        <div className="bg-decoration"></div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "24px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "#ffffff",
            borderTopLeftRadius: "24px",
            borderTopRightRadius: "24px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage:
                "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15) 0%, transparent 50%)",
              pointerEvents: "none",
            }}
          ></div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
              }}
            >
              <img
                src="https://tse1.mm.bing.net/th/id/OIP.62xhYrRo3ea-St_vraobugHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
                alt="Gateway Logo"
                style={{
                  width: "46px",
                  height: "46px",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                }}
              />
            </div>
            <div>
              <h3
                style={{
                  margin: 0,
                  fontWeight: "700",
                  fontSize: "20px",
                  textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                {form.title || "Gateway AI"}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: "13px",
                  opacity: 0.9,
                  fontWeight: "500",
                }}
              >
                {form.description || "AI Assistant • Online • Ready to help"}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              border: "none",
              borderRadius: "10px",
              padding: "10px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 200ms ease",
              backdropFilter: "blur(10px)",
              position: "relative",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                "rgba(255, 255, 255, 0.3)";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor =
                "rgba(255, 255, 255, 0.2)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div
          className="chat-window"
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "24px",
            background:
              "linear-gradient(to bottom, rgba(248, 250, 252, 0.8) 0%, rgba(241, 245, 249, 0.8) 100%)",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {conversation.map((msg, index) => (
              <div
                key={index}
                className="message-enter"
                style={{
                  ...styles.rowBase,
                  ...(msg.role === "user" ? styles.rowRight : styles.rowLeft),
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {msg.role === "system" && (
                  <div style={styles.avatarBot}>
                    <BotIcon style={{ width: 20, height: 20 }} />
                  </div>
                )}

                <div
                  style={{
                    ...styles.bubble,
                    ...(msg.role === "user"
                      ? styles.bubbleUser
                      : styles.bubbleBot),
                  }}
                >
                  <p
                    style={{
                      fontSize: 15,
                      lineHeight: 1.6,
                      whiteSpace: "pre-wrap",
                      margin: 0,
                      fontWeight: 500,
                    }}
                  >
                    {msg.content}
                  </p>
                </div>

                {msg.role === "user" && (
                  <div style={styles.avatarUser}>
                    <UserIcon style={{ width: 20, height: 20 }} />
                  </div>
                )}
              </div>
            ))}

            {activeField && !isAiChatMode && !isTyping && (
              <div
                className="message-enter"
                style={{ ...styles.rowBase, ...styles.rowLeft }}
              >
                <div style={styles.avatarBot}>
                  <BotIcon style={{ width: 20, height: 20 }} />
                </div>
                <div style={styles.card}>
                  <p
                    style={{
                      fontWeight: 700,
                      margin: "0 0 16px",
                      color: "#1a202c",
                      fontSize: "16px",
                    }}
                  >
                    {activeField.label}
                  </p>
                  {!textInputTypes.includes(activeField.type) ? (
                    <FieldRenderer
                      field={activeField}
                      onSubmit={(value) =>
                        handleFieldSubmit(activeField, value)
                      }
                    />
                  ) : (
                    <p style={styles.subtle}>
                      {activeField.placeholder ||
                        "Please provide your answer below."}
                    </p>
                  )}
                </div>
              </div>
            )}

            {isSubmitted && (
              <div
                className="message-enter"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div style={styles.successBox}>
                  <CheckCircleIcon
                    style={{
                      width: 56,
                      height: 56,
                      color: "white",
                      margin: "0 auto 16px",
                      filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))",
                    }}
                  />
                  <h3
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      color: "white",
                      marginBottom: 12,
                      textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                    }}
                  >
                    Submission Complete!
                  </h3>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.9)",
                      fontSize: "15px",
                      fontWeight: 500,
                      margin: 0,
                    }}
                  >
                    Thank you for your time. Your responses have been recorded.
                  </p>
                </div>
              </div>
            )}

            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {activeField && !isSubmitted && textInputTypes.includes(activeField.type) && (
          <div
            style={{
              padding: "24px 24px 12px 24px",
              borderTop: "1px solid rgba(255,255,255,0.3)",
              backgroundColor: "rgba(255,255,255,0.95)",
              borderBottomLeftRadius: "24px",
              borderBottomRightRadius: "24px",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Input area */}
            <div
              style={{
                display: "flex",
                gap: "16px",
                alignItems: "flex-end",
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleUserInputChange();
                  }
                }}
                placeholder={
                  isAiChatMode
                    ? "Continue the conversation..."
                    : activeField.placeholder || "Type your answer..."
                }
                disabled={
                  isSubmitting || !textInputTypes.includes(activeField.type)
                }
                autoFocus
                style={{
                  flex: 1,
                  padding: "16px 20px",
                  fontSize: "15px",
                  backgroundColor: "rgba(248, 250, 252, 0.8)",
                  border: "2px solid rgba(226, 232, 240, 0.5)",
                  borderRadius: "16px",
                  outline: "none",
                  transition: "all 300ms ease",
                  fontFamily: "inherit",
                  fontWeight: 500,
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#667eea";
                  e.target.style.backgroundColor = "rgba(255,255,255,0.95)";
                  e.target.style.boxShadow =
                    "0 0 0 4px rgba(102, 126, 234, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(226, 232, 240, 0.5)";
                  e.target.style.backgroundColor = "rgba(248, 250, 252, 0.8)";
                  e.target.style.boxShadow = "none";
                }}
              />
              <button
                onClick={handleUserInputChange}
                disabled={
                  isSubmitting ||
                  !textInputTypes.includes(activeField.type) ||
                  !inputValue.trim() ||
                  isTyping
                }
                style={{
                  padding: "16px 24px",
                  background:
                    inputValue.trim() && !isTyping
                      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                      : "rgba(226, 232, 240, 0.8)",
                  color: inputValue.trim() && !isTyping ? "#ffffff" : "#94a3b8",
                  fontSize: "15px",
                  fontWeight: "600",
                  borderRadius: "16px",
                  border: "none",
                  cursor:
                    inputValue.trim() && !isTyping ? "pointer" : "not-allowed",
                  transition: "all 300ms ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  minWidth: "80px",
                  justifyContent: "center",
                  boxShadow:
                    inputValue.trim() && !isTyping
                      ? "0 8px 25px rgba(102, 126, 234, 0.3)"
                      : "none",
                }}
                onMouseEnter={(e) => {
                  if (inputValue.trim() && !isTyping) {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 12px 35px rgba(102, 126, 234, 0.4)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    inputValue.trim() && !isTyping
                      ? "0 8px 25px rgba(102, 126, 234, 0.3)"
                      : "none";
                }}
              >
                {isSubmitting || isTyping ? (
                  <div
                    style={{
                      width: "16px",
                      height: "16px",
                      border: "2px solid rgba(255,255,255,0.3)",
                      borderTop: "2px solid #ffffff",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                    }}
                  />
                ) : (
                  <>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                    </svg>
                  </>
                )}
              </button>
            </div>

            <div
              style={{
                height: "4px",
                display: "flex",
                alignItems: "center",
                marginTop: "8px",
              }}
            >
              {errorMessage && (
                <div
                  style={{
                    color: "#dc2626",
                    fontSize: "14px",
                    fontWeight: "500",
                    padding: "4px 12px",
                    borderRadius: "8px",
                    animation: "fadeIn 0.2s ease-in",
                  }}
                >
                  {errorMessage}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "70px",
          height: "70px",
          // background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "#ffffff",
          borderRadius: "50%",
          boxShadow:
            "0 12px 35px rgba(102, 126, 234, 0.4), 0 6px 16px rgba(0, 0, 0, 0.15)",
          transition: "all 400ms cubic-bezier(0.4, 0, 0.2, 1)",
          zIndex: 50,
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          animation: isOpen ? "none" : "pulse 3s infinite",
          overflow: "hidden",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.boxShadow =
            "0 16px 45px rgba(102, 126, 234, 0.5), 0 8px 20px rgba(0, 0, 0, 0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow =
            "0 12px 35px rgba(102, 126, 234, 0.4), 0 6px 16px rgba(0, 0, 0, 0.15)";
        }}
      >
        <img
          src="https://tse1.mm.bing.net/th/id/OIP.62xhYrRo3ea-St_vraobugHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
          alt="Gateway Logo"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "50%", // makes square logo circular
            transition: "transform 300ms ease",
            transform: isOpen ? "rotate(360deg)" : "rotate(0deg)",
          }}
        />
      </button>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}
