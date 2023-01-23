import Svg, { G, Mask, Path } from "react-native-svg"

const SvgArrow = (props) => {
  return (
    <Svg viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg" {...props} >
      <G clipPath="url(#clip0_5_167)">
        <Mask
          maskUnits="userSpaceOnUse"
          x={0}
          y={0}
          width={25}
          height={25}
          >
          <Path d="M25 0H0v25h25V0z" />
        </Mask>
        <G mask="url(#a)">
          <Path d="M3.21 14.194l7.292-1.458c.651-.13.651-.342 0-.472l-7.293-1.458c-.434-.087-.857-.51-.944-.945L.807 2.57c-.13-.652.253-.955.857-.676l22.253 10.27c.402.186.402.488 0 .673L1.664 23.107c-.604.279-.988-.024-.857-.676l1.458-7.292c.087-.434.51-.858.944-.944z"/>
        </G>
      </G>
    </Svg>
  );
}

const SvgProfil = (props) => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
      <Path d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM512 256c0 141.4-114.6 256-256 256S0 397.4 0 256S114.6 0 256 0S512 114.6 512 256zM256 272c39.8 0 72-32.2 72-72s-32.2-72-72-72s-72 32.2-72 72s32.2 72 72 72z" />
    </Svg>
  );
}

const SvgHome = (props) => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" {...props}>
      <Path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
    </Svg>
  );
}

const SvgChat = (props) => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" {...props}>
      <Path d="M208 352c114.9 0 208-78.8 208-176S322.9 0 208 0 0 78.8 0 176c0 38.6 14.7 74.3 39.6 103.4-3.5 9.4-8.7 17.7-14.2 24.7-4.8 6.2-9.7 11-13.3 14.3-1.8 1.6-3.3 2.9-4.3 3.7-.5.4-.9.7-1.1.8l-.2.2C1 327.2-1.4 334.4.8 340.9S9.1 352 16 352c21.8 0 43.8-5.6 62.1-12.5 9.2-3.5 17.8-7.4 25.3-11.4C134.1 343.3 169.8 352 208 352zm240-176c0 112.3-99.1 196.9-216.5 207 24.3 74.4 104.9 129 200.5 129 38.2 0 73.9-8.7 104.7-23.9 7.5 4 16 7.9 25.2 11.4 18.3 6.9 40.3 12.5 62.1 12.5 6.9 0 13.1-4.5 15.2-11.1 2.1-6.6-.2-13.8-5.8-17.9l-.2-.2c-.2-.2-.6-.4-1.1-.8-1-.8-2.5-2-4.3-3.7-3.6-3.3-8.5-8.1-13.3-14.3-5.5-7-10.7-15.4-14.2-24.7 24.9-29 39.6-64.7 39.6-103.4 0-92.8-84.9-168.9-192.6-175.5.4 5.1.6 10.3.6 15.5z" />
    </Svg>
  );
}

const SvgUser = (props) => {
   return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      clipRule="evenodd"
      viewBox="0 0 48 48"
      {...props}
      >
      <Path d="M11.469 31.103C11.009 31.037 10.52 31 10 31c-3.83 0-5.969 2.021-6.789 3.028a.99.99 0 0 0-.204.604l-.001.017C3 35.019 3 35.509 3 36a1 1 0 0 0 1 1h7.172A2.986 2.986 0 0 1 11 36c0-1.138 0-2.494.004-3.295 0-.57.163-1.125.465-1.602ZM34 37H14a.997.997 0 0 1-1-1c0-1.135 0-2.485.004-3.289v-.006c0-.23.08-.452.225-.63C14.47 30.658 18.22 27 24 27c6.542 0 9.827 3.651 10.832 5.028.111.169.168.36.168.555V36a.997.997 0 0 1-1 1Zm2.828 0H44a1 1 0 0 0 1-1v-1.369c0-.221-.073-.435-.207-.61C43.969 33.021 41.829 31 38 31c-.493 0-.958.033-1.396.093.259.453.396.967.396 1.492V36c0 .344-.059.682-.172 1ZM10 19c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5Zm28 0c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5Zm-14-8c-3.863 0-7 3.137-7 7s3.137 7 7 7 7-3.137 7-7-3.137-7-7-7Z" />
    </Svg>
  );
}

function SvgInfo(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
      <Path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0 0 114.6 0 256s114.6 256 256 256zm-40-176h24v-64h-24c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-80c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-144c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z" />
    </Svg>
  )
}

function SvgError(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
      <Path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7.2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8.2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24v112c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224c0-17.7-14.3-32-32-32s-32 14.3-32 32 14.3 32 32 32 32-14.3 32-32z" />
    </Svg>
  )
}

function SvgSuccess(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Path d="M243.8 339.8c-10.9 10.9-28.7 10.9-39.6 0l-64-64c-10.9-10.9-10.9-28.7 0-39.6 10.9-10.9 28.7-10.9 39.6 0l44.2 44.2 108.2-108.2c10.9-10.9 28.7-10.9 39.6 0 10.9 10.9 10.9 28.7 0 39.6l-128 128zM512 256c0 141.4-114.6 256-256 256S0 397.4 0 256 114.6 0 256 0s256 114.6 256 256zM256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48z" />
  </Svg>
  )
}

function  SvgCircleChevron(props) {
  return (
      <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
        <Path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256s114.6 256 256 256 256-114.6 256-256zM271 135c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-87 87 87 87c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L167 273c-9.4-9.4-9.4-24.6 0-33.9L271 135z" />
      </Svg>
    )
}

function SvgComment(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
      <Path d="M512 240c0 114.9-114.6 208-256 208-37.1 0-72.3-6.4-104.1-17.9-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9s-1.1-12.8 3.4-17.4l.3-.3c.3-.3.7-.7 1.3-1.4 1.1-1.2 2.8-3.1 4.9-5.7 4.1-5 9.6-12.4 15.2-21.6 10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240 0 125.1 114.6 32 256 32s256 93.1 256 208z" />
    </Svg>
  )
}

function SvgEnveloppe(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
      <Path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4l217.6 163.2c11.4 8.5 27 8.5 38.4 0l217.6-163.2c12.1-9.1 19.2-23.3 19.2-38.4 0-26.5-21.5-48-48-48H48zM0 176v208c0 35.3 28.7 64 64 64h384c35.3 0 64-28.7 64-64V176L294.4 339.2a63.9 63.9 0 01-76.8 0L0 176z" />
    </Svg>
  )
}

function SvgGear(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
      <Path d="M495.9 166.6c3.2 8.7.5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4l-55.6 17.8c-8.8 2.8-18.6.3-24.5-6.8-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4c-1.1-8.4-1.7-16.9-1.7-25.5s.6-17.1 1.7-25.4l-43.3-39.4c-6.9-6.2-9.6-15.9-6.4-24.6 4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2 5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8 8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336c44.2 0 80-35.8 80-80s-35.8-80-80-80-80 35.8-80 80 35.8 80 80 80z" />
    </Svg>
  )
}
module.exports = {SvgProfil, SvgHome, SvgChat,SvgUser,SvgArrow,SvgInfo,SvgError,SvgSuccess,SvgCircleChevron,SvgComment,SvgEnveloppe,SvgGear}


