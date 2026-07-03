export default function ContactUsFields() {
  return (
    <div className="md:w-[52%] w-full space-y-6">
      <h1 className="text-[28px]">Contact Us</h1>
      <div className="font-medium text-[14px] space-y-1">
        <p>📣 Got a question or feedback?</p>
        <p>We&apos;d love to hear from you! Simply fill out the form below or reach out to us by mail at:</p>
      </div>
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <label className="text-[14px] text-gray-800">Name</label>
          <input className="w-full h-[45px] rounded-md outline-none pl-5 border border-gray-400" type="text" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[14px] text-gray-800">Phone Number</label>
          <input className="w-full h-[45px] rounded-md outline-none pl-5 border border-gray-400" type="text" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[14px] text-gray-800">
            Email <span className="text-red-600">*</span>
          </label>
          <input className="w-full h-[45px] rounded-md outline-none pl-5 border border-gray-400" type="email" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[14px] text-gray-800">
            Comment <span className="text-red-600">*</span>
          </label>
          <textarea className="w-full h-[150px] rounded-md outline-none pl-5 pt-3 border border-gray-400" />
        </div>
        <button
          type="button"
          className="rounded text-sm w-[240px] md:h-[45px] h-[42px] mt-2 border-yellow-400 border hover:bg-yellow-400 text-black font-medium transition-all duration-200 hover:-translate-y-1"
        >
          SUBMIT CONTACT
        </button>
      </div>
    </div>
  );
}