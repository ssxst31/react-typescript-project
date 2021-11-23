import { useState, useEffect } from 'react';
import { Reset } from 'styled-reset';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faRedo } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import Item from './item';
import URL from '../../config';

interface Iprops {
  requests: [
    {
      title: string;
      client: string;
      due: string;
      count: number;
      amount: number;
      method: string[];
      material: string[];
      status: string;
    },
  ];
}

interface Props {
  margin: boolean;
}

interface Color {
  methodColor: number;
  materialColor: number;
}

const Main = () => {
  const [dataList, setDataList] = useState<any>([]);
  const [plus, setPlus] = useState<any>([false, false]);
  const [method, setMethod] = useState<any>([]);
  const [material, setMaterial] = useState<any>([]);
  const [toggleIs, setToggleIs] = useState<any>(false);

  const methodLength = method.length;
  const materialLength = material.length;
  const materialList = ['알루미늄', '탄소강', '구리', '합금강', '강철'];
  const methodList = ['밀링', '선반'];

  useEffect(() => {
    fetch(`${URL}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data: Iprops) => {
        setDataList(data);
      });
  }, []);

  const menuToggle = (e: number) => {
    if (e === 1) {
      setPlus([!plus[0], false]);
    }

    if (e === 2) {
      setPlus([false, !plus[1]]);
    }
  };

  const toggleHandle = () => {
    setToggleIs(!toggleIs);
  };

  const filterMenu = (method: any, material: any) => {
    let filteredDataList = dataList?.filter(
      (item: any) =>
        (item.method.includes('선반') && method.indexOf('선반') > -1) ||
        (item.method.includes('밀링') && method.indexOf('밀링') > -1),
    );
    if (filteredDataList?.length === 0) {
      filteredDataList = dataList;
    }
    if (materialLength) {
      const newFilteredDataList = filteredDataList.filter(
        (item: any) =>
          (material.indexOf('알루미늄') > -1 &&
            item?.material.includes('알루미늄')) ||
          (material.indexOf('탄소강') > -1 &&
            item?.material.includes('탄소강')) ||
          (material.indexOf('강철') > -1 && item?.material.includes('강철')) ||
          (material.indexOf('구리') > -1 && item?.material.includes('구리')) ||
          (material.indexOf('스테인리스강') > -1 &&
            item?.material.includes('스테인리스강')),
      );
      return toggleIs
        ? newFilteredDataList?.filter((item: any) =>
            item.status.includes('상담중'),
          )
        : newFilteredDataList;
    }
    return toggleIs
      ? filteredDataList?.filter((item: any) => item.status.includes('상담중'))
      : filteredDataList;
  };

  const changeMethod = (checked: boolean, item: string) => {
    if (checked) {
      setMethod([...method, item]);
    } else {
      setMethod(method.filter((el: string) => el !== item));
    }
  };

  const changeMaterial = (checked: boolean, item: string) => {
    if (checked) {
      setMaterial([...material, item]);
    } else {
      setMaterial(material.filter((el: string) => el !== item));
    }
  };

  const filterReset = () => {
    setMaterial('');
    setMethod('');
  };

  return (
    <>
      <Reset />
      <Container>
        <TextBox>
          <Title>들어온 요청</Title>
          <Content>파트너님에게 딱 알맞는 요청서를 찾아보세요.</Content>
        </TextBox>
        <SelectBox>
          <MethodSelect
            materialColor={materialLength}
            methodColor={methodLength}
            onClick={() => {
              menuToggle(1);
            }}
          >
            <MethodText
              methodColor={methodLength}
              materialColor={materialLength}
            >
              가공방식{methodLength > 0 && `(${methodLength})`}
            </MethodText>
            <FontAwesomeIcon icon={faSortDown} className="icon" />
          </MethodSelect>
          <MaterialSelect
            onClick={() => {
              menuToggle(2);
            }}
            materialColor={materialLength}
            methodColor={methodLength}
          >
            <MaterialText
              materialColor={materialLength}
              methodColor={methodLength}
            >
              재료{materialLength > 0 && `(${materialLength})`}
            </MaterialText>
            <FontAwesomeIcon icon={faSortDown} className="icon" />
          </MaterialSelect>
          {materialLength + methodLength !== 0 && (
            <FilteringResetBnt onClick={filterReset}>
              <FontAwesomeIcon icon={faRedo} className="icon" />
              <ResetText>필터링 리셋</ResetText>
            </FilteringResetBnt>
          )}
          {plus[0] && (
            <MethodPlus>
              {methodList.map((item: string) => {
                return (
                  <Checkbox key={item.toString()}>
                    <Input
                      type="checkbox"
                      onChange={(e) => {
                        changeMethod(e.target.checked, item);
                      }}
                      checked={method.includes(item)}
                      value={item}
                    />
                    <CheckText>{item}</CheckText>
                  </Checkbox>
                );
              })}
            </MethodPlus>
          )}
          {plus[1] && (
            <MaterialPlus>
              {materialList.map((item: string) => {
                return (
                  <Checkbox key={item.toString()}>
                    <Input
                      type="checkbox"
                      onChange={(e) => {
                        changeMaterial(e.target.checked, item);
                      }}
                      checked={material.includes(item)}
                      value={item}
                    />
                    <CheckText>{item}</CheckText>
                  </Checkbox>
                );
              })}
            </MaterialPlus>
          )}
          <ToggleBnt margin={toggleIs}>
            <Toggle onClick={toggleHandle} margin={toggleIs} />
          </ToggleBnt>
          <ToggleText>상담 중인 요청만 보기</ToggleText>
        </SelectBox>
        <BoxList>
          {filterMenu(method, material)?.length > 0 ? (
            filterMenu(method, material)?.map((item: any) => {
              return (
                <Item
                  title={item.title}
                  key={item.id}
                  client={item.client}
                  due={item.due}
                  count={item.count}
                  amount={item.amount}
                  method={item.method}
                  material={item.material.join(',')}
                  status={item.status}
                />
              );
            })
          ) : (
            <NotificationText>
              <p>조건에 맞는 견적 요청이 없습니다.</p>
            </NotificationText>
          )}
        </BoxList>
      </Container>
    </>
  );
};

export default Main;

const Container = styled.div`
  margin: 50px 100px;
`;

const MethodPlus = styled.div`
  position: absolute;
  top: 35px;
  width: 110px;
  padding: 12px 7px;
  border: 1px solid #939fa5;
  border-radius: 4px;
  z-index: 5;
  background-color: white;
`;

const CheckText = styled.div`
  margin-top: 2px;
  font-size: 14px;
  line-height: 20px;
`;

const MaterialPlus = styled.div`
  position: absolute;
  top: 35px;
  left: 110px;
  width: 110px;
  padding: 12px 7px;
  border: 1px solid #939fa5;
  border-radius: 4px;
  background-color: white;
  z-index: 5;
`;

const Checkbox = styled.div`
  display: flex;
  align-content: center;
  padding: 2px 0;
`;

const Input = styled.input`
  width: 18px;
  height: 18px;
  margin-right: 10px;
`;

const Title = styled.div`
  color: #323d45;
  font-size: 20px;
  font-weight: 700;
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
  left: 155px;
  top: 110px;
  width: 284px;
  height: 56px;
`;

const SelectBox = styled.div`
  display: flex;
  position: absolute;
  left: 155px;
  top: 198px;
  width: 1130px;
`;

const Toggle = styled.div<Props>`
  background: ${(props) => (props.margin ? '#2196F3' : '#f5f5f5')};
  width: 20px;
  height: 20px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.24);
  border-radius: 15px;
  transform: translateY(-18%);
  margin-left: ${(props) => props.margin && '18px'};
  transition: 0.3s;
`;

const ToggleBnt = styled.div<Props>`
  width: 34px;
  height: 14px;
  background: #c2c2c2;
  background: ${(props) => (props.margin ? '#BBDEFB' : '#c2c2c2')};
  border-radius: 15px;
  position: absolute;
  right: 140px;
  margin-top: 10px;
  transition: 0.3s;

  :hover {
    cursor: pointer;
  }
`;

const ToggleText = styled.div`
  position: absolute;
  right: 0px;
  font-size: 14px;
  line-height: 20px;
  color: #323d45;
  margin-top: 8px;
  font-weight: 500;
`;

const MethodSelect = styled.div<Color>`
  display: flex;
  justify-content: space-between;
  width: 98px;
  height: 32px;
  margin-right: 10px;
  margin-bottom: 30px;
  padding: 4px 12px;
  border: 1px solid #939fa5;
  border-radius: 4px;
  background: ${(props) => (props.methodColor ? '#1565C0' : '#FFFFFF')};

  .icon {
    color: ${(props) => (props.methodColor ? '#FFFFFF' : '#939fa5')};
  }

  :hover {
    border: 1px solid #2196f3;
    cursor: pointer;
  }

  :focus {
    outline: none;
  }
`;

const MethodText = styled.div<Color>`
  display: flex;
  align-items: center;
  color: #323d45;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  color: ${(props) => (props.methodColor ? '#FFFFFF' : 'black')};
`;

const MaterialText = styled.div<Color>`
  display: flex;
  align-items: center;
  color: #323d45;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  color: ${(props) => (props.materialColor ? '#FFFFFF' : 'black')};
`;

const MaterialSelect = styled.div<Color>`
  display: flex;
  justify-content: space-between;
  width: 76px;
  height: 32px;
  padding: 4px 12px;
  border: 1px solid #939fa5;
  border-radius: 4px;
  background: ${(props) => (props.materialColor ? '#1565C0' : '#FFFFFF')};
  .icon {
    color: ${(props) => (props.materialColor ? '#FFFFFF' : '#939fa5')};
  }

  :hover {
    border: 1px solid #2196f3;
    cursor: pointer;
  }

  :focus {
    outline: none;
  }
`;

const FilteringResetBnt = styled.div`
  margin-left: 20px;
  margin-top: 5px;
  font-size: 12px;
  line-height: 20px;
  color: #2196f3;
  display: flex;
  height: 25px;

  .icon {
    color: #2196f3;
    width: 16px;
    height: 16px;
  }
  :hover {
    cursor: pointer;
  }
`;

const ResetText = styled.div`
  margin-left: 12px;
`;

const BoxList = styled.div`
  position: absolute;
  width: 1130.01px;
  height: 728px;
  left: 155px;
  top: 262px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: space-between;
`;

const NotificationText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 1130px;
  height: 100px;
  border: 1px solid #c2c2c2;
  border-radius: 4px;
  color: #939fa5;
  font-size: 14px;
  text-align: center;
  line-height: 20px;
`;
