import { useState, useEffect } from 'react';
import { Reset } from 'styled-reset';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import Item from './item';

const Main = () => {
  const [count, setCount] = useState<any>([]);
  const [plus, setPlus] = useState<any>([false, false]);
  useEffect(() => {
    fetch('/data/requests.json', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        setCount(data.requests);
      });
  }, []);
  return (
    <>
      <Reset />
      <Container>
        <TextBox>
          <Title>들어온 요청</Title>
          <Content>파트너님에게 딱 알맞는 요청서를 찾아보세요.</Content>
        </TextBox>
        <SelectBox>
          <ProcessingSelect>
            <BoxText>가공방식</BoxText>
            <FontAwesomeIcon icon={faSortDown} className="icon" />
          </ProcessingSelect>
          <MaterialSelect>
            <BoxText>재료</BoxText>
            <FontAwesomeIcon icon={faSortDown} className="icon" />
          </MaterialSelect>
          {plus[0] && (
            <ProcessingPlus>
              {['밀링', '선박'].map((item: any) => {
                return (
                  <Checkbox key={item.toString()}>
                    <Input type="checkbox" />
                    <CheckText>{item}</CheckText>
                  </Checkbox>
                );
              })}
            </ProcessingPlus>
          )}
          {plus[1] && (
            <MaterialPlus>
              {['알루미늄', '탄소강', '구리', '합금강', '강철'].map(
                (item: any) => {
                  return (
                    <Checkbox key={item.toString()}>
                      <Input type="checkbox" />
                      <CheckText>{item}</CheckText>
                    </Checkbox>
                  );
                },
              )}
            </MaterialPlus>
          )}
        </SelectBox>
        <Boxlist>
          {count?.map((item: any) => {
            return (
              <Item
                title={item.title}
                key={item.id}
                client={item.client}
                due={item.due}
                count={item.count}
                amount={item.amount}
                method={item.method}
                material={item.material}
                status={item.status}
              />
            );
          })}
        </Boxlist>
      </Container>
    </>
  );
};

export default Main;

const Container = styled.div`
  margin: 50px 100px;
`;

const ProcessingPlus = styled.div`
  position: absolute;
  top: 35px;
  border: 1px solid #939fa5;
  border-radius: 4px;
  width: 110px;
  z-index: 5;
  background-color: white;
  padding: 12px 7px;
`;

const CheckText = styled.div`
  font-size: 14px;
  line-height: 20px;
  margin-top: 2px;
`;
const MaterialPlus = styled.div`
  position: absolute;
  top: 35px;
  left: 110px;
  border: 1px solid #939fa5;
  border-radius: 4px;
  width: 110px;
  z-index: 5;
  background-color: white;
  padding: 12px 7px;
`;

const Checkbox = styled.div`
  display: flex;
  align-content: center;
  padding: 2px 0;
`;
const Input = styled.input`
  margin-right: 10px;
  width: 18px;
  height: 18px;
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #323d45;
  line-height: 32px;
`;
const Content = styled.div`
  margin-bottom: 30px;
  color: #323d45;
  font-size: 16px;
  line-height: 24px;
`;
const TextBox = styled.div`
  position: absolute;
  width: 284px;
  height: 56px;
  left: 155px;
  top: 110px;
`;

const SelectBox = styled.div`
  position: absolute;
  left: 155px;
  top: 198px;
  display: flex;
`;

const ProcessingSelect = styled.div`
  width: 98px;
  height: 32px;
  margin-right: 10px;
  margin-bottom: 30px;
  border-radius: 4px;
  padding: 4px 12px;
  border: 1px solid #939fa5;
  display: flex;
  justify-content: space-between;

  .icon {
    color: #939fa5;
  }
  :hover {
    border: 1px solid #2196f3;
    cursor: pointer;
  }

  :focus {
    outline: none;
  }
`;
const BoxText = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  /* identical to box height */

  display: flex;
  align-items: center;

  /* Gray / 900 (default) */

  color: #323d45;
`;

const MaterialSelect = styled.div`
  width: 76px;
  height: 32px;
  padding: 4px 12px;
  border-radius: 4px;
  border: 1px solid #939fa5;
  display: flex;
  justify-content: space-between;

  .icon {
    color: #939fa5;
  }

  :hover {
    border: 1px solid #2196f3;
    cursor: pointer;
  }

  :focus {
    outline: none;
  }
`;

const Boxlist = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 0px;
  position: absolute;
  width: 1130.01px;
  height: 728px;
  left: 155px;
  top: 262px;
`;
