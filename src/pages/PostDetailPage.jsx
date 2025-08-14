import React from "react";
import neral from "../assets/Rectangle91.svg";
import DeleteButton from "../components/common/DeleteButton";

const PostDetailPage = () => {
  return (
    <section className="p-6 md:px-20 md:py-12 lg:px-40 xl:px-60 mb-12">
      <h1 className="text-[#1C1C1C] text-[22px] font-semibold leading-tight md:text-[30px]">
        Elon Musk shows off updates to his brain chips and says he’s going to
        install one in himself when they are ready
      </h1>
      <div className="pt-6 pb-8">
        <span className="text-[#8E8E8E] text-sm">
          PUBLISHED THU, DEC 1 20228:09 AM
        </span>
        <img src={neral} alt="" className="w-full h-auto" />
      </div>
      <p className="text-base text-[#1C1C1C] font-normal md:text-[18px]">
        Elon Musk shows off updates to his brain chips and says he’s going to
        install one in himself when they are readyElon Musk’s health tech
        venture Neuralink shared updates to its brain-implant technology during
        a “show and tell” recruitment event Wednesday night. Musk said during
        the event that he plans to get one of the implants himself. Musk said
        two of the company’s applications will aim to restore vision, even for
        people who were born blind, and a third application will focus on the
        motor cortex, restoring “full body functionality” for people with
        severed spinal cords. “We’re confident there are no physical limitations
        to restoring full body functionality,” Musk said. Neuralink could begin
        to test the motor cortex technology in humans in as soon as six months,
        Musk said. “Obviously, we want to be extremely careful and certain that
        it will work well before putting a device in a human, but we’re
        submitted, I think, most of our paperwork to the FDA,” he said. Musk
        also said he plans to get one himself. “You could have a Neuralink
        device implanted right now and you wouldn’t even know. I mean,
        hypothetically ... In fact, in one of these demos, I will,” he said. He
        reiterated that on Twitter after the event. Since none of Neuralink’s
        devices have been tested on humans or approved by the FDA, Wednesday’s
        announcements warrant skepticism, said Xing Chen, assistant professor in
        the Department of Ophthalmology at the University of Pittsburgh School
        of Medicine. “Neuralink is a company [that] doesn’t have to answer to
        shareholders,” she told CNBC. “I don’t know how much oversight is
        involved, but I think it’s very important for the public to always keep
        in mind that before anything has been approved by the FDA, or any
        governmental regulatory body, all claims need to be very, very
        skeptically examined.” Neuralink was founded in 2016 by Musk and a group
        of other scientists and engineers. It strives to develop brain-computer
        interfaces, or BCIs, that connect the human brain to computers that can
        decipher neural signals. Musk invested tens of millions of his personal
        wealth into the company and has said, without evidence, that Neuralink’s
        devices could enable “superhuman cognition,” enable paralyzed people to
        operate smartphones or robotic limbs with their minds someday, and
        “solve” autism and schizophrenia. The company’s presentation Wednesday
        echoed these lofty ambitions, as Musk claimed that “as miraculous as it
        may sound, we’re confident that it is possible to restore full body
        functionality to someone who has a severed spinal cord.”
      </p>

      <div className="mt-6 flex justify-end">
        <DeleteButton />
      </div>
    </section>
  );
};

export default PostDetailPage;
