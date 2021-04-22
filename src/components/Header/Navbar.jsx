import React from "react";
import { isNil } from "lodash";
import { withRouter } from "react-router";
import clsx from "clsx";
import { useRecoilState } from "recoil";
import { FiLogOut } from "react-icons/fi";
import { useGetUserProfile } from "../../hooks";
import { userProfileData } from "../../recoils/profile";

import "./index.css";

function NavBar(props) {
  const { data } = useGetUserProfile();
  const [profileData, setUserProfileData] = useRecoilState(userProfileData);

  React.useEffect(() => {
    if (!isNil(data)) {
      const { user } = data;
      setUserProfileData(user);
    }
  }, [data]);

  const userInitial = React.useMemo(() => {
    if (!isNil(data)) {
      const {
        user: { full_name },
      } = data;
      const fullName = full_name?.split(" ");
      return fullName.shift().charAt(0) + fullName.pop().charAt(0);
    }
  }, [data]);

  const handleLogout = () => {
    localStorage.removeItem("token");
  };
  return (
    <div className="header">
      <div className="wrapper">
        <div className="header-left">
          <div className="pinned-instruments">
            <div className="instrument-widget">
              <span
                tooltip-pos="down"
                className="tradingsymbol link-chart"
                data-balloon="Open chart"
                data-balloon-pos="down"
              >
                NIFTY 50
              </span>{" "}
              <span className="wrap">
                <span className="last-price down">14549.40</span>{" "}
                <span className="price-change dim">
                  <span className="change-percent dim">
                    -1.79 <span className="text-xxsmall">%</span>
                  </span>
                </span>
              </span>
            </div>
            <div className="instrument-widget">
              <span
                tooltip-pos="down"
                className="tradingsymbol link-chart"
                data-balloon="Open chart"
                data-balloon-pos="down"
              >
                SENSEX
              </span>{" "}
              <span className="wrap">
                <span className="last-price down">49180.31</span>{" "}
                <span className="price-change dim">
                  <span className="change-percent dim">
                    -1.74 <span className="text-xxsmall">%</span>
                  </span>
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className="header-right">
          <a href="/" className="logo">
            <img
              src="https://kite.zerodha.com/static/images/kite-logo.svg"
              alt="Kite logo"
            />
          </a>
          <div className="app-nav">
            <a
              href="/dashboard"
              className={clsx(
                props.location.pathname === "/dashboard" &&
                  "orders-nav-item router-link-exact-active router-link-active"
              )}
            >
              <span>Dashboard</span>
            </a>{" "}
            <a
              href="/orders"
              className={clsx(
                props.location.pathname === "/orders" &&
                  "orders-nav-item router-link-exact-active router-link-active"
              )}
              aria-current="page"
            >
              <span>Orders</span>
            </a>{" "}
            <a
              href="/holdings"
              className={clsx(
                props.location.pathname === "/holdings" &&
                  "orders-nav-item router-link-exact-active router-link-active"
              )}
            >
              <span>Holdings</span>
            </a>{" "}
            <a
              href="/positions"
              className={clsx(
                props.location.pathname === "/positions" &&
                  "orders-nav-item router-link-exact-active router-link-active"
              )}
            >
              <span>Positions</span>
            </a>{" "}
            <a
              href="/funds"
              className={clsx(
                props.location.pathname === "/funds" &&
                  "orders-nav-item router-link-exact-active router-link-active"
              )}
            >
              <span>Funds</span>
            </a>{" "}
            <a
              href="/apps"
              className={clsx(
                props.location.pathname === "/apps" &&
                  "orders-nav-item router-link-exact-active router-link-active"
              )}
            >
              <span>Apps</span>
            </a>
          </div>
          <div className="right-nav">
            <div className="user-nav perspective">
              <a href="/" className="dropdown-label">
                <div id="avatar-43">
                  <div
                    className="avatar"
                    style={{
                      width: "25px",
                      height: "25px",
                      borderRadius: "50%",
                      textAlign: "center",
                      verticalAlign: "middle",
                      backgroundColor: "rgba(156, 39, 176, 0.1)",
                      fontSize: "9px",
                      fontWeight: "300px",
                      lineHeight: "26px",
                    }}
                  >
                    <div className="popover-wrapper">
                      <div>
                        <span style={{ color: "rgb(156, 39, 176)" }}>
                          {userInitial}
                        </span>
                      </div>
                      <div className="popover-content">
                        <span
                          style={{
                            color: "#444444",
                            fontSize: "16px",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          {profileData?.full_name}
                        </span>
                        <span style={{ color: "#0c0808", fontSize: "13px" }}>
                          {profileData?.email}
                        </span>
                        <hr />
                        <div
                          style={{ color: "#0c0808" }}
                          onClick={handleLogout}
                        >
                          <FiLogOut fontSize="16px" />
                          <span style={{ fontSize: "14px", marginLeft: "5px" }}>
                            logout
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(NavBar);
