
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, Users, Code, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  const programs = [
    {
      title: "Digital Skills",
      description: "Master essential digital skills for the modern workplace",
      icon: Code,
      color: "text-capaciti-red",
      link: "https://uvuafrica.com/capaciti/digital-skills",
    },
    {
      title: "Career Development",
      description: "Build your career path with industry-relevant training",
      icon: GraduationCap,
      color: "text-capaciti-navy",
      link: "https://uvuafrica.com/capaciti/career-development",
    },
    {
      title: "Business Skills",
      description: "Develop crucial business and entrepreneurship skills",
      icon: Users,
      color: "text-capaciti-red",
      link: "https://uvuafrica.com/capaciti/business-skills",
    },
    {
      title: "Learning Paths",
      description: "Structured learning paths tailored to your goals",
      icon: BookOpen,
      color: "text-capaciti-navy",
      link: "https://uvuafrica.com/capaciti/learning-paths",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative rounded-2xl bg-gradient-to-r from-capaciti-red to-capaciti-navy p-8 text-white overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Transform Your Future with CAPACITI</h2>
          <p className="text-white/90 mb-6">
            Join our innovative training programs designed to empower individuals with digital skills
            and prepare them for careers in technology. Get started on your journey today!
          </p>
          <a href="https://uvuafrica.com/capaciti/programs" target="_blank" rel="noopener noreferrer">
            <Button className="bg-white text-capaciti-navy hover:bg-gray-100">
              Explore Programs <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-capaciti-navy/50 to-transparent" />
        <img 
          src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
          alt="Technology Background"
          className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-20 mix-blend-overlay"
        />
      </div>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {programs.map((program) => (
          <a 
            href={program.link}
            target="_blank"
            rel="noopener noreferrer"
            key={program.title}
          >
            <Card className="p-6 hover:shadow-lg transition-shadow bg-white/95">
              <div className="flex items-start space-x-4">
                <div className={`${program.color} p-3 rounded-lg bg-gray-100`}>
                  <program.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-capaciti-navy mb-2">{program.title}</h3>
                  <p className="text-gray-600">{program.description}</p>
                </div>
              </div>
            </Card>
          </a>
        ))}
      </div>

      {/* Features Section with Images */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 border-l-4 border-l-capaciti-red bg-white/95 relative overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
            alt="Industry Training"
            className="absolute inset-0 w-full h-full object-cover opacity-10"
          />
          <div className="relative z-10">
            <h3 className="font-semibold text-capaciti-navy mb-2">Industry-Led Training</h3>
            <p className="text-gray-600">Programs designed with input from industry leaders</p>
          </div>
        </Card>
        <Card className="p-6 border-l-4 border-l-capaciti-navy bg-white/95 relative overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952"
            alt="Career Support"
            className="absolute inset-0 w-full h-full object-cover opacity-10"
          />
          <div className="relative z-10">
            <h3 className="font-semibold text-capaciti-navy mb-2">Career Support</h3>
            <p className="text-gray-600">Dedicated career guidance and placement assistance</p>
          </div>
        </Card>
        <Card className="p-6 border-l-4 border-l-capaciti-red bg-white/95 relative overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
            alt="Flexible Learning"
            className="absolute inset-0 w-full h-full object-cover opacity-10"
          />
          <div className="relative z-10">
            <h3 className="font-semibold text-capaciti-navy mb-2">Flexible Learning</h3>
            <p className="text-gray-600">Learn at your own pace with structured support</p>
          </div>
        </Card>
      </div>
    </div>
  );
};
