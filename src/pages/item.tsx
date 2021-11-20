import { Reset } from 'styled-reset';
import styled from 'styled-components';

const Item = ({ title, client, due, count, amount, method, material }: any) => {
  return (
    <>
      <Reset />
      <Container>
        <Title>{title}</Title>
        <Client>{client}</Client>
        <Due>{due}까지 납기</Due>
        <TextBox>
          <Text>도면개수</Text>
          <Count>{count}개</Count>
        </TextBox>
        <TextBox>
          <Text>총 수량</Text>
          <Count>{amount}개</Count>
        </TextBox>
        <TextBox>
          <Text>가공방식</Text>
          <Count>{method}</Count>
        </TextBox>
        <TextBox>
          <Text>재료</Text>
          <Count>{material}</Count>
        </TextBox>
        <BntBox>
          <History>요청내역보기</History>
          <Chatting>채팅하기</Chatting>
        </BntBox>
      </Container>
    </>
  );
};

export default Item;

const Container = styled.div`
  position: static;
  width: 366px;
  height: 356px;
  left: 0px;
  top: 0px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px 16px;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 4px;

  :hover {
    border: 2px solid #2196f3;
    cursor: pointer;
  }
`;

const Title = styled.div`
  position: static;
  height: 24px;
  left: 0px;
  top: 0px;
  display: flex;
  align-items: center;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  color: #323d45;
`;

const Client = styled.div`
  display: flex;
  align-items: center;
  width: 51px;
  height: 20px;
  left: 16px;
  top: 52px;
  margin-bottom: 24px;
  color: #323d45;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
`;

const Due = styled.div`
  position: static;
  width: 330px;
  height: 20px;
  left: 0px;
  top: 0px;
  display: flex;
  align-items: center;
  padding-bottom: 16px;
  margin-bottom: 32px;
  line-height: 20px;
  color: #939fa5;
  border-bottom: 1px solid #e5e5e5;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
`;

const TextBox = styled.div`
  display: flex;
`;
const Text = styled.div`
  display: flex;
  align-items: center;
  height: 20px;
  width: 70px;
  margin-bottom: 8px;
  color: #323d45;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
`;

const Count = styled.div`
  height: 20px;
  margin-left: 32px;
  color: #323d45;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
`;

const BntBox = styled.div`
  display: flex;
`;

const History = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin-top: 32px;
  margin-right: 10px;
  padding: 6px 12px;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  background: #2196f3;
  border-radius: 4px;
  color: white;
`;

const Chatting = styled.div`
  margin-top: 32px;
  padding: 6px 12px;
  color: #2196f3;
  border: 1px solid#2196f3;
  border-radius: 4px;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
`;
