import React from "react";
import { Menu, Dropdown, Button, InputNumber, Radio } from "antd";
import { useRecoilState } from "recoil";
import { FiSettings } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import AddedSymbolList from "./SymbolList/AddedSymbolList";
import { useAddFunds } from "../../hooks";
import { userProfileData } from "../../recoils/profile";
import { useGetAllSymbols, useGetAllUserAddedSymbols } from "../../hooks";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

function SearchComponent() {
  const { data: getAllSymbols } = useGetAllSymbols();
  const { data: getAllUserAddedSymbols } = useGetAllUserAddedSymbols();
  const [isSymbolListOpen, setIsSymbolListOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState(undefined);
  const [value, setValue] = React.useState(0);
  const [updatedProfile, setUpdatedProfile] = useRecoilState(userProfileData);
  const { mutate, data, isLoading } = useAddFunds(value);

  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    if (data) {
      setUpdatedProfile(data.user);
    }
  }, [data]);

  const handleAddFunds = async () => {
    if (value > 0 && value !== "") {
      mutate(value);
    } else {
      return;
    }
    setShow(false);
    setValue(0);
  };

  const handleVisibility = (show) => {
    setShow(show);
  };

  const menuItems = (
    <Menu style={{ width: 200, paddingLeft: "20px" }}>
      <Menu.Item>
        <span className="dim">Change</span>{" "}
        <span
          className="help"
          data-balloon="Price change can be either calculated based on previous close price or day open price."
          data-balloon-pos="up"
          data-balloon-length="large"
        >
          <span className="icon icon-info"></span>
        </span>
      </Menu.Item>
      <Menu.Item>
        <Radio>
          <label for="radio-240" className="su-radio-label">
            Open price
          </label>
        </Radio>
      </Menu.Item>
      <Menu.Item>
        <Radio>
          <label for="radio-240" className="su-radio-label">
            Close price
          </label>
        </Radio>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <span className="dim">Change Format</span>
      </Menu.Item>
      <Menu.Item>
        <label for="radio-243" className="su-radio-label">
          Percentage
        </label>
      </Menu.Item>
      <Menu.Item>
        <label for="radio-243" className="su-radio-label">
          absolute
        </label>
      </Menu.Item>
      <Menu.Item>
        <InputNumber
          min={1}
          defaultValue={value}
          onChange={(value) => setValue(value)}
        />
      </Menu.Item>
      <Menu.Item>
        <Button type="primary" size={"default"} onClick={handleAddFunds}>
          Add Funds
        </Button>
      </Menu.Item>
    </Menu>
  );
  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value);
    setIsSymbolListOpen(true);
  };

  const filteredSymbolData = React.useMemo(() => {
    if (searchQuery && getAllSymbols) {
      const query = searchQuery.toUpperCase();
      if (searchQuery === " ") return getAllSymbols?.data;
      if (searchQuery !== " " || searchQuery !== undefined) {
        return getAllSymbols?.data.filter((i) => i.Description.includes(query));
      }
      return getAllSymbols?.data;
    }
  }, [searchQuery, getAllSymbols]);
  return (
    <div className="marketwatch-sidebar marketwatch-wrap">
      <div className="omnisearch-wrap">
        <span className="icon-search">
          <FaSearch />
        </span>
        <div className="omnisearch">
          <div className="search">
            <input
              type="text"
              id="search-input"
              placeholder="Search eg: infy bse, nifty fut weekly, gold mcx"
              autoComplete="off"
              className="search-input-field"
              onChange={(e) => handleSearchInput(e)}
            />
            <span className="counts">
              {getAllUserAddedSymbols?.data?.length} /{" "}
              {getAllSymbols?.data?.length}
            </span>
          </div>
        </div>
      </div>
      {filteredSymbolData !== undefined && isSymbolListOpen ? (
        <div className="instruments">
          <div className="vddl-list list-flat">
            <AddedSymbolList
              getAllUserAddedSymbols={filteredSymbolData}
              isUserAddedSymbolList={false}
              isUserSymbolList={false}
            />
          </div>
        </div>
      ) : (
        <div className="instruments">
          <div className="vddl-list list-flat">
            <AddedSymbolList
              getAllUserAddedSymbols={getAllUserAddedSymbols?.data}
              isUserAddedSymbolList={true}
              isUserSymbolList={true}
            />
          </div>
        </div>
      )}
      <ul className="marketwatch-selector list-flat">
        <li
          className="block"
          style={{ paddingBottom: "3px", paddingRight: "20px", float: "right" }}
        >
          <Dropdown
            overlay={menuItems}
            trigger={["click"]}
            placement="topCenter"
            onVisibleChange={handleVisibility}
            visible={show}
          >
            <FiSettings color="grey" />
          </Dropdown>
        </li>
      </ul>
    </div>
  );
}

export default SearchComponent;
