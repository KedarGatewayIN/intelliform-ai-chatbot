import React, { useState, useEffect, useRef } from "react";
import { Button } from "./components/button";
import { Input } from "./components/input";
// import { useToast } from "./hooks-toast";
import { ScrollArea } from "./components/scroll-area";
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
  SendIcon,
  BotIcon,
  UserIcon,
  CheckCircleIcon,
  LoaderIcon,
} from "lucide-react";
import { format } from "date-fns";
import { apiRequest } from "./lib/utils";

// ---- Inline style helpers ----
const styles = {
  page: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    background: "linear-gradient(135deg,#eff6ff,#ffffff 40%,#eef2ff)",
  },
  header: {
    background: "rgba(255,255,255,0.8)",
    backdropFilter: "blur(6px)",
    borderBottom: "1px solid #e5e7eb",
    padding: "16px 24px",
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
  },
  headerInner: { maxWidth: 1024, margin: "0 auto" },
  logo: { height: 32, width: "auto", display: "block" },
  h1: { fontSize: 20, fontWeight: 700, color: "#111827", margin: "8px 0 0" },
  pDesc: { marginTop: 4, color: "#4b5563" },

  shell: { flex: 1, overflow: "hidden" },
  shellInner: {
    maxWidth: 1024,
    margin: "0 auto",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  scrollPad: { padding: 24, height: "100%" },

  rowBase: { display: "flex", alignItems: "flex-end", gap: 12 },
  rowLeft: { justifyContent: "flex-start" },
  rowRight: { justifyContent: "flex-end" },

  avatarBot: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    background: "#2563eb",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  avatarUser: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    background: "#4b5563",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  bubble: {
    maxWidth: 560,
    padding: "10px 14px",
    borderRadius: 16,
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
  },
  bubbleBot: {
    background: "#ffffff",
    color: "#111827",
    border: "1px solid #e5e7eb",
    borderBottomLeftRadius: 6,
  },
  bubbleUser: {
    background: "#2563eb",
    color: "white",
    borderBottomRightRadius: 6,
  },

  card: {
    background: "#ffffff",
    borderRadius: 16,
    padding: 24,
    border: "1px solid #e5e7eb",
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
    maxWidth: 640,
  },

  inputBar: {
    background: "rgba(255,255,255,0.8)",
    backdropFilter: "blur(6px)",
    borderTop: "1px solid #e5e7eb",
    padding: "12px 16px",
  },
  inputInner: { display: "flex", alignItems: "center", gap: 12 },
  input: {
    fontSize: 16,
    border: "2px solid #e5e7eb",
    outline: "none",
    paddingRight: 48,
    height: 48,
    borderRadius: 12,
    width: "100%",
  },
  inputFocus: { borderColor: "#3b82f6" },
  sendBtn: { height: 48, width: 48, borderRadius: 12, background: "#2563eb" },

  typingWrap: {
    display: "flex",
    alignItems: "flex-end",
    gap: 12,
    justifyContent: "flex-start",
  },
  typingBubble: {
    background: "#f3f4f6",
    borderRadius: 16,
    borderBottomLeftRadius: 6,
    padding: "10px 14px",
  },
  dot: {
    width: 8,
    height: 8,
    background: "#9ca3af",
    borderRadius: 9999,
    display: "inline-block",
    marginRight: 4,
    animation: "bounce 1s infinite ease-in-out",
  },

  loadingPage: {
    display: "flex",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg,#eff6ff,#e0e7ff)",
  },
  center: { textAlign: "center" },
  successBox: {
    background: "#ecfdf5",
    border: "1px solid #a7f3d0",
    borderRadius: 16,
    padding: 24,
    textAlign: "center",
    maxWidth: 480,
  },

  fieldSpace: { marginTop: 12 },
  sectionSpace: { display: "grid", gap: 12 },
  subtle: { color: "#6b7280", fontSize: 14 },

  dashedDrop: {
    border: "2px dashed #d1d5db",
    borderRadius: 12,
    padding: 24,
    textAlign: "center",
  },
  blueText: { color: "#2563eb" },
  errorText: { color: "#ef4444", fontSize: 13, marginTop: 6 },
};

// ---- Minimal keyframes for the three typing dots (works when you add this CSS globally) ----
// If you don't have a global stylesheet, you can inject this once:
if (
  typeof document !== "undefined" &&
  !document.getElementById("cf-bounce-style")
) {
  const el = document.createElement("style");
  el.id = "cf-bounce-style";
  el.innerHTML = `
  @keyframes bounce {0%,80%,100%{transform:scale(0);}40%{transform:scale(1.0);}}
  `;
  document.head.appendChild(el);
}

