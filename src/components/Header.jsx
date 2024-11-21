import React from 'react'
import '../styles/mor.css'

const Header = () => {
  const openNav = () => {
    const sidebar = document.getElementById("mySidebar");
    const mainContent = document.getElementById("mainContent");

    sidebar.classList.toggle("open");
    mainContent.classList.toggle("shifted");
  };
  return (
     <>
     <nav className="navbar navbar-expand-lg navbar-light p-0">
  <div className="container-fluid py-1 justify-content-between d-flex">
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      onclick="openNav()"
    >
      <span className="navbar-toggler-icon" />
    </button>
       {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" onClick={openNav}>
          <span className="navbar-toggler-icon"></span>
        </button> */}
    <svg
      className="main-logo "
      viewBox="0 0 273 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width={273} height={37} fill="url(#pattern0)" />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <use
            xlinkHref="#image0_1_414"
            transform="matrix(0.00198059 0 0 0.0147059 -0.00693207 0)"
          />
        </pattern>
        <image
          id="image0_1_414"
          width={500}
          height={68}
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
    <div />
    <div
      className=" navbar-collapse ms-5 align-items-baseline"
      id="navbarTogglerDemo02"
    >
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 mt-2">
        <li className="nav-item">
          <a
            className="nav-link active"
            aria-current="page"
            href="./1CF_Main.html"
          >
            Home
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="./31Dashboard_Daily.html">
            Dashboard
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="./31Dashboard_Daily.html">
            Setup
          </a>
        </li>
      </ul>
      <div className="header-icons me-5">
        <ul className="d-flex gap-4">
          <li>
            <a href="">
              <svg
                width={16}
                height={19}
                viewBox="0 0 16 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.97341 0.333376C5.98226 0.333376 5.99112 0.333384 5.99998 0.333384L10.0266 0.333376C10.2369 0.333353 10.4417 0.333328 10.6152 0.347501C10.8057 0.363068 11.0304 0.399784 11.2567 0.515034C11.5703 0.674826 11.8252 0.929793 11.985 1.24339C12.1003 1.46958 12.137 1.69436 12.1525 1.88486C12.1558 1.92397 12.1582 1.96468 12.1601 2.00668C12.4894 2.01731 12.7714 2.04452 13.0294 2.11363C14.1797 2.42185 15.0782 3.32034 15.3864 4.47065C15.5007 4.89703 15.5004 5.38924 15.5 6.05207C15.5 6.08973 15.5 6.12793 15.5 6.16672V13.8678C15.5 14.5386 15.5 15.0922 15.4632 15.5432C15.4249 16.0116 15.3428 16.4422 15.1367 16.8467C14.8171 17.4739 14.3072 17.9838 13.6799 18.3034C13.2755 18.5095 12.8449 18.5916 12.3765 18.6299C11.9255 18.6667 11.3719 18.6667 10.7011 18.6667H5.29888C4.62808 18.6667 4.07446 18.6667 3.62347 18.6299C3.15505 18.5916 2.72447 18.5095 2.32002 18.3034C1.69281 17.9838 1.18287 17.4739 0.863299 16.8467C0.657224 16.4422 0.575082 16.0116 0.536816 15.5432C0.499966 15.0922 0.499974 14.5386 0.499982 13.8678V6.16672C0.499982 6.12793 0.499966 6.08973 0.499949 6.05206C0.499582 5.38924 0.499316 4.89703 0.613566 4.47065C0.921791 3.32034 1.82028 2.42185 2.97059 2.11363C3.22852 2.04452 3.51054 2.01731 3.83986 2.00668C3.84177 1.96468 3.84424 1.92397 3.84744 1.88486C3.86301 1.69436 3.89972 1.46958 4.01497 1.24339C4.17477 0.929793 4.42973 0.674826 4.74333 0.515034C4.96952 0.399784 5.1943 0.363068 5.38479 0.347501C5.55826 0.333328 5.76308 0.333353 5.97341 0.333376ZM3.84055 3.67468C3.62131 3.68227 3.50205 3.69668 3.40196 3.7235C2.8268 3.87762 2.37756 4.32686 2.22344 4.90202C2.17381 5.08725 2.16665 5.33808 2.16665 6.16672V13.8334C2.16665 14.5472 2.1673 15.0325 2.19795 15.4075C2.2278 15.7729 2.2819 15.9597 2.34831 16.09C2.5081 16.4036 2.76307 16.6586 3.07667 16.8184C3.207 16.8848 3.39384 16.9389 3.75918 16.9688C4.13426 16.9994 4.6195 17 5.33332 17H10.6667C11.3805 17 11.8657 16.9994 12.2408 16.9688C12.6062 16.9389 12.793 16.8848 12.9233 16.8184C13.2369 16.6586 13.4918 16.4036 13.6517 16.09C13.7181 15.9597 13.7722 15.7729 13.802 15.4075C13.8327 15.0325 13.8333 14.5472 13.8333 13.8334V6.16672C13.8333 5.33808 13.8262 5.08725 13.7765 4.90202C13.6224 4.32686 13.1732 3.87762 12.598 3.7235C12.4979 3.69668 12.3787 3.68227 12.1594 3.67468C12.1576 3.71153 12.1553 3.74734 12.1525 3.78191C12.137 3.9724 12.1003 4.19718 11.985 4.42337C11.8252 4.73697 11.5703 4.99193 11.2567 5.15173C11.0304 5.26698 10.8057 5.30369 10.6152 5.31926C10.4417 5.33343 10.2369 5.33341 10.0266 5.33338H5.99998C5.99112 5.33338 5.98226 5.33338 5.97341 5.33338C5.76308 5.33341 5.55826 5.33343 5.38479 5.31926C5.1943 5.30369 4.96952 5.26698 4.74333 5.15173C4.42973 4.99193 4.17477 4.73697 4.01497 4.42337C3.89972 4.19718 3.86301 3.9724 3.84744 3.78191C3.84462 3.74734 3.84236 3.71153 3.84055 3.67468ZM10.5 2.50005C10.5 2.25294 10.4993 2.11773 10.4914 2.02058C10.4911 2.01671 10.4908 2.01304 10.4904 2.00958C10.487 2.00927 10.4833 2.00895 10.4794 2.00863C10.3823 2.00069 10.2471 2.00005 10 2.00005H5.99998C5.75288 2.00005 5.61767 2.00069 5.52052 2.00863C5.51665 2.00895 5.51298 2.00927 5.50952 2.00958C5.50921 2.01304 5.50889 2.01671 5.50857 2.02058C5.50063 2.11773 5.49998 2.25294 5.49998 2.50005V3.16672C5.49998 3.41382 5.50063 3.54903 5.50857 3.64618C5.50889 3.65005 5.50921 3.65372 5.50952 3.65718C5.51298 3.65749 5.51665 3.65781 5.52052 3.65813C5.61767 3.66607 5.75288 3.66672 5.99998 3.66672H10C10.2471 3.66672 10.3823 3.66607 10.4794 3.65813C10.4833 3.65781 10.487 3.65749 10.4904 3.65718C10.4908 3.65372 10.4911 3.65005 10.4914 3.64618C10.4993 3.54903 10.5 3.41382 10.5 3.16672V2.50005ZM11.5059 9.32746C11.8313 9.65288 11.8313 10.1805 11.5059 10.506L7.75592 14.256C7.43051 14.5814 6.90284 14.5814 6.57742 14.256L4.91073 12.5893C4.58529 12.2639 4.58529 11.7362 4.91073 11.4108C5.23617 11.0854 5.76381 11.0854 6.08924 11.4108L7.16667 12.4882L10.3274 9.32746C10.6528 9.00204 11.1805 9.00204 11.5059 9.32746Z"
                  fill="#8B0203"
                />
              </svg>
            </a>
          </li>
          <li>
            <a href="">
              <svg
                width={16}
                height={20}
                viewBox="0 0 16 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.99976 2.50004C7.30942 2.50004 6.74976 3.05968 6.74976 3.75004C6.74976 3.93427 6.78934 4.10877 6.86067 4.26597C7.23409 4.20027 7.61559 4.16671 7.99976 4.16671C8.38401 4.16671 8.76551 4.20027 9.13892 4.26597C9.21026 4.10877 9.24976 3.93428 9.24976 3.75004C9.24976 3.05968 8.69017 2.50004 7.99976 2.50004ZM10.7337 4.76793C10.8518 4.45093 10.9164 4.10786 10.9164 3.75004C10.9164 2.13921 9.61059 0.833374 7.99976 0.833374C6.38892 0.833374 5.08312 2.13921 5.08312 3.75004C5.08312 4.10786 5.14778 4.45093 5.26589 4.76793C4.77763 4.99692 4.32307 5.28886 3.91847 5.63951C2.81462 6.59618 2.16646 7.92147 2.16646 9.33337C2.16646 11.0898 1.73291 12.3333 1.22252 13.1965L1.21402 13.2109C0.885857 13.7658 0.629557 14.1993 0.457649 14.5105C0.371716 14.666 0.296107 14.8101 0.241132 14.9336C0.213874 14.9948 0.183807 15.0683 0.160374 15.1464C0.142907 15.2045 0.0999156 15.3555 0.117791 15.5383C0.127607 15.6387 0.150132 15.8381 0.266241 16.0417C0.382357 16.2452 0.542549 16.3661 0.623982 16.4257C0.756682 16.5227 0.889482 16.5644 0.955616 16.5826C1.03367 16.6043 1.10951 16.617 1.17239 16.6255C1.29812 16.6423 1.44453 16.6509 1.59712 16.6561C1.90132 16.6667 2.32665 16.6667 2.86258 16.6667H4.77146C5.14151 18.1044 6.44659 19.1667 7.99976 19.1667C9.55301 19.1667 10.8581 18.1044 11.2281 16.6667H13.137C13.6729 16.6667 14.0983 16.6667 14.4024 16.6561C14.555 16.6509 14.7014 16.6423 14.8272 16.6255C14.8901 16.617 14.9659 16.6043 15.0439 16.5826C15.1101 16.5644 15.2429 16.5227 15.3756 16.4257C15.457 16.3661 15.6173 16.2452 15.7333 16.0417C15.8494 15.8381 15.872 15.6387 15.8818 15.5383C15.8997 15.3555 15.8567 15.2045 15.8392 15.1464C15.8158 15.0683 15.7857 14.9948 15.7584 14.9336C15.7035 14.8101 15.6278 14.666 15.5419 14.5105C15.37 14.1993 15.1137 13.7658 14.7855 13.2107L14.7771 13.1965C14.2667 12.3333 13.8331 11.0898 13.8331 9.33337C13.8331 7.92147 13.1849 6.59618 12.0811 5.63951C11.6765 5.28886 11.2219 4.99692 10.7337 4.76793ZM9.26159 5.99844C9.27217 6.00154 9.28276 6.00442 9.29342 6.00709C9.93459 6.18385 10.5174 6.48984 10.9895 6.89898C11.761 7.56762 12.1664 8.44671 12.1664 9.33337C12.1664 11.38 12.676 12.9177 13.3424 14.0448C13.5717 14.4325 13.7574 14.7467 13.9028 14.9984C13.6867 15 13.4273 15 13.1179 15H2.88161C2.57232 15 2.3129 15 2.09683 14.9984C2.24214 14.7467 2.42793 14.4325 2.65716 14.0448C3.32356 12.9177 3.83312 11.38 3.83312 9.33337C3.83312 8.44671 4.23853 7.56762 5.01003 6.89898C5.48212 6.48984 6.06498 6.18385 6.70617 6.00709C6.71684 6.00442 6.72742 6.00154 6.73801 5.99845C7.14034 5.89053 7.56526 5.83337 7.99976 5.83337C8.43434 5.83337 8.85917 5.89052 9.26159 5.99844ZM6.55609 16.6667C6.84426 17.1649 7.38292 17.5 7.99976 17.5C8.61667 17.5 9.15534 17.1649 9.44351 16.6667H6.55609Z"
                  fill="#8B0203"
                />
              </svg>
            </a>
          </li>
          <li>
            <a href="">
              <svg
                width={18}
                height={18}
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.46518 0.166504H12.5335C13.2043 0.166504 13.7585 0.166504 14.2085 0.20317C14.6777 0.241504 15.1085 0.324004 15.5127 0.529837C16.1399 0.84941 16.6498 1.35932 16.9693 1.9865C17.1752 2.39067 17.2577 2.8215 17.296 3.28984C17.3327 3.7415 17.3327 4.29484 17.3327 4.96484V9.77817C17.3327 10.3365 17.3327 10.7973 17.3077 11.174C17.2802 11.5657 17.2235 11.9273 17.0793 12.2757C16.9118 12.6801 16.6663 13.0476 16.3567 13.3572C16.0472 13.6668 15.6797 13.9123 15.2752 14.0798C14.9268 14.224 14.5652 14.2807 14.1735 14.3073C13.7968 14.3332 13.336 14.3332 12.7777 14.3332H12.7493C12.3018 14.3332 12.2135 14.3382 12.141 14.3557C12.0154 14.3854 11.8985 14.4439 11.7993 14.5265C11.741 14.574 11.6843 14.6423 11.416 14.9998L10.1852 16.6415C10.1077 16.7448 10.0193 16.8623 9.93518 16.9565C9.80392 17.109 9.63825 17.2282 9.45185 17.304C9.16052 17.4173 8.83734 17.4173 8.54602 17.304C8.35992 17.228 8.19454 17.1089 8.06352 16.9565C7.97935 16.8623 7.89102 16.7448 7.81352 16.6407L6.58268 14.9998C6.31435 14.6415 6.25768 14.5748 6.19935 14.5265C6.10022 14.4439 5.98326 14.3854 5.85768 14.3557C5.78518 14.339 5.69685 14.3332 5.24935 14.3332H5.22102C4.66268 14.3332 4.20185 14.3332 3.82435 14.3082C3.43352 14.2807 3.07185 14.224 2.72435 14.0798C2.31973 13.9124 1.95206 13.6669 1.64235 13.3573C1.33264 13.0478 1.08696 12.6802 0.919349 12.2757C0.775182 11.9273 0.718516 11.5657 0.691849 11.1748C0.666016 10.7973 0.666016 10.3365 0.666016 9.77817V4.9665C0.666016 4.29567 0.666016 3.7415 0.702682 3.2915C0.741016 2.82234 0.823516 2.3915 1.02935 1.98734C1.34892 1.36016 1.85884 0.850244 2.48602 0.530671C2.89018 0.324837 3.32102 0.242337 3.78935 0.204004C4.24102 0.166504 4.79518 0.166504 5.46518 0.166504ZM3.92435 1.86484C3.55935 1.894 3.37185 1.94817 3.24185 2.01484C2.92826 2.17462 2.6733 2.42958 2.51352 2.74317C2.44685 2.87317 2.39268 3.05984 2.36352 3.42567C2.33268 3.80067 2.33268 4.28567 2.33268 4.99984V9.74984C2.33268 10.344 2.33268 10.7473 2.35435 11.0607C2.37518 11.3673 2.41268 11.5265 2.45935 11.6373C2.54311 11.8397 2.66593 12.0235 2.82079 12.1784C2.97564 12.3333 3.1595 12.4561 3.36185 12.5398C3.47268 12.5857 3.63185 12.6232 3.93852 12.6448C4.25185 12.6665 4.65518 12.6665 5.24935 12.6665H5.31935C5.65685 12.6665 5.95435 12.6665 6.24018 12.7332C6.61796 12.8225 6.96975 12.9985 7.26768 13.2473C7.49268 13.4357 7.67185 13.6732 7.87435 13.944L7.91602 13.9998L8.99935 15.444L10.0827 13.9998L10.1243 13.944C10.3268 13.6732 10.5052 13.4357 10.731 13.2473C11.029 12.9985 11.3807 12.8225 11.7585 12.7332C12.0443 12.6665 12.3418 12.6665 12.6793 12.6665H12.7493C13.3435 12.6665 13.7468 12.6665 14.0602 12.6448C14.3668 12.624 14.526 12.5865 14.6368 12.5398C14.8392 12.4561 15.0231 12.3333 15.1779 12.1784C15.3328 12.0235 15.4556 11.8397 15.5393 11.6373C15.5852 11.5265 15.6227 11.3673 15.6443 11.0607C15.666 10.7473 15.666 10.344 15.666 9.74984V4.99984C15.666 4.28567 15.666 3.80067 15.6343 3.42567C15.6052 3.06067 15.551 2.87317 15.4843 2.74317C15.3246 2.42958 15.0696 2.17462 14.756 2.01484C14.626 1.94817 14.4393 1.894 14.0735 1.86484C13.6985 1.83317 13.2135 1.83317 12.4993 1.83317H5.49935C4.78518 1.83317 4.29935 1.83317 3.92435 1.86484ZM8.16602 4.33317C8.16602 4.11216 8.25381 3.9002 8.41009 3.74392C8.56637 3.58763 8.77833 3.49984 8.99935 3.49984H9.00768C9.2287 3.49984 9.44066 3.58763 9.59694 3.74392C9.75322 3.9002 9.84102 4.11216 9.84102 4.33317C9.84102 4.55418 9.75322 4.76615 9.59694 4.92243C9.44066 5.07871 9.2287 5.1665 9.00768 5.1665H8.99935C8.77833 5.1665 8.56637 5.07871 8.41009 4.92243C8.25381 4.76615 8.16602 4.55418 8.16602 4.33317ZM8.99935 6.4165C9.22036 6.4165 9.43232 6.5043 9.5886 6.66058C9.74488 6.81686 9.83268 7.02882 9.83268 7.24984V10.1665C9.83268 10.3875 9.74488 10.5995 9.5886 10.7558C9.43232 10.912 9.22036 10.9998 8.99935 10.9998C8.77833 10.9998 8.56637 10.912 8.41009 10.7558C8.25381 10.5995 8.16602 10.3875 8.16602 10.1665V7.24984C8.16602 7.02882 8.25381 6.81686 8.41009 6.66058C8.56637 6.5043 8.77833 6.4165 8.99935 6.4165Z"
                  fill="#8B0203"
                />
              </svg>
            </a>
          </li>
          <li>
            <a href="">
              <svg
                width={18}
                height={17}
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.666016 8.49984C0.666016 3.89746 4.39697 0.166504 8.99935 0.166504C13.6017 0.166504 17.3327 3.89746 17.3327 8.49984C17.3327 13.1022 13.6017 16.8332 8.99935 16.8332C7.89243 16.8332 6.83393 16.6169 5.86536 16.2235C5.77787 16.188 5.72737 16.1676 5.69007 16.1536C5.68567 16.1519 5.68183 16.1505 5.67856 16.1493L5.67459 16.1498C5.64384 16.154 5.60192 16.1609 5.52189 16.1743L2.55698 16.6684C2.54907 16.6698 2.54108 16.6711 2.53305 16.6724C2.39919 16.6948 2.24944 16.7198 2.11938 16.7296C1.97757 16.7403 1.75195 16.744 1.51352 16.6418C1.21876 16.5153 0.983882 16.2804 0.857457 15.9857C0.755191 15.7473 0.758916 15.5216 0.769624 15.3798C0.779441 15.2498 0.804449 15.1 0.826799 14.9662C0.828141 14.9581 0.829474 14.9501 0.830791 14.9422L1.32494 11.9773C1.33828 11.8973 1.34518 11.8553 1.34935 11.8246L1.34987 11.8206C1.34868 11.8173 1.34727 11.8135 1.34562 11.8091C1.33162 11.7718 1.31117 11.7213 1.27565 11.6338C0.882282 10.6653 0.666016 9.60675 0.666016 8.49984ZM8.99935 1.83317C5.31745 1.83317 2.33268 4.81794 2.33268 8.49984C2.33268 9.38817 2.50597 10.2339 2.81982 11.0067C2.82478 11.0189 2.82989 11.0314 2.8351 11.0442C2.88598 11.1688 2.94649 11.3169 2.9775 11.4553C3.00567 11.581 3.01784 11.6908 3.01786 11.8196C3.01787 11.961 2.99377 12.1038 2.97433 12.2192C2.97248 12.2302 2.97067 12.2408 2.96893 12.2513L2.51314 14.986L5.24789 14.5303C5.25833 14.5285 5.26906 14.5267 5.28002 14.5248C5.39532 14.5054 5.53822 14.4813 5.67957 14.4813C5.80837 14.4813 5.91821 14.4935 6.04388 14.5217C6.18224 14.5527 6.33042 14.6132 6.45502 14.6641C6.46777 14.6693 6.48027 14.6744 6.49249 14.6793C7.26527 14.9932 8.11102 15.1665 8.99935 15.1665C12.6813 15.1665 15.666 12.1818 15.666 8.49984C15.666 4.81794 12.6813 1.83317 8.99935 1.83317ZM3.99935 8.49984C3.99935 7.8095 4.55899 7.24984 5.24935 7.24984C5.93971 7.24984 6.49935 7.8095 6.49935 8.49984C6.49935 9.19017 5.93971 9.74984 5.24935 9.74984C4.55899 9.74984 3.99935 9.19017 3.99935 8.49984ZM7.74935 8.49984C7.74935 7.8095 8.30902 7.24984 8.99935 7.24984C9.68968 7.24984 10.2493 7.8095 10.2493 8.49984C10.2493 9.19017 9.68968 9.74984 8.99935 9.74984C8.30902 9.74984 7.74935 9.19017 7.74935 8.49984ZM11.4993 8.49984C11.4993 7.8095 12.059 7.24984 12.7493 7.24984C13.4397 7.24984 13.9993 7.8095 13.9993 8.49984C13.9993 9.19017 13.4397 9.74984 12.7493 9.74984C12.059 9.74984 11.4993 9.19017 11.4993 8.49984Z"
                  fill="#8B0203"
                />
              </svg>
            </a>
          </li>
          <li>
            <a href="">
              <svg
                width={18}
                height={18}
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.9618 14.0544C15.5829 13.1567 15.0329 12.3414 14.3426 11.6537C13.6544 10.9641 12.8392 10.4142 11.942 10.0345C11.9339 10.0305 11.9259 10.0285 11.9179 10.0245C13.1694 9.12047 13.983 7.64792 13.983 5.98654C13.983 3.23431 11.7531 1.00439 9.00089 1.00439C6.24866 1.00439 4.01874 3.23431 4.01874 5.98654C4.01874 7.64792 4.83236 9.12047 6.08392 10.0265C6.07589 10.0305 6.06785 10.0325 6.05982 10.0365C5.15982 10.4162 4.35223 10.9606 3.65915 11.6557C2.9695 12.3439 2.41965 13.1592 2.03995 14.0564C1.66694 14.9348 1.46576 15.8766 1.44732 16.8307C1.44678 16.8522 1.45054 16.8735 1.45838 16.8935C1.46621 16.9134 1.47797 16.9316 1.49294 16.947C1.50792 16.9623 1.52582 16.9745 1.54558 16.9829C1.56535 16.9912 1.58658 16.9955 1.60803 16.9955H2.81339C2.90178 16.9955 2.97209 16.9252 2.9741 16.8388C3.01428 15.2879 3.63705 13.8354 4.73794 12.7345C5.877 11.5955 7.38973 10.9687 9.00089 10.9687C10.612 10.9687 12.1248 11.5955 13.2638 12.7345C14.3647 13.8354 14.9875 15.2879 15.0277 16.8388C15.0297 16.9272 15.1 16.9955 15.1884 16.9955H16.3937C16.4152 16.9955 16.4364 16.9912 16.4562 16.9829C16.476 16.9745 16.4939 16.9623 16.5088 16.947C16.5238 16.9316 16.5356 16.9134 16.5434 16.8935C16.5512 16.8735 16.555 16.8522 16.5545 16.8307C16.5344 15.8705 16.3355 14.9363 15.9618 14.0544ZM9.00089 9.44189C8.07879 9.44189 7.21093 9.0823 6.55803 8.42939C5.90513 7.77649 5.54553 6.90864 5.54553 5.98654C5.54553 5.06444 5.90513 4.19658 6.55803 3.54368C7.21093 2.89078 8.07879 2.53118 9.00089 2.53118C9.92299 2.53118 10.7908 2.89078 11.4437 3.54368C12.0966 4.19658 12.4562 5.06444 12.4562 5.98654C12.4562 6.90864 12.0966 7.77649 11.4437 8.42939C10.7908 9.0823 9.92299 9.44189 9.00089 9.44189Z"
                  fill="#8B0203"
                />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</nav>

     </>
  )
}

export default Header