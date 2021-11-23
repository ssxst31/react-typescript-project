import { Reset } from 'styled-reset';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding } from '@fortawesome/free-regular-svg-icons';

const Navbar = () => {
  return (
    <>
      <Reset />
      <Nav>
        <Title>CPA 파트너스</Title>
        <UserInfo>
          <FontAwesomeIcon icon={faBuilding} className="icon" />
          <Name>A 가공업체</Name>
          <LogoutBnt>로그아웃</LogoutBnt>
        </UserInfo>
      </Nav>
    </>
  );
};

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  height: 70px;
  padding: 25px 40px;
  background: #1565c0;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.24);
`;

const Title = styled.div`
  font-size: 20px;
  color: white;
  font-weight: 700;
`;

const UserInfo = styled.div`
  position: absolute;
  right: 40px;
  top: 25px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 208.67px;
  height: 20px;

  .icon {
    margin-right: 5px;
    margin-bottom: 3px;
    font-size: 13px;
    color: white;
  }
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #ffffff;
  line-height: 20px;
`;

const LogoutBnt = styled.div`
  margin-left: 35px;
  padding-left: 35px;
  border-left: #ffffff 2px solid;
  font-size: 14px;
  color: white;
`;

export default Navbar;