function validateField(field, response) {
  let value = response;

  if (
    field.required &&
    (value == null ||
      value === "" ||
      (Array.isArray(value) && value.length === 0))
  ) {
    return { valid: false, message: "This field is required." };
  }

  if (field.validation) {
    for (const rule of field.validation) {
      switch (rule.type) {
        case "min":
          if (typeof value === "string" && value.length < rule.value)
            return { valid: false, message: rule.message };
          if (typeof value === "number" && value < rule.value)
            return { valid: false, message: rule.message };
          break;
        case "max":
          if (typeof value === "string" && value.length > rule.value)
            return { valid: false, message: rule.message };
          if (typeof value === "number" && value > rule.value)
            return { valid: false, message: rule.message };
          break;
        case "pattern":
          if (
            typeof value === "string" &&
            !new RegExp(rule.value).test(value)
          ) {
            return { valid: false, message: rule.message };
          }
          break;
        default:
          break;
      }
    }
  }

  return { valid: true, value };
}

function FieldRenderer({ field, onSubmit }) {
  const [localValue, setLocalValue] = useState(
    field.type === "checkbox" ? [] : ""
  );
  const [touched, setTouched] = useState(false);

  const v = validateField(field, localValue);
  const validationError = touched && !v.valid ? v.message : null;

  const handleChange = (value) => {
    setLocalValue(value);
    setTouched(true);
  };

  const handleSubmit = () => {
    if (validateField(field, localValue).valid) onSubmit(localValue);
  };

  // Shared button style via Button component
  const buttonStyle = { width: "100%", background: "#2563eb" };

  // MATRIX helpers (used in a case)
  const renderMatrix = () => {
    const matrixRows = field.matrixRows || ["Row 1", "Row 2", "Row 3"];
    const matrixColumns = field.matrixColumns || ["1", "2", "3", "4", "5"];
    const matrixValue = localValue || {};

    return (
      <div style={{ display: "grid", gap: 12 }}>
        <div
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 12,
            overflowX: "auto",
            background: "#fff",
          }}
        >
          <table style={{ width: "100%", fontSize: 14 }}>
            <thead>
              <tr>
                <th
                  style={{
                    textAlign: "left",
                    padding: 16,
                    borderBottom: "1px solid #e5e7eb",
                    background: "#f9fafb",
                  }}
                ></th>
                {matrixColumns.map((col, index) => (
                  <th
                    key={index}
                    style={{
                      textAlign: "center",
                      padding: 16,
                      borderBottom: "1px solid #e5e7eb",
                      color: "#374151",
                      minWidth: 72,
                      background: "#f9fafb",
                    }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matrixRows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  style={{ borderBottom: "1px solid #f3f4f6" }}
                >
                  <td
                    style={{
                      padding: 16,
                      fontWeight: 600,
                      color: "#374151",
                      background: "#f9fafb",
                      minWidth: 192,
                      borderRight: "1px solid #e5e7eb",
                    }}
                  >
                    {row}
                  </td>
                  <RadioGroup
                    value={matrixValue[`${rowIndex}`] || ""}
                    onValueChange={(val) => {
                      const newValue = {
                        ...(matrixValue || {}),
                        [`${rowIndex}`]: val,
                      };
                      handleChange(newValue);
                    }}
                    className="contents"
                  >
                    {matrixColumns.map((_, colIndex) => (
                      <td
                        key={colIndex}
                        style={{ textAlign: "center", padding: 16 }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <RadioGroupItem
                            value={`${colIndex + 1}`}
                            id={`${field.id}-${rowIndex}-${colIndex}`}
                            className="w-5 h-5 cursor-pointer"
                          />
                        </div>
                      </td>
                    ))}
                  </RadioGroup>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {validationError && <p style={styles.errorText}>{validationError}</p>}

        <div style={{ width: 80, marginLeft: "auto" }}>
          <Button
            onClick={handleSubmit}
            style={buttonStyle}
            disabled={!!validationError}
          >
            Submit
          </Button>
        </div>
      </div>
    );
  };

  // Render by field.type
  switch (field.type) {
    case "password":
    case "url":
    case "text":
    case "email":
    case "number":
      return (
        <div style={styles.sectionSpace}>
          <Input
            type={field.type}
            value={localValue}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={
              field.placeholder ||
              `Enter ${String(field.label || "").toLowerCase()}`
            }
            required={!!field.required}
            autoFocus
            style={{ ...styles.input, height: 44 }}
          />
          {validationError && <p style={styles.errorText}>{validationError}</p>}
          <Button
            onClick={handleSubmit}
            style={buttonStyle}
            disabled={!!validationError}
          >
            Continue
          </Button>
        </div>
      );

    case "textarea":
      return (
        <div style={styles.sectionSpace}>
          <textarea
            value={localValue}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={
              field.placeholder ||
              `Enter ${String(field.label || "").toLowerCase()}`
            }
            rows={5}
            style={{
              ...styles.input,
              height: "auto",
              padding: 12,
              resize: "vertical",
            }}
          />
          {validationError && <p style={styles.errorText}>{validationError}</p>}
          <Button
            onClick={handleSubmit}
            style={buttonStyle}
            disabled={!!validationError}
          >
            Continue
          </Button>
        </div>
      );

    case "radio":
      return (
        <RadioGroup
          value={localValue}
          onValueChange={(val) => onSubmit(val)}
          style={{ display: "grid", gap: 12 }}
        >
          {(field.options || []).map((option) => (
            <Label
              key={option}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: 16,
                border: "2px solid #e5e7eb",
                borderRadius: 12,
                cursor: "pointer",
              }}
            >
              <RadioGroupItem value={option} id={`${field.id}-${option}`} />
              <span style={{ fontSize: 16 }}>{option}</span>
            </Label>
          ))}
        </RadioGroup>
      );

    case "checkbox":
      return (
        <div style={{ display: "grid", gap: 16 }}>
          <div style={{ display: "grid", gap: 12 }}>
            {(field.options || []).map((option) => (
              <Label
                key={option}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: 16,
                  border: "2px solid #e5e7eb",
                  borderRadius: 12,
                  cursor: "pointer",
                }}
              >
                <Checkbox
                  id={`${field.id}-${option}`}
                  checked={(localValue || []).includes(option)}
                  onCheckedChange={(checked) => {
                    const arr = Array.isArray(localValue) ? localValue : [];
                    const newValue = checked
                      ? [...arr, option]
                      : arr.filter((v) => v !== option);
                    setLocalValue(newValue);
                  }}
                />
                <span style={{ fontSize: 16 }}>{option}</span>
              </Label>
            ))}
          </div>
          <Button onClick={() => onSubmit(localValue)} style={buttonStyle}>
            Continue
          </Button>
        </div>
      );

    case "select":
      return (
        <Select onValueChange={(val) => onSubmit(val)}>
          <SelectTrigger
            style={{ fontSize: 16, border: "2px solid #e5e7eb", height: 48 }}
          >
            <SelectValue placeholder="Choose an option" />
          </SelectTrigger>
          <SelectContent>
            {(field.options || []).map((option) => (
              <SelectItem
                key={option}
                value={option}
                className="text-base py-3"
              >
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

    case "date":
      return (
        <div style={styles.sectionSpace}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                style={{
                  width: "100%",
                  justifyContent: "flex-start",
                  textAlign: "left",
                  fontSize: 16,
                  height: 48,
                  border:
                    "2px solid " + (validationError ? "#f87171" : "#e5e7eb"),
                }}
                onClick={() => setTouched(true)}
              >
                <CalendarIcon
                  style={{ marginRight: 12, width: 20, height: 20 }}
                />
                {localValue
                  ? format(new Date(localValue), "PPP")
                  : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={localValue ? new Date(localValue) : undefined}
                onSelect={(date) => {
                  const val = date?.toISOString();
                  handleChange(val);
                  onSubmit(val);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {validationError && <p style={styles.errorText}>{validationError}</p>}
        </div>
      );

    case "rating":
      return (
        <div style={styles.sectionSpace}>
          <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                className="cf-star"
                style={{
                  width: 40,
                  height: 40,
                  cursor: "pointer",
                  color: star <= (localValue || 0) ? "#f59e0b" : "#d1d5db",
                }}
                onClick={() => {
                  handleChange(star);
                  onSubmit(star);
                }}
              />
            ))}
          </div>
          {localValue > 0 && (
            <p style={{ textAlign: "center", fontSize: 14, color: "#6b7280" }}>
              You rated {localValue} out of 5 stars
            </p>
          )}
        </div>
      );

    case "slider":
      return (
        <div style={styles.sectionSpace}>
          <Slider
            value={[localValue || 0]}
            onValueChange={(val) => handleChange(val[0])}
            min={0}
            max={100}
            step={1}
          />
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: 24, fontWeight: 700, color: "#2563eb" }}>
              {localValue || 0}
            </span>
            <span style={{ color: "#6b7280", marginLeft: 4 }}>/ 100</span>
          </div>
          <Button
            onClick={handleSubmit}
            style={buttonStyle}
            disabled={!!validationError}
          >
            Continue
          </Button>
        </div>
      );

    case "file":
      return (
        <div style={styles.sectionSpace}>
          <div style={{ ...styles.dashedDrop }}>
            <UploadIcon
              style={{
                width: 48,
                height: 48,
                color: "#9ca3af",
                margin: "0 auto 12px",
              }}
            />
            <p
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: "#111827",
                marginBottom: 8,
              }}
            >
              Drop your file here or click to browse
            </p>
            <p style={{ color: "#6b7280" }}>SVG, PNG, JPG or GIF (max. 10MB)</p>
            <input
              type="file"
              id="file-input"
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files && e.target.files[0];
                if (file) handleChange(file.name);
              }}
            />
            <label
              htmlFor="file-input"
              style={{
                cursor: "pointer",
                display: "inline-block",
                marginTop: 16,
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  padding: "10px 16px",
                  background: "#2563eb",
                  color: "#fff",
                  borderRadius: 8,
                }}
              >
                Select File
              </span>
            </label>
          </div>
          {validationError && <p style={styles.errorText}>{validationError}</p>}
          <Button
            onClick={handleSubmit}
            style={buttonStyle}
            disabled={!!validationError}
          >
            Continue
          </Button>
        </div>
      );

    case "matrix":
      return renderMatrix();

    default:
      return null;
  }
}

