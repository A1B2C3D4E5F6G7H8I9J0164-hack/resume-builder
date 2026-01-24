import SectionTitle from "@/components/SectionTitle";
import TestimonialCard from "@/components/TestimonialCard";
import { testimonialsData } from "@/data/testimonial";
import { ITestimonial } from "@/types";
import Marquee from "react-fast-marquee";

export default function TestimonialSection() {
    return (
        <div id="testimonials" className="px-4 md:px-16 lg:px-24 xl:px-32 py-20 relative overflow-hidden">
            <SectionTitle
                text1="Stories"
                text2="Trusted by Global Elite"
                text3="Our users are landing offers at Tier-1 tech companies and high-growth startups globally."
            />

            <Marquee className="max-w-7xl mx-auto mt-20" gradient={true} speed={30} gradientColor="#000">
                <div className="flex items-center justify-center py-10 overflow-hidden">
                    {[...testimonialsData, ...testimonialsData].map((testimonial: ITestimonial, index: number) => (
                        <TestimonialCard key={index} index={index} testimonial={testimonial} />
                    ))}
                </div>
            </Marquee>
            <Marquee className="max-w-7xl mx-auto" gradient={true} speed={30} direction="right" gradientColor="#000">
                <div className="flex items-center justify-center py-10 overflow-hidden">
                    {[...testimonialsData, ...testimonialsData].map((testimonial: ITestimonial, index: number) => (
                        <TestimonialCard key={index} index={index} testimonial={testimonial} />
                    ))}
                </div>
            </Marquee>

        </div>
    );
}