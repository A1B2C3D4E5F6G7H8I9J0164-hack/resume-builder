import SectionTitle from "./SectionTitle";
import TestimonialCard from "@/components/TestimonialCard";
import { testimonialsData } from "@/data/testimonial";
import { ITestimonial } from "@/types";

export default function TestimonialSection() {
    return (
        <div id="testimonials" className="px-4 md:px-16 lg:px-24 xl:px-32 py-20 bg-zinc-950">
            <SectionTitle
                text1="Stories"
                text2="Trusted by Professionals"
                text3="Our users are landing offers at competitive tech companies and high-growth startups globally."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20 max-w-7xl mx-auto">
                {testimonialsData.map((testimonial: ITestimonial, index: number) => (
                    <TestimonialCard key={index} index={index} testimonial={testimonial} />
                ))}
            </div>
        </div>
    );
}