function TypingIndicator() {
  return (
    <div style={styles.typingWrap}>
      <div style={styles.avatarBot}>
        <BotIcon style={{ width: 16, height: 16 }} />
      </div>
      <div style={styles.typingBubble}>
        <span style={{ ...styles.dot, animationDelay: "0s" }} />
        <span style={{ ...styles.dot, animationDelay: "0.1s" }} />
        <span style={{ ...styles.dot, animationDelay: "0.2s" }} />
      </div>
    </div>
  );
}

const id = "7a548feb-d910-449b-a7f0-c2db670b9548"

export default function App() {
  const [form, setForm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [conversation, setConversation] = useState([]); // { role: 'system'|'user', content, timestamp: Date }
  const [answeredFields, setAnsweredFields] = useState({});
  const [activeField, setActiveField] = useState(null);

  const [userInput, setUserInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showTyping, setShowTyping] = useState(false);

  // const { toast } = useToast();
  const scrollAreaRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [startTime] = useState(Date.now());

  const [isAiChatMode, setIsAiChatMode] = useState(false);
  const [aiChatStartIndex, setAiChatStartIndex] = useState(null);
  const [aiConversation, setAiConversation] = useState([]);

  const inputRef = useRef(null);

  const textInputTypes = [
    "text",
    "textarea",
    "email",
    "number",
    "password",
    "url",
  ];

  useEffect(() => {
    loadForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (messagesEndRef.current) {
      try {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      } catch {}
    }
  }, [conversation, showTyping]);

  useEffect(() => {
    if (
      activeField &&
      activeField.type === "textarea" &&
      activeField.aiEnabled
    ) {
      setIsAiChatMode(true);
      setShowTyping(true);
      setTimeout(() => {
        setShowTyping(false);
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
  }, [activeField]); // eslint-disable-line

  async function loadForm() {
    setIsLoading(true);
    try {
      const response = await apiRequest("GET", `/api/public/forms/${id}`);
      const formData = await response.json();
      setForm(formData);

      // welcome
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
      // toast({
      //   title: "Error",
      //   description: "Form not found",
      //   variant: "destructive",
      // });
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

  async function submitForm(finalAnswers, aiConvo) {
    setIsSubmitting(true);
    setShowTyping(true);
    try {
      const timeTaken = Math.floor((Date.now() - startTime) / 1000);
      const submission = await apiRequest(
        "POST",
        `/api/public/forms/${form.id}/submit`,
        {
          data: finalAnswers,
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
        setShowTyping(false);
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
      setShowTyping(false);
      // toast({
      //   title: "Submission Error",
      //   description: "Could not submit the form.",
      //   variant: "destructive",
      // });
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
      // toast({
      //   title: "Invalid Input",
      //   description: message,
      //   variant: "destructive",
      // });
      return;
    }

    // add user response bubble
    setConversation((prev) => [
      ...prev,
      { role: "system", content: field.label, timestamp: new Date() },
      { role: "user", content: String(validatedValue), timestamp: new Date() },
    ]);

    const newAnswers = { ...answeredFields, [field.id]: validatedValue };
    setAnsweredFields(newAnswers);

    setShowTyping(true);
    setTimeout(() => {
      setShowTyping(false);
      const nextField = getNextField(newAnswers, form.fields);
      setActiveField(nextField);
      if (!nextField) submitForm(newAnswers);
    }, 800);
  }

  async function handleUserInputChange() {
    if (!userInput.trim() || !activeField) return;

    const currentInput = userInput;
    setUserInput("");

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
        setShowTyping(false);
        setIsSubmitting(false);
        // toast({
        //   title: "AI Error",
        //   description: "The assistant is unavailable.",
        //   variant: "destructive",
        // });
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

  // ---- render ----
  if (isLoading) {
    return (
      <div style={styles.loadingPage}>
        <div style={styles.center}>
          <LoaderIcon
            style={{
              width: 32,
              height: 32,
              margin: "0 auto",
              color: "#2563eb",
            }}
            className="animate-spin"
          />
          <p style={{ color: "#4b5563", marginTop: 8 }}>Loading your form.</p>
        </div>
      </div>
    );
  }

  if (!form) {
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg,#fee2e2,#ffe4e6)",
        }}
      >
        <div style={styles.center}>
          <div
            style={{
              width: 64,
              height: 64,
              background: "#fee2e2",
              borderRadius: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
            }}
          >
            <span style={{ color: "#dc2626", fontSize: 24 }}>!</span>
          </div>
          <h2
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: "#111827",
              marginTop: 12,
            }}
          >
            Form not found
          </h2>
          <p style={{ color: "#4b5563", marginTop: 6 }}>
            The form you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <img
            src="https://thegatewaycorp.com/wp-content/themes/gatewaycorp/images/logo.svg"
            alt="Company Logo"
            style={styles.logo}
          />
          <h1 style={styles.h1}>{form.title}</h1>
          <p style={styles.pDesc}>{form.description}</p>
        </div>
      </header>

      {/* Chat Area */}
      <div style={styles.shell}>
        <div style={styles.shellInner}>
          <ScrollArea ref={scrollAreaRef} style={styles.scrollPad}>
            <div style={{ display: "grid", gap: 16 }}>
              {conversation.map((msg, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.rowBase,
                    ...(msg.role === "user" ? styles.rowRight : styles.rowLeft),
                  }}
                >
                  {msg.role === "system" && (
                    <div style={styles.avatarBot}>
                      <BotIcon style={{ width: 16, height: 16 }} />
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
                        fontSize: 14,
                        lineHeight: 1.5,
                        whiteSpace: "pre-wrap",
                        margin: 0,
                      }}
                    >
                      {msg.content}
                    </p>
                  </div>

                  {msg.role === "user" && (
                    <div style={styles.avatarUser}>
                      <UserIcon style={{ width: 16, height: 16 }} />
                    </div>
                  )}
                </div>
              ))}

              {showTyping && <TypingIndicator />}

              {activeField && !isAiChatMode && !showTyping && (
                <div style={{ ...styles.rowBase, ...styles.rowLeft }}>
                  <div style={styles.avatarBot}>
                    <BotIcon style={{ width: 16, height: 16 }} />
                  </div>
                  <div style={styles.card}>
                    <p
                      style={{
                        fontWeight: 600,
                        margin: "0 0 12px",
                        color: "#111827",
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
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div style={styles.successBox}>
                    <CheckCircleIcon
                      style={{
                        width: 48,
                        height: 48,
                        color: "#059669",
                        margin: "0 auto 12px",
                      }}
                    />
                    <h3
                      style={{
                        fontSize: 18,
                        fontWeight: 600,
                        color: "#065f46",
                        marginBottom: 8,
                      }}
                    >
                      Submission Complete!
                    </h3>
                    <p style={{ color: "#065f46" }}>
                      Thank you for your time. Your responses have been
                      recorded.
                    </p>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input Area */}
          {activeField && !isSubmitted && (
            <div style={styles.inputBar}>
              <div style={styles.inputInner}>
                <div style={{ flex: 1, position: "relative" }}>
                  <Input
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleUserInputChange();
                      }
                    }}
                    placeholder={
                      isAiChatMode
                        ? "Continue the conversation."
                        : activeField.placeholder || "Type your answer."
                    }
                    disabled={
                      isSubmitting || !textInputTypes.includes(activeField.type)
                    }
                    autoFocus
                    ref={inputRef}
                    style={styles.input}
                  />
                </div>
                <Button
                  onClick={handleUserInputChange}
                  disabled={
                    isSubmitting ||
                    !textInputTypes.includes(activeField.type) ||
                    !userInput.trim()
                  }
                  style={styles.sendBtn}
                >
                  {isSubmitting ? (
                    <LoaderIcon
                      style={{ width: 16, height: 16 }}
                      className="animate-spin"
                    />
                  ) : (
                    <SendIcon
                      style={{ width: 16, height: 16, color: "white" }}
                    />
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
