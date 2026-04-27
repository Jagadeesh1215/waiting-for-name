import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { type ReactNode, createContext, useContext, useState } from "react";
import { useForm } from "react-hook-form";

interface ConsultationModalContextValue {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ConsultationModalContext =
  createContext<ConsultationModalContextValue | null>(null);

const SERVICES = [
  "Social Media Partner",
  "Online Reputation Management (ORM)",
  "Branding Partner",
  "Web Designing",
  "Digital Marketing",
  "Influencer Marketing",
];

interface FormData {
  name: string;
  phone: string;
  service: string;
  message: string;
}

// Floating label field wrapper
function FloatingField({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="floating-label-group relative rounded-lg overflow-hidden">
        {children}
        <label htmlFor={id} className="z-10">
          {label}
          {required && <span className="text-red-400 ml-0.5">*</span>}
        </label>
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-red-400 text-xs mt-1 pl-1"
            data-ocid={`consultation.${id}.field_error`}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputClass =
  "w-full px-4 pt-6 pb-2 rounded-lg border border-brand-border-light dark:border-white/10 bg-brand-bg-light dark:bg-white/5 text-brand-text-primary dark:text-white placeholder:text-transparent focus:outline-none transition-smooth text-sm";

const selectClass =
  "w-full px-4 pt-6 pb-2 rounded-lg border border-brand-border-light dark:border-white/10 bg-brand-bg-light dark:bg-brand-card-dark text-brand-text-primary dark:text-white focus:outline-none transition-smooth text-sm";

export function ConsultationModalProvider({
  children,
}: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ defaultValues: { service: "" } });

  function openModal() {
    setSubmitted(false);
    reset();
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setTimeout(() => {
      setSubmitted(false);
      reset();
    }, 300);
  }

  function onSubmit(_data: FormData) {
    setSubmitted(true);
    setTimeout(() => {
      closeModal();
    }, 3000);
  }

  return (
    <ConsultationModalContext.Provider
      value={{ isOpen, openModal, closeModal }}
    >
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-[#1a1035]/65 backdrop-blur-md"
              onClick={closeModal}
            />

            {/* Modal */}
            <motion.div
              className="relative z-10 w-full max-w-lg bg-white dark:bg-brand-card-dark rounded-2xl shadow-[0_32px_80px_rgba(45,27,105,0.4)] overflow-hidden"
              initial={{ opacity: 0, scale: 0.9, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 24 }}
              transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
              data-ocid="consultation.dialog"
            >
              {/* Header — purple gradient with gold accent line */}
              <div className="relative bg-gradient-to-br from-brand-purple to-brand-purple-2 px-6 py-5 flex items-center justify-between overflow-hidden">
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at 100% 0%, rgba(212,160,23,0.25) 0%, transparent 60%)",
                  }}
                  aria-hidden="true"
                />
                <div className="relative">
                  <h2 className="text-xl font-display font-bold text-white">
                    Book a Consultation
                  </h2>
                  <p className="text-white/65 text-sm mt-0.5">
                    We'll reach out within 24 hours
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeModal}
                  className="relative text-white/70 hover:text-white transition-smooth p-1.5 rounded-lg hover:bg-white/15 hover:scale-110 transition-spring"
                  aria-label="Close modal"
                  data-ocid="consultation.close_button"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Gold divider line */}
              <div className="h-0.5 bg-gradient-to-r from-brand-gold via-brand-gold-light to-transparent" />

              <div className="p-6">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        type: "spring",
                        damping: 14,
                        stiffness: 120,
                      }}
                      className="text-center py-8"
                      data-ocid="consultation.success_state"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: 0.1,
                          type: "spring",
                          damping: 10,
                          stiffness: 120,
                        }}
                        className="w-16 h-16 bg-gradient-to-br from-[#d4a017] to-[#f0c040] rounded-full flex items-center justify-center mx-auto mb-4 shadow-brand-gold-glow"
                      >
                        <span className="text-2xl">✓</span>
                      </motion.div>
                      <h3 className="text-lg font-heading font-semibold text-brand-text-primary dark:text-white mb-2">
                        Request Sent!
                      </h3>
                      <p className="text-brand-text-secondary dark:text-white/60 text-sm">
                        Consultation request sent! We'll reach out within 24
                        hours.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Name */}
                      <FloatingField
                        id="cons-name"
                        label="Full Name"
                        required
                        error={errors.name?.message}
                      >
                        <input
                          id="cons-name"
                          {...register("name", {
                            required: "Name is required",
                            minLength: {
                              value: 3,
                              message: "Name must be at least 3 characters",
                            },
                          })}
                          placeholder="Your full name"
                          className={inputClass}
                          data-ocid="consultation.name_input"
                        />
                      </FloatingField>

                      {/* Phone */}
                      <FloatingField
                        id="cons-phone"
                        label="Phone Number"
                        required
                        error={errors.phone?.message}
                      >
                        <input
                          id="cons-phone"
                          {...register("phone", {
                            required: "Phone number is required",
                            pattern: {
                              value: /^[+]?[\d\s\-()]{7,15}$/,
                              message: "Enter a valid phone number",
                            },
                          })}
                          placeholder="+91 98765 43210"
                          className={inputClass}
                          data-ocid="consultation.phone_input"
                        />
                      </FloatingField>

                      {/* Service */}
                      <FloatingField
                        id="cons-service"
                        label="Service Interested In"
                      >
                        <select
                          id="cons-service"
                          {...register("service")}
                          className={selectClass}
                          data-ocid="consultation.service_select"
                        >
                          <option value="">Select a service…</option>
                          {SERVICES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </FloatingField>

                      {/* Message */}
                      <FloatingField
                        id="cons-message"
                        label="Message (Optional)"
                      >
                        <textarea
                          id="cons-message"
                          {...register("message")}
                          placeholder="Tell us a bit about your goals…"
                          rows={3}
                          className={`${inputClass} !pt-6 resize-none`}
                          data-ocid="consultation.message_textarea"
                        />
                      </FloatingField>

                      <motion.button
                        type="submit"
                        className="w-full cta-primary justify-center"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        data-ocid="consultation.submit_button"
                      >
                        Send Consultation Request →
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ConsultationModalContext.Provider>
  );
}

export function useConsultationModal(): ConsultationModalContextValue {
  const ctx = useContext(ConsultationModalContext);
  if (!ctx) {
    throw new Error(
      "useConsultationModal must be used inside ConsultationModalProvider",
    );
  }
  return ctx;
}
