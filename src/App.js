import { useState, useRef, useEffect } from "react";
import { Button } from "./components/button";
import { Input } from "./components/input";
// import { useToast } from "./hooks-toast";
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

export default function App() {
  const [conversation, setConversation] = useState([]);
  const [form, setForm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [answeredFields, setAnsweredFields] = useState({});
  const [activeField, setActiveField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  // const { toast } = useToast();
  const scrollAreaRef = useRef(null);
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
      setId("7a548feb-d910-449b-a7f0-c2db670b9548");
    } else {
      const scriptTag = document.getElementById("gateway-chatbot");
      const chatbotId = scriptTag.getAttribute("chatbotId");
      if (chatbotId) {
        setId(chatbotId);
      } else {
        console.error("ChatbotID not found");
        setId("7a548feb-d910-449b-a7f0-c2db670b9548");
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
    setIsTyping(true);
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
        @keyframes typing {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          30% {
            transform: translateY(-10px);
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
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
          animation: slideUp 0.3s ease-out;
        }
        
        .chat-window::-webkit-scrollbar {
          width: 6px;
        }
        
        .chat-window::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }
        
        .chat-window::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        
        .chat-window::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>

      {/* Chat Window */}
      <div
        style={{
          position: "fixed",
          bottom: "80px",
          right: "16px",
          width: "380px",
          height: "500px",
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "16px",
          boxShadow:
            "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)",
          transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          opacity: isOpen ? 1 : 0,
          transform: isOpen
            ? "scale(1) translateY(0)"
            : "scale(0.95) translateY(10px)",
          pointerEvents: isOpen ? "auto" : "none",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "#ffffff",
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
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
                "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)",
              pointerEvents: "none",
            }}
          ></div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                borderRadius: "8px",
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
                  width: "36px",
                  height: "36px",
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
                  fontWeight: "600",
                  fontSize: "18px",
                  textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                }}
              >
                {form.title || "Gateway AI"}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: "12px",
                  opacity: 0.9,
                  fontWeight: "400",
                }}
              >
                {form.description || "Gateway AI • Online • Ready to help"}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              border: "none",
              borderRadius: "8px",
              padding: "8px",
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
              width="18"
              height="18"
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
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px",
            background: "linear-gradient(to bottom, #f8fafc 0%, #f1f5f9 100%)",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
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

            {activeField && !isAiChatMode && !isTyping && (
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
                    Thank you for your time. Your responses have been recorded.
                  </p>
                </div>
              </div>
            )}

            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {activeField && !isSubmitted && (
          <div
            style={{
              padding: "20px",
              borderTop: "1px solid #e2e8f0",
              backgroundColor: "#ffffff",
              borderBottomLeftRadius: "16px",
              borderBottomRightRadius: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "12px",
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
                    ? "Continue the conversation."
                    : activeField.placeholder || "Type your answer."
                }
                disabled={
                  isSubmitting || !textInputTypes.includes(activeField.type)
                }
                autoFocus
                style={{
                  flex: 1,
                  padding: "12px 16px",
                  fontSize: "14px",
                  backgroundColor: "#f8fafc",
                  border: "2px solid #e2e8f0",
                  borderRadius: "12px",
                  outline: "none",
                  transition: "all 200ms ease",
                  fontFamily: "inherit",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#667eea";
                  e.target.style.backgroundColor = "#ffffff";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(102, 126, 234, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e2e8f0";
                  e.target.style.backgroundColor = "#f8fafc";
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
                  padding: "12px 20px",
                  background:
                    inputValue.trim() && !isTyping
                      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                      : "#e2e8f0",
                  color: inputValue.trim() && !isTyping ? "#ffffff" : "#94a3b8",
                  fontSize: "14px",
                  fontWeight: "600",
                  borderRadius: "12px",
                  border: "none",
                  cursor:
                    inputValue.trim() && !isTyping ? "pointer" : "not-allowed",
                  transition: "all 200ms ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  minWidth: "70px",
                  justifyContent: "center",
                }}
                onMouseEnter={(e) => {
                  if (inputValue.trim() && !isTyping) {
                    e.currentTarget.style.transform = "translateY(-1px)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 12px rgba(102, 126, 234, 0.4)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {isSubmitting || isTyping ? (
                  <div
                    style={{
                      width: "16px",
                      height: "16px",
                      border: "2px solid #94a3b8",
                      borderTop: "2px solid transparent",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                    }}
                  ></div>
                ) : (
                  <>
                    <svg
                      width="16"
                      height="16"
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
          </div>
        )}
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: "16px",
          right: "16px",
          width: "60px",
          height: "60px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "#ffffff",
          borderRadius: "50%",
          boxShadow:
            "0 8px 25px rgba(102, 126, 234, 0.4), 0 4px 12px rgba(0, 0, 0, 0.15)",
          transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
          zIndex: 50,
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          animation: isOpen ? "none" : "pulse 2s infinite",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.boxShadow =
            "0 12px 35px rgba(102, 126, 234, 0.5), 0 6px 16px rgba(0, 0, 0, 0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow =
            "0 8px 25px rgba(102, 126, 234, 0.4), 0 4px 12px rgba(0, 0, 0, 0.15)";
        }}
      >
        {/* {!isOpen && (
          <div
            style={{
              position: "absolute",
              top: "8px",
              right: "8px",
              width: "12px",
              height: "12px",
              backgroundColor: "#ef4444",
              borderRadius: "50%",
              border: "2px solid #ffffff",
              animation: "pulse 2s infinite",
            }}
          ></div>
        )} */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 200ms ease",
          }}
        >
          {isOpen ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <path d="M8 9h8M8 13h6" />
            </svg>
          )}
        </div>
      </button>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
