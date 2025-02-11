
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Graduation, Users, Code, BookOpen } from "lucide-react";

export const Dashboard = () => {
  const programs = [
    {
      title: "Digital Skills",
      description: "Master essential digital skills for the modern workplace",
      icon: Code,
      color: "text-capaciti-red",
    },
    {
      title: "Career Development",
      description: "Build your career path with industry-relevant training",
      icon: Graduation,
      color: "text-capaciti-navy",
    },
    {
      title: "Business Skills",
      description: "Develop crucial business and entrepreneurship skills",
      icon: Users,
      color: "text-capaciti-red",
    },
    {
      title: "Learning Paths",
      description: "Structured learning paths tailored to your goals",
      icon: BookOpen,
      color: "text-capaciti-navy",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative rounded-2xl bg-gradient-to-r from-capaciti-navy to-capaciti-navy-light p-8 text-white overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Transform Your Future with CAPACITI</h2>
          <p className="text-white/90 mb-6">
            Join our innovative training programs designed to empower individuals with digital skills
            and prepare them for careers in technology. Get started on your journey today!
          </p>
          <Button className="bg-capaciti-red hover:bg-capaciti-red/90">
            Explore Programs <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-capaciti-red/10 to-transparent" />
      </div>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {programs.map((program) => (
          <Card key={program.title} className="p-6 hover:shadow-lg transition-shadow">
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
        ))}
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 border-l-4 border-l-capaciti-red">
          <h3 className="font-semibold text-capaciti-navy mb-2">Industry-Led Training</h3>
          <p className="text-gray-600">Programs designed with input from industry leaders</p>
        </Card>
        <Card className="p-6 border-l-4 border-l-capaciti-navy">
          <h3 className="font-semibold text-capaciti-navy mb-2">Career Support</h3>
          <p className="text-gray-600">Dedicated career guidance and placement assistance</p>
        </Card>
        <Card className="p-6 border-l-4 border-l-capaciti-red">
          <h3 className="font-semibold text-capaciti-navy mb-2">Flexible Learning</h3>
          <p className="text-gray-600">Learn at your own pace with structured support</p>
        </Card>
      </div>
    </div>
  );
};
