"use client";

import ProgressBar from "@/components/ProgressBar";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants, Easing } from "framer-motion";

const easeOut: Easing = [0.42, 0, 0.58, 1];

const imageVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { duration: 0.6, ease: easeOut } },
};

export default function HowWeWork() {
  return (
    <>
      <div className="text text-center mt-5 pt-5">
        <h1>
          OnlyFans <span className="text-pink">Models</span>
        </h1>
        <h3>Learn more about how we work within a few steps</h3>
        <Link href="/get-started">
          <button className="btn fs-5 btn-lg px-4 mt-3 rounded-5">
            Get started
          </button>
        </Link>
      </div>
      <section className="how-we-work pt-5 container-fluid position-relative">
        <div className="progress-bar"></div>
        <div className="container bg-dark">
          <div className="row flex-column flex-md-row align-items-center py-5 bg-white">
            <div className="col-md-6 px-5">
              <h2 className="icon-with-circle text-white">1</h2>
              <h1>Personal Roadmap</h1>
              <p className="text-secondary w-75">
                We start by understanding your vision and goals. Together we
                create a personalized plan that respects your boundaries and
                sets a clear path to growth
              </p>
            </div>
            <div className="col-md-6 px-5">
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={imageVariants}
              >
                <Image
                  src="https://res.cloudinary.com/da8w3pd4f/image/upload/v1757954314/ChatGPT_Image_Sep_15_2025_05_20_41_PM_h54d0g.webp"
                  alt="OF chart"
                  width={900}
                  height={500}
                  className="d-block w-75 hww-img rounded"
                />
              </motion.div>
            </div>
          </div>

          <div className="row flex-column flex-md-row align-items-center py-5 bg-white">
            <div className="col-md-6 px-5">
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={imageVariants}
              >
                <Image
                  src="https://res.cloudinary.com/da8w3pd4f/image/upload/v1757954313/ChatGPT_Image_Sep_15_2025_05_26_02_PM_bujpwu.webp"
                  alt="OF chart"
                  width={900}
                  height={500}
                  className="d-block w-75 hww-img rounded"
                />
              </motion.div>
            </div>
            <div className="col-md-6 px-5">
              <h2 className="icon-with-circle text-white">2</h2>
              <h1>Content Strategy</h1>
              <p className="text-secondary w-75">
                Our team builds a content calendar, trend analysis, and posting
                plan designed to attract fans and maximize engagement while
                staying authentic to you.
              </p>
            </div>
          </div>

          <div className="row flex-column flex-md-row align-items-center py-5 bg-white">
            <div className="col-md-6 px-5">
              <h2 className="icon-with-circle text-white">3</h2>
              <h1>Fan Engagement</h1>
              <p className="text-secondary w-75">
                We manage chats, comments, and fan requests to build strong,
                loyal relationships that turn casual followers into paying
                subscribers.
              </p>
            </div>
            <div className="col-md-6 px-5">
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={imageVariants}
              >
                <Image
                  src="https://res.cloudinary.com/da8w3pd4f/image/upload/v1757954312/ChatGPT_Image_Sep_15_2025_05_28_41_PM_siqp6p.webp"
                  alt="OF chart"
                  width={900}
                  height={500}
                  className="d-block w-75 hww-img rounded"
                />
              </motion.div>
            </div>
          </div>

          <div className="row flex-column flex-md-row align-items-center py-5 bg-white">
            <div className="col-md-6 px-5">
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={imageVariants}
              >
                <Image
                  src="https://res.cloudinary.com/da8w3pd4f/image/upload/v1757954313/ChatGPT_Image_Sep_15_2025_05_30_29_PM_jha9lp.webp"
                  alt="OF chart"
                  width={900}
                  height={500}
                  className="d-block w-75 hww-img rounded"
                />
              </motion.div>
            </div>
            <div className="col-md-6 px-5">
              <h2 className="icon-with-circle text-white">4</h2>
              <h1>Growth & Reports</h1>
              <p className="text-secondary w-75">
                We track results, provide weekly reports, and optimize
                strategies. You always stay in control, while we ensure your
                page scales month after month.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="cta position-relative z-3 px-3 px-md-0">
        <div className="container cta-bg shadow rounded-5 p-md-5 p-2">
          <div className="cta-opacity rounded-5"></div>
          <h1 className="display-3 fw-bold text-center text-white my-5">
            You Create
          </h1>
          <h1 className="display-3 fw-bold text-center text-white mb-5">
            We Scale
          </h1>
          <p className="fs-4 text-white text-center w-75 m-auto">
            Launch your full backend system in 72 hours - chat, content,
            marketing done for you.
          </p>
          <Link href="/get-started">
            <button className="btn fs-5 d-block px-4 py-3 rounded-5 my-5 mx-auto btn-second">
              Get started
            </button>
          </Link>
        </div>
      </section>
      <ProgressBar />
    </>
  );
}
