
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Section } from "@/types";

interface PlanSectionProps {
  section: Section;
}

const PlanSection = ({ section }: PlanSectionProps) => {
  const formatContent = (content: string) => {
    // Split by line breaks
    const paragraphs = content.split("\n");
    
    return (
      <div>
        {paragraphs.map((paragraph, i) => {
          // Handle bullet points (both - and • formats)
          if (paragraph.trim().startsWith("-") || paragraph.trim().startsWith("•")) {
            return (
              <div key={i} className="flex items-start space-x-2 mb-2">
                <span>•</span>
                <span>{paragraph.trim().substring(1).trim()}</span>
              </div>
            );
          }
          
          // Handle bold text (markdown style)
          let formattedText = paragraph;
          const boldPattern = /\*\*(.*?)\*\*/g;
          
          // Replace markdown style bold with HTML bold
          if (paragraph.match(boldPattern)) {
            formattedText = paragraph.replace(boldPattern, (_, text) => {
              return `<strong>${text}</strong>`;
            });
            return (
              <p 
                key={i} 
                className="mb-3"
                dangerouslySetInnerHTML={{ __html: formattedText }}
              />
            );
          }
          
          return paragraph.trim() ? <p key={i} className="mb-3">{paragraph}</p> : <div key={i} className="h-3" />;
        })}
      </div>
    );
  };

  return (
    <motion.div variants={item} className="card-hover">
      <Card className="glass-card overflow-hidden border border-white/20">
        <div className="bg-gradient-to-r from-interview-light-blue to-interview-light-purple p-4 border-b border-white/20">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{section.emoji}</span>
            <h2 className="text-xl font-semibold">{section.title}</h2>
          </div>
        </div>
        <div className="p-6">
          {formatContent(section.content)}
        </div>
      </Card>
    </motion.div>
  );
};

// Animation variants
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default PlanSection;
