
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
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
  const [isOptionalOpen, setIsOptionalOpen] = useState(false);
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
    // Add language to form data
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
                  {t('form.company')} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder={t('form.companyPlaceholder')}
                  className="border-interview-light-blue focus:border-interview-blue"
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <Collapsible open={isOptionalOpen} onOpenChange={setIsOptionalOpen}>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="outline"
                      type="button"
                      className="w-full flex justify-between items-center border-interview-light-blue hover:border-interview-blue hover:bg-interview-light-blue/20"
                    >
                      <span className="font-medium">
                        {language === 'en' ? 'Optional fields' : 
                         language === 'es' ? 'Campos opcionales' : 
                         'Campos opcionais'}
                      </span>
                      {isOptionalOpen ? (
                        <ChevronUp className="h-4 w-4 ml-2" />
                      ) : (
                        <ChevronDown className="h-4 w-4 ml-2" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-4 mt-4 overflow-hidden transition-all duration-300">
                    <div className="space-y-1">
                      <Label htmlFor="jobUrl" className="text-sm font-medium">
                        {language === 'en' ? 'Job URL' : 
                         language === 'es' ? 'URL del puesto' : 
                         'URL da vaga'}
                      </Label>
                      <Input
                        id="jobUrl"
                        name="jobUrl"
                        value={formData.jobUrl || ""}
                        onChange={handleChange}
                        placeholder={language === 'en' ? 'https://company.com/job' : 
                                    language === 'es' ? 'https://empresa.com/puesto' :
                                    'https://empresa.com/vaga'}
                        className="border-interview-light-blue focus:border-interview-blue"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="candidateLinkedIn" className="text-sm font-medium">
                        {language === 'en' ? 'Candidate LinkedIn' : 
                         language === 'es' ? 'LinkedIn del candidato' : 
                         'LinkedIn do candidato'}
                      </Label>
                      <Input
                        id="candidateLinkedIn"
                        name="candidateLinkedIn"
                        value={formData.candidateLinkedIn || ""}
                        onChange={handleChange}
                        placeholder="https://linkedin.com/in/yourprofile"
                        className="border-interview-light-blue focus:border-interview-blue"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="interviewerLinkedIn" className="text-sm font-medium">
                        {language === 'en' ? 'Interviewer LinkedIn' : 
                         language === 'es' ? 'LinkedIn del entrevistador' : 
                         'LinkedIn do(s) entrevistador(es)'}
                      </Label>
                      <Input
                        id="interviewerLinkedIn"
                        name="interviewerLinkedIn"
                        value={formData.interviewerLinkedIn || ""}
                        onChange={handleChange}
                        placeholder="https://linkedin.com/in/interviewer"
                        className="border-interview-light-blue focus:border-interview-blue"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="interviewDate" className="text-sm font-medium">
                        {language === 'en' ? 'Interview date' : 
                         language === 'es' ? 'Fecha de la entrevista' : 
                         'Data da entrevista'}
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
                        {language === 'en' ? 'Interview type' : 
                         language === 'es' ? 'Tipo de entrevista' : 
                         'Tipo de entrevista'}
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
                            {language === 'en' ? 'Technical' : 
                             language === 'es' ? 'Técnica' : 
                             'Técnica'}
                          </SelectItem>
                          <SelectItem value="behavioral">
                            {language === 'en' ? 'Behavioral' : 
                             language === 'es' ? 'Comportamental' : 
                             'Comportamental'}
                          </SelectItem>
                          <SelectItem value="strategic">
                            {language === 'en' ? 'Strategic' : 
                             language === 'es' ? 'Estratégica' : 
                             'Estratégica'}
                          </SelectItem>
                          <SelectItem value="cultural">
                            {language === 'en' ? 'Cultural' : 
                             language === 'es' ? 'Cultural' : 
                             'Cultural'}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="jobLevel" className="text-sm font-medium">
                        {language === 'en' ? 'Job level' : 
                         language === 'es' ? 'Nivel del puesto' : 
                         'Nível da vaga'}
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
                            {language === 'en' ? 'Junior' : 
                             language === 'es' ? 'Junior' : 
                             'Júnior'}
                          </SelectItem>
                          <SelectItem value="mid">
                            {language === 'en' ? 'Mid-level' : 
                             language === 'es' ? 'Nivel medio' : 
                             'Pleno'}
                          </SelectItem>
                          <SelectItem value="senior">
                            {language === 'en' ? 'Senior' : 
                             language === 'es' ? 'Senior' : 
                             'Sênior'}
                          </SelectItem>
                          <SelectItem value="leadership">
                            {language === 'en' ? 'Leadership' : 
                             language === 'es' ? 'Dirección' : 
                             'Direção'}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="interviewLanguage" className="text-sm font-medium">
                        {language === 'en' ? 'Interview language' : 
                         language === 'es' ? 'Idioma de la entrevista' : 
                         'Idioma da entrevista'}
                      </Label>
                      <Select 
                        onValueChange={(value) => handleSelectChange("interviewLanguage", value)}
                        value={formData.interviewLanguage}
                      >
                        <SelectTrigger className="border-interview-light-blue focus:border-interview-blue">
                          <SelectValue placeholder={
                            language === 'en' ? 'Select language' : 
                            language === 'es' ? 'Seleccione idioma' : 
                            'Selecione o idioma'
                          } />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="portuguese">
                            {language === 'en' ? 'Portuguese' : 
                             language === 'es' ? 'Portugués' : 
                             'Português'}
                          </SelectItem>
                          <SelectItem value="english">
                            {language === 'en' ? 'English' : 
                             language === 'es' ? 'Inglés' : 
                             'Inglês'}
                          </SelectItem>
                          <SelectItem value="spanish">
                            {language === 'en' ? 'Spanish' : 
                             language === 'es' ? 'Español' : 
                             'Espanhol'}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="practicePoints" className="text-sm font-medium">
                        {language === 'en' ? 'Points you want to practice' : 
                         language === 'es' ? 'Puntos que quieres practicar' : 
                         'Pontos que você quer treinar'}
                      </Label>
                      <Textarea
                        id="practicePoints"
                        name="practicePoints"
                        value={formData.practicePoints || ""}
                        onChange={handleChange}
                        placeholder={
                          language === 'en' ? 'Ex: I want to prepare for questions about leadership, teamwork...' : 
                          language === 'es' ? 'Ej: Quiero prepararme para preguntas sobre liderazgo, trabajo en equipo...' : 
                          'Ex: Quero me preparar para perguntas sobre liderança, trabalho em equipe...'
                        }
                        className="border-interview-light-blue focus:border-interview-blue resize-none min-h-[100px]"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="personalContext" className="text-sm font-medium">
                        {language === 'en' ? 'Personal context' : 
                         language === 'es' ? 'Contexto personal' : 
                         'Contexto pessoal'}
                      </Label>
                      <Textarea
                        id="personalContext"
                        name="personalContext"
                        value={formData.personalContext || ""}
                        onChange={handleChange}
                        placeholder={
                          language === 'en' ? 'Ex: I am transitioning careers, coming from the area of...' : 
                          language === 'es' ? 'Ej: Estoy en transición de carrera, viniendo del área de...' : 
                          'Ex: Estou em transição de carreira, vindo da área de...'
                        }
                        className="border-interview-light-blue focus:border-interview-blue resize-none min-h-[100px]"
                      />
                    </div>
                  </CollapsibleContent>
                </Collapsible>
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
