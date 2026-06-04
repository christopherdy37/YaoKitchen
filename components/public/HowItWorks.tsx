import { Fragment } from "react";
import {
  Calendar,
  ClipboardList,
  MessageCircle,
  ChefHat,
  Clock,
  Package,
  Truck,
  Users,
  ArrowRight,
} from "lucide-react";

const STEPS = [
  {
    number: 1,
    icon: Calendar,
    title: "Check Availability",
    desc: "Select your date, location, and number of guests.",
  },
  {
    number: 2,
    icon: ClipboardList,
    title: "Send Inquiry",
    desc: "Fill out the form with your event details.",
  },
  {
    number: 3,
    icon: MessageCircle,
    title: "Confirm via Viber",
    desc: "We'll respond quickly via Viber to assist and confirm.",
  },
  {
    number: 4,
    icon: ChefHat,
    title: "We Handle Everything",
    desc: "Relax while we take care of the food, setup, and service.",
  },
];

const FEATURES = [
  { icon: Clock, title: "24-Hour Lead Time", sub: "For quality service and preparation" },
  { icon: Package, title: "Fresh Ingredients", sub: "Made with premium, quality ingredients" },
  { icon: Truck, title: "On-Time Setup", sub: "We arrive early and setup on schedule" },
  { icon: Users, title: "Attentive Service", sub: "Our team is here to serve your guests" },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-forest px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-14 text-center font-playfair text-4xl font-bold text-white lg:text-5xl">
          How It Works
        </h2>

        {/* Steps */}
        <div className="grid grid-cols-2 gap-y-10 lg:flex lg:items-start lg:gap-0">
          {STEPS.map((step, i) => (
            <Fragment key={step.number}>
              <div className="flex flex-col items-center px-4 text-center lg:flex-1">
                <span className="mb-2 font-inter text-xs font-semibold text-white/50">
                  {step.number}
                </span>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 ring-2 ring-white/30">
                  <step.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="mt-4 font-inter text-base font-bold text-white">
                  {step.title}
                </h3>
                <p className="mt-1.5 font-inter text-xs leading-relaxed text-white/60">
                  {step.desc}
                </p>
              </div>
              {i < STEPS.length - 1 && (
                <div className="hidden lg:flex shrink-0 items-center self-start mt-[3.25rem]">
                  <ArrowRight className="h-5 w-5 text-white/40" />
                </div>
              )}
            </Fragment>
          ))}
        </div>

        {/* Feature badges */}
        <div className="mt-16 grid grid-cols-2 gap-6 border-t border-white/10 pt-12 lg:grid-cols-4">
          {FEATURES.map((feat) => (
            <div key={feat.title} className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
                <feat.icon className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-inter text-sm font-semibold text-white">
                  {feat.title}
                </p>
                <p className="font-inter text-xs text-white/55">{feat.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
