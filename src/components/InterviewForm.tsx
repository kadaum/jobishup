
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { FormData } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

interface InterviewFormProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

const InterviewForm = ({ onSubmit, isLoading }: InterviewFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    jobTitle: "",
    companyName: "",
  });
  const { t, language } = useLanguage();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.jobTitle || !formData.companyName) return;
    onSubmit({...formData, selectedLanguage: language });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="w-full max-w-3xl mx-auto px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="glass-card overflow-hidden border border-white/20 shadow-soft">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit}>
            <motion.div className="space-y-6" variants={containerVariants}>
              <motion.div variants={itemVariants} className="space-y-1">
                <Label htmlFor="jobTitle" className="text-sm font-medium">
                  {t('form.jobTitle')} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  placeholder={t('form.jobTitlePlaceholder')}
                  className="border-interview-light-blue focus:border-interview-blue"
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-1">
                <Label htmlFor="companyName" className="text-sm font-medium">
                  {t('form.companyName')} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder={t('form.companyNamePlaceholder')}
                  className="border-interview-light-blue focus:border-interview-blue"
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <Accordion type="single" collapsible className="w-full border-interview-light-blue">
                  <AccordionItem value="optional-fields" className="border-none">
                    <AccordionTrigger className="py-2.5 px-4 bg-white rounded-md border border-interview-light-blue hover:border-interview-blue hover:bg-interview-light-blue/20 text-sm font-medium hover:no-underline">
                      {language === 'en' ? 'Optional fields' : 
                       language === 'es' ? 'Campos opcionales' : 
                       'Campos opcionais'}
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 mt-4">
                      <div className="space-y-1">
                        <Label htmlFor="jobUrl" className="text-sm font-medium">
                          {t('form.jobUrl')}
                        </Label>
                        <Input
                          id="jobUrl"
                          name="jobUrl"
                          value={formData.jobUrl || ""}
                          onChange={handleChange}
                          placeholder={t('form.jobUrlPlaceholder')}
                          className="border-interview-light-blue focus:border-interview-blue"
                        />
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="candidateLinkedIn" className="text-sm font-medium">
                          {t('form.candidateLinkedIn')}
                        </Label>
                        <Input
                          id="candidateLinkedIn"
                          name="candidateLinkedIn"
                          value={formData.candidateLinkedIn || ""}
                          onChange={handleChange}
                          placeholder={t('form.candidateLinkedInPlaceholder')}
                          className="border-interview-light-blue focus:border-interview-blue"
                        />
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="interviewerLinkedIn" className="text-sm font-medium">
                          {t('form.interviewerLinkedIn')}
                        </Label>
                        <Input
                          id="interviewerLinkedIn"
                          name="interviewerLinkedIn"
                          value={formData.interviewerLinkedIn || ""}
                          onChange={handleChange}
                          placeholder={t('form.interviewerLinkedInPlaceholder')}
                          className="border-interview-light-blue focus:border-interview-blue"
                        />
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="interviewDate" className="text-sm font-medium">
                          {t('form.interviewDate')}
                        </Label>
                        <Input
                          id="interviewDate"
                          name="interviewDate"
                          type="date"
                          value={formData.interviewDate || ""}
                          onChange={handleChange}
                          className="border-interview-light-blue focus:border-interview-blue"
                        />
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="interviewType" className="text-sm font-medium">
                          {t('form.interviewType')}
                        </Label>
                        <Select 
                          onValueChange={(value) => handleSelectChange("interviewType", value)}
                          value={formData.interviewType}
                        >
                          <SelectTrigger className="border-interview-light-blue focus:border-interview-blue">
                            <SelectValue placeholder={
                              language === 'en' ? 'Select interview type' : 
                              language === 'es' ? 'Seleccione tipo de entrevista' : 
                              'Selecione o tipo de entrevista'
                            } />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="technical">
                              {t('form.interviewType.technical')}
                            </SelectItem>
                            <SelectItem value="behavioral">
                              {t('form.interviewType.behavioral')}
                            </SelectItem>
                            <SelectItem value="strategic">
                              {t('form.interviewType.strategic')}
                            </SelectItem>
                            <SelectItem value="cultural">
                              {t('form.interviewType.cultural')}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="jobLevel" className="text-sm font-medium">
                          {t('form.jobLevel')}
                        </Label>
                        <Select 
                          onValueChange={(value) => handleSelectChange("jobLevel", value)}
                          value={formData.jobLevel}
                        >
                          <SelectTrigger className="border-interview-light-blue focus:border-interview-blue">
                            <SelectValue placeholder={
                              language === 'en' ? 'Select job level' : 
                              language === 'es' ? 'Seleccione nivel del puesto' : 
                              'Selecione o nível da vaga'
                            } />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="junior">
                              {t('form.jobLevel.junior')}
                            </SelectItem>
                            <SelectItem value="mid">
                              {t('form.jobLevel.mid')}
                            </SelectItem>
                            <SelectItem value="senior">
                              {t('form.jobLevel.senior')}
                            </SelectItem>
                            <SelectItem value="leadership">
                              {t('form.jobLevel.leadership')}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="personalContext" className="text-sm font-medium">
                          {t('form.personalContext')}
                        </Label>
                        <Textarea
                          id="personalContext"
                          name="personalContext"
                          value={formData.personalContext || ""}
                          onChange={handleChange}
                          placeholder={t('form.personalContextPlaceholder')}
                          className="border-interview-light-blue focus:border-interview-blue resize-none min-h-[100px]"
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="pt-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-interview-blue hover:bg-interview-blue/90 text-white font-medium py-6 button-hover"
                  disabled={isLoading || !formData.jobTitle || !formData.companyName}
                >
                  {isLoading ? t('form.generating') : t('form.generate')}
                </Button>
              </motion.div>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default InterviewForm;
