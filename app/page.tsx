"use client";
import React from "react";
import HomeCollapse from "@/components/HomeCollapse";
import StickyScrollEffect from "@/components/StickyScrollEffect";
import Script from "next/script";
import Image from "next/image";
import { motion, Variants, Easing } from "framer-motion";
import Link from "next/link";

const easeOut: Easing = [0.42, 0, 0.58, 1];

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.2 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOut, delay: 1 },
  },
};

const faqVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } },
};

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.3, // każda kolumna pojawia się po 0.3s
    },
  },
};

const colVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

export default function HomePage() {
  return (
    <>
      <section className="hero d-flex align-items-center py-5 container-fluid position-relative">
        <video autoPlay muted loop className="hero-video">
          <source
            src="https://res.cloudinary.com/da8w3pd4f/video/upload/v1758825088/Bikini_Model_Video_Ready_z68nps.webm"
            type="video/webm"
          />
          Your browser does not support the video tag.
        </video>
        <div className="hero-opacity"></div>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6">
              <motion.div variants={container} initial="hidden" animate="show">
                <motion.h1
                  variants={item}
                  className="display-3 fw-bold text-pink"
                >
                  Your name
                </motion.h1>
                <motion.h1
                  variants={item}
                  className="display-3 fw-bold text-white"
                >
                  Your face
                </motion.h1>
                <motion.h1
                  variants={item}
                  className="display-3 fw-bold text-pink"
                >
                  Our strategy
                </motion.h1>
                <motion.h1
                  variants={item}
                  className="display-3 fw-bold text-white"
                >
                  Unstoppable
                </motion.h1>
                <motion.p variants={item} className="fs-5 mt-4 text-white">
                  Most agencies manage creators. We create icons. Our system
                  scales your revenue, grows your audience, and protects your
                  energy
                </motion.p>
                <Link href="/get-started">
                  <motion.button
                    variants={item}
                    className="btn fs-5 btn-lg px-4 rounded-5 mt-5"
                  >
                    Book Your Free Strategy Call
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <motion.section
        initial="hidden"
        animate="show"
        exit="hidden"
        variants={sectionVariants}
      >
        <section className="expert-choice py-1 py-md-5 bg-white">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col logos d-flex">
                <div className="logo-slider">
                  <Image
                    src="https://res.cloudinary.com/da8w3pd4f/image/upload/v1757954311/VOGUE_LOGO.svg_jih6nl.png"
                    alt="Vouge"
                    width={250}
                    height={40}
                  />
                  <Image
                    src="https://res.cloudinary.com/da8w3pd4f/image/upload/v1757954310/Medium__website__logo.svg_idtvps.png"
                    alt="Medium"
                    width={250}
                    height={40}
                  />
                  <Image
                    src="https://res.cloudinary.com/da8w3pd4f/image/upload/v1758032706/ChatGPT_Image_Sep_15_2025_05_40_54_PM_gwbz09.webp"
                    alt="Solander"
                    width={250}
                    height={40}
                  />
                  <Image
                    src="https://res.cloudinary.com/da8w3pd4f/image/upload/v1758032707/ChatGPT_Image_Sep_15_2025_05_47_03_PM_tyo7bq.webp"
                    alt="ModelsWorlds"
                    width={250}
                    height={40}
                  />
                  <Image
                    src="https://res.cloudinary.com/da8w3pd4f/image/upload/v1758032706/ChatGPT_Image_Sep_15_2025_05_46_08_PM_gmaoyb.webp"
                    alt="FansRanking"
                    width={250}
                    height={40}
                  />
                  <Image
                    src="https://res.cloudinary.com/da8w3pd4f/image/upload/v1758032706/ChatGPT_Image_Sep_15_2025_05_53_36_PM_rga8wq.webp"
                    alt="FansMoneyGroup"
                    width={250}
                    height={40}
                  />
                  <Image
                    src="https://res.cloudinary.com/da8w3pd4f/image/upload/v1758032707/ChatGPT_Image_Sep_15_2025_05_50_50_PM_elwq3f.webp"
                    alt="MoneysTrends"
                    width={250}
                    height={40}
                  />
                  <Image
                    src="https://res.cloudinary.com/da8w3pd4f/image/upload/v1758032706/ChatGPT_Image_Sep_15_2025_05_39_51_PM_x2tv3s.webp"
                    alt="Atelier Lemaire"
                    width={250}
                    height={40}
                  />
                </div>
              </div>
            </div>
            <div className="row pt-3">
              <div className="col text-center">
                <span className="text-pink fs-5">Expret&apos;s Pick:</span>
                <p className="fs-5">Top Rated OnlyFans Agency</p>
              </div>
            </div>
          </div>
        </section>
      </motion.section>
      <section className="sticky pt-3">
        <div className="container position-relative">
          <div className="row flex flex-column mt-2 mt-md-5 p-2 p-md-0 position-relative">
            <div className="col bg-pink p-0 p-md-5 rounded-5 mb-5 sticky-col shadow">
              <div className="d-flex flex-column flex-md-row gap-1 gap-md-5 overflow-hidden">
                <div className="p-md-5 p-3 w-100 w-md-75">
                  <i className="fa-solid fa-money-bill-trend-up d-block text-center display-3 mb-3"></i>
                  <h1 className="display-5 mb-4 fw-bold">
                    Increase your OnlyFans income
                  </h1>
                  <p className="fs-5">
                    Creators working with us earn 2–3x more by trusting our team
                    with strategy, content optimization, and audience growth.
                    You focus on creating. We handle the rest.
                  </p>
                  <Link href="/how-we-work">
                    <button className="btn btn-second fs-5 px-4 rounded-5">
                      See how it works
                    </button>
                  </Link>
                </div>
                <div className="p-3 pt-0 pt-md-3">
                  <Image
                    src="https://res.cloudinary.com/da8w3pd4f/image/upload/v1757858841/ChatGPT_Image_Sep_4_2025_02_49_16_PM_weqlas.webp"
                    alt="OF chart"
                    width={900}
                    height={500}
                    className="d-block w-100 hww-img wykres rounded"
                  />
                </div>
              </div>
            </div>

            <div className="col bg-pink p-0 p-md-5 rounded-5 mb-5 sticky-col shadow">
              <div className="d-flex flex-column flex-md-row gap-1 gap-md-5 overflow-hidden">
                <div className="p-3">
                  <Image
                    src="https://res.cloudinary.com/da8w3pd4f/image/upload/v1757858842/ChatGPT_Image_Sep_4_2025_04_30_03_PM_d1vyjj.webp"
                    alt="OF chart"
                    width={800}
                    height={500}
                    className="d-block w-100 hww-img wykres rounded"
                  />
                </div>
                <div className="p-md-5 pt-md-5 p-3 pt-0 w-100 w-md-75">
                  <i className="fa-solid fa-user-plus d-block text-center display-3 mb-3"></i>
                  <h1 className="display-5 mb-4 fw-bold">Fan Conversion</h1>
                  <p className="fs-5">
                    It&apos;s not only about followers, it&apos;s about loyal
                    subscribers. Our methods turn casual viewers into paying
                    fans, building a stable and scalable income.
                  </p>
                  <Link href="/how-we-work">
                    <button className="btn fs-5 px-4 rounded-5">
                      See how it works
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col bg-pink p-0 p-md-5 rounded-5 mb-5 sticky-col shadow">
              <div className="d-flex flex-column flex-md-row gap-1 gap-md-5 overflow-hidden">
                <div className="p-md-5 p-3 w-100 w-md-75">
                  <i className="fa-solid fa-star d-block text-center display-3 mb-3"></i>
                  <h1 className="display-5 mb-4 fw-bold">Brand Building</h1>
                  <p className="fs-5">
                    Authentic Identity <br />
                    We shape your profile into a recognizable brand by aligning
                    your content with audience desires and positioning you for
                    long-term growth.
                  </p>
                  <Link href="/how-we-work">
                    <button className="btn btn-second fs-5 px-4 rounded-5">
                      See how it works
                    </button>
                  </Link>
                </div>
                <div className="p-3 pt-0 pt-md-3">
                  <Image
                    src="https://res.cloudinary.com/da8w3pd4f/image/upload/v1757858841/84e92a27-255f-4c52-9897-7af0fa32958b_xioyd6.webp"
                    alt="OF chart"
                    width={900}
                    height={500}
                    className="d-block mx-auto w-50 hww-img wykres rounded"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row flex-column numbers position-absolute">
            <div className="col">
              <p className="fs-5 fw-bold">01</p>
            </div>
            <div className="col">
              <p className="fs-5 fw-bold">02</p>
            </div>
            <div className="col">
              <p className="fs-5 fw-bold">03</p>
            </div>
          </div>
        </div>
      </section>
      <motion.section
        className="creative bg-pink p-md-5 p-0"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }} // odpala animacje gdy 20% sekcji wejdzie do widoku
        variants={container}
      >
        <div className="container p-2 p-md-3">
          <h1 className="display-3 text-center mb-5">
            <span className="fw-bold">Platforms</span> on which we operate
          </h1>
          <div className="row w-100 m-0 p-0">
            <div className="col">
              <div className="row align-items-center flex-nowrap">
                <div className="col-4 mb-5">
                  {[
                    { icon: "fa-instagram", label: "Instagram" },
                    { icon: "fa-tiktok", label: "Tiktok" },
                  ].map((platform, i) => (
                    <motion.div
                      key={i}
                      variants={item}
                      className="card m-auto border-0 rounded-4 shadow p-2 mb-3"
                    >
                      <div className="card-body p-2 p-md-3 text-center">
                        <i
                          className={`fa-brands ${platform.icon} d-block custom-fs-icon`}
                        ></i>
                        <p className="card-text custom-fs mt-3">
                          {platform.label}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="col-4">
                  {[
                    { icon: "fa-threads", label: "Threads" },
                    { icon: "fa-x-twitter", label: "Twitter" },
                    { icon: "fa-reddit", label: "Reddit" },
                  ].map((platform, i) => (
                    <motion.div
                      key={i}
                      variants={item}
                      className="card m-auto border-0 rounded-4 shadow p-2 mb-3"
                    >
                      <div className="card-body p-2 p-md-3 text-center">
                        <i
                          className={`fa-brands ${platform.icon} d-block custom-fs-icon`}
                        ></i>
                        <p className="card-text custom-fs mt-3">
                          {platform.label}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="col-4">
                  {[
                    { icon: "fa-youtube", label: "Youtube" },
                    { icon: "fa-twitch", label: "Twitch" },
                  ].map((platform, i) => (
                    <motion.div
                      key={i}
                      variants={item}
                      className="card m-auto border-0 rounded-4 shadow p-2 mb-3"
                    >
                      <div className="card-body p-2 p-md-3 text-center">
                        <i
                          className={`fa-brands ${platform.icon} d-block custom-fs-icon`}
                        ></i>
                        <p className="card-text custom-fs mt-3">
                          {platform.label}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="growth my-5"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="container">
          <div className="row flex-column">
            <div className="col">
              <h1 className="display-3 fw-bold">
                Done for You <span className="text-pink">Growth</span>
              </h1>
            </div>
            <div className="col">
              <p className="fs-5">
                We turn your OF page into a scaled, optimized business. With a
                full team behind you - content strategy, fan engagement, growth
                engine. You just create.
              </p>
            </div>
          </div>

          <div className="row row-cols-1 row-cols-md-3 g-4 py-3 py-md-5">
            {[
              {
                icon: "fa-chart-line",
                title: "Career Growth",
                text: "We guide your OnlyFans journey like a real career. With clear strategies, structured planning, and proven methods, your profile grows steadily while building long-term value.",
              },
              {
                icon: "fa-lightbulb",
                title: "Content Strategy",
                text: "Every post, caption, and campaign is crafted with purpose. We analyze trends, design ideas with you, and help you create content that attracts and converts fans.",
              },
              {
                icon: "fa-comments",
                title: "Fan Management",
                text: "We build strong fan relationships through daily interactions, engagement, and retention tactics. Loyal fans mean higher income, better stability, and consistent growth.",
              },
            ].map((item, i) => (
              <motion.div key={i} className="col" variants={colVariants}>
                <div className="card bg-pink p-5 border-0 rounded-4 shadow">
                  <i
                    className={`fa-solid ${item.icon} fs-1 mb-4 icon-with-circle`}
                  ></i>
                  <div className="card-body">
                    <h5 className="card-title fw-bold">{item.title}</h5>
                    <p className="card-text mt-3">{item.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <section className="chase bg-pink">
        <div className="container">
          <div className="row flex-column flex-md-row py-5 px-3 px-md-9">
            <div className="col mb-3 mb-md-0">
              <Image
                src="https://res.cloudinary.com/da8w3pd4f/image/upload/v1757858835/6fd4908b-bfed-4ae8-8846-7d59e62cc8c7_k8jhif.webp"
                alt="OF chart"
                width={900}
                height={600}
                className="w-100 rounded-5 border border-danger-subtle"
              />
            </div>
            <div className="col rounded-5 bg-pink-second p-3 p-md-5">
              <h2 className="display-3 mb-5">
                Growth Without <span className="fw-bold text-pink">Limits</span>
              </h2>
              <p className="fs-5">You create. We handle the rest.</p>
              <p className="fs-5">
                Forget the stress of managing everything alone. We keep your
                page optimized, scalable, and profitable. While you stay in
                control of your brand
              </p>
              <Link href="/get-started">
                <button className="btn fs-5 btn-lg px-4 rounded-5 mt-5 btn-second">
                  Get started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <motion.section
        className="questions"
        id="faq"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={faqVariants}
      >
        <div className="container py-5">
          <h1 className="display-3 fw-bold text-center">
            Frequently Asked Questions
          </h1>
          <div className="faq-grid container my-5">
            <div className="faq-grid w-100">
              <div className="faq-column" id="faqAccordion1">
                <div className="faq-item">
                  <button
                    className="faq-toggle"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq1"
                    aria-expanded="false"
                    aria-controls="faq1"
                  >
                    <span className="question text-black">
                      <strong>
                        Do I have to show my face to be successful on OnlyFans?
                      </strong>
                    </span>
                    <span className="icon">+</span>
                  </button>
                  <div
                    className="collapse"
                    id="faq1"
                    data-bs-parent="#faqAccordion1"
                  >
                    <div className="faq-answer ">
                      No, not at all. Many creators stay anonymous and still
                      build loyal communities. Together we&apos;ll create a
                      strategy that matches your comfort level and boundaries.
                    </div>
                  </div>
                </div>

                <div className="faq-item">
                  <button
                    className="faq-toggle"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq3"
                    aria-expanded="false"
                    aria-controls="faq3"
                  >
                    <span className="question text-black">
                      <strong>
                        How much time will I need to invest if I work with an
                        agency?
                      </strong>
                    </span>
                    <span className="icon">+</span>
                  </button>
                  <div
                    className="collapse"
                    id="faq3"
                    data-bs-parent="#faqAccordion1"
                  >
                    <div className="faq-answer">
                      You focus on creating content — we handle the rest:
                      marketing, fan communication, reports, and growth
                      strategies. This way you save time, reduce stress, and
                      increase your earnings
                    </div>
                  </div>
                </div>

                <div className="faq-item">
                  <button
                    className="faq-toggle"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq5"
                    aria-expanded="false"
                    aria-controls="faq5"
                  >
                    <span className="question text-black">
                      <strong>
                        Will I stay in full control of my profile?
                      </strong>
                    </span>
                    <span className="icon">+</span>
                  </button>
                  <div
                    className="collapse"
                    id="faq5"
                    data-bs-parent="#faqAccordion1"
                  >
                    <div className="faq-answer">
                      Yes, always. You decide what content to post and where
                      your limits are. Our job is to maximize your success while
                      respecting your choices.
                    </div>
                  </div>
                </div>
              </div>

              <div className="faq-column" id="faqAccordion2">
                <div className="faq-item">
                  <button
                    className="faq-toggle"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq2"
                    aria-expanded="false"
                    aria-controls="faq2"
                  >
                    <span className="question text-black">
                      <strong>
                        How much can I earn by working with an agency?
                      </strong>
                    </span>
                    <span className="icon">+</span>
                  </button>
                  <div
                    className="collapse"
                    id="faq2"
                    data-bs-parent="#faqAccordion2"
                  >
                    <div className="faq-answer">
                      Every creator is different, but most of our models earn
                      2–3 times more after joining us. The growth comes from
                      professional marketing, optimized pricing, and better fan
                      engagement.
                    </div>
                  </div>
                </div>

                <div className="faq-item">
                  <button
                    className="faq-toggle"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq4"
                    aria-expanded="false"
                    aria-controls="faq4"
                  >
                    <span className="question text-black">
                      <strong>
                        Is working with an agency safe and discreet?
                      </strong>
                    </span>
                    <span className="icon">+</span>
                  </button>
                  <div
                    className="collapse"
                    id="faq4"
                    data-bs-parent="#faqAccordion2"
                  >
                    <div className="faq-answer">
                      Absolutely. We protect your privacy, your data, and your
                      identity. Everything we do is built on trust,
                      professionalism, and discretion.
                    </div>
                  </div>
                </div>
                <div className="faq-item">
                  <button
                    className="faq-toggle"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq6"
                    aria-expanded="false"
                    aria-controls="faq6"
                  >
                    <span className="question text-black">
                      <strong>
                        I have no social media experience - is that a problem?
                      </strong>
                    </span>
                    <span className="icon">+</span>
                  </button>
                  <div
                    className="collapse"
                    id="faq6"
                    data-bs-parent="#faqAccordion2"
                  >
                    <div className="faq-answer">
                      Not at all. We take care of branding, audience growth, and
                      promotion. All you need is creativity and willingness to
                      create content. We do the rest.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
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

      <Script src="/js/copy-slider.js" strategy="lazyOnload" />
      <HomeCollapse />
      <StickyScrollEffect />
    </>
  );
}
