
import React from "react";
import { FaqSection } from "@/components/ui/faq-section";
import { useLanguage } from "@/context/LanguageContext";

const OptionalFieldsFaq = () => {
  const { t } = useLanguage();
  
  const FAQ_ITEMS = [
    {
      question: t('faq.optionalFields.question1'),
      answer: t('faq.optionalFields.answer1'),
    },
    {
      question: t('faq.optionalFields.question2'),
      answer: t('faq.optionalFields.answer2'),
    },
    {
      question: t('faq.optionalFields.question3'),
      answer: t('faq.optionalFields.answer3'),
    },
  ];

  return (
    <FaqSection
      title={t('faq.optionalFields.title')}
      description={t('faq.optionalFields.description')}
      items={FAQ_ITEMS}
      contactInfo={{
        title: t('faq.contactInfo.title'),
        description: t('faq.contactInfo.description'),
        buttonText: t('faq.contactInfo.buttonText'),
        onContact: () => window.open('mailto:support@jobishup.com', '_blank'),
      }}
      className="py-8"
    />
  );
};

export default OptionalFieldsFaq;
