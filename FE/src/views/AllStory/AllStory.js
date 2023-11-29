import React, { useEffect, useState } from "react";
import apiMain from "../../api/apiMain";
import getData from "../../api/getData";
import Story from "../../components/Story/Story";
import Section, {
  SectionHeading,
  SectionBody,
} from "../../components/Section/Section";

function AllStory() {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const getStory = async () => {
      //xử lý gọi hàm load truyện
      const res = getData(await apiMain.getStorys({ size: 20 }));
      setDatas(res);
    };
    getStory();
  }, []);

  return (
    <>
      <div className="d-flex">
        <Section>
          <SectionBody>
            <div className="list-story">
              {datas.map((data, index) => (
                <Story key={index} data={data} />
              ))}
            </div>
          </SectionBody>
        </Section>
      </div>
    </>
  );
}

export default AllStory;
