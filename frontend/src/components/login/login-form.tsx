const LoginForm = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-evenly">
      <div className="mx-auto max-w-md">
        <div className="relative flex h-12 w-full items-center overflow-hidden rounded-lg bg-white focus-within:shadow-lg">
          <div className="grid h-full w-12 place-items-center text-gray-300 shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>

          <input
            className="peer inline-flex h-full w-full appearance-none px-2 text-[15px] leading-none text-gray-700 outline-none"
            type="text"
            placeholder="Username"
          />
        </div>
      </div>

      <div className="mx-auto max-w-md">
        <div className="relative flex h-12 w-full items-center overflow-hidden rounded-lg bg-white focus-within:shadow-lg">
          <div className="grid h-full w-12 place-items-center text-gray-300 shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
            </svg>
          </div>

          <input
            className="peer inline-flex h-full w-full appearance-none px-2 text-[15px] leading-none text-gray-700 outline-none"
            type="password"
            placeholder="Password"
          />
        </div>
      </div>
      {/* <input
        className="inline-flex h-[35px] w-[200px] appearance-none items-center justify-center rounded-lg bg-black px-[10px] text-[15px] leading-none text-white shadow-lg shadow-black outline-none  focus:shadow-[0_0_0_2px_black]"
        placeholder="Password"
        type={'password'}
      /> */}
      <div className="absolute-center">
        <svg className="circle-svg" viewBox="0 0 500 500">
          <defs>
            <path
              d="M50,250c0-110.5,89.5-200,200-200s200,89.5,200,200s-89.5,200-200,200S50,360.5,50,250"
              id="textcircle_top"
            >
              <animateTransform
                attributeName="transform"
                begin="0s"
                dur="20s"
                type="rotate"
                from="0 250 250"
                to="360 250 250"
                repeatCount="indefinite"
              />
            </path>
          </defs>
          <text className="circle-text" dy="70" textLength="1220">
            <textPath xlinkHref="#textcircle_top">
              View Our Showreels View Our Showreels
            </textPath>
          </text>
        </svg>
      </div>
      <button className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gray-800 px-10 py-4 font-mono font-medium tracking-tighter text-white ">
        <span className="absolute h-0 w-0 rounded-full bg-gray-900 transition-all duration-500 ease-out group-hover:h-56 group-hover:w-56"></span>
        <span className="absolute inset-0 -mt-1 h-full w-full rounded-lg bg-gradient-to-b from-transparent via-transparent to-gray-400 opacity-30"></span>
        <span className="relative">Login</span>
      </button>
    </div>
  )
}

export default LoginForm
