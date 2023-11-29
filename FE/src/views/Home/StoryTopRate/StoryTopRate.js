import { useEffect, useState } from "react";
import apiMain from "../../../api/apiMain";
import Section, {
  SectionHeading,
  SectionBody,
} from "../../../components/Section/Section";
import StoryRate from "../../../components/Story/StoryRate";
import getData from "../../../api/getData";

function StoryTopRate() {
  const [datas, setData] = useState(
    Array.from(Array(6).keys(), (i) => {
      return {};
    })
  );

  useEffect(() => {
    const getStory = async () => {
      let res = getData(await apiMain.getStorys({ size: 6 }));
      res = res.map((item) => {
        item = { ...item };
        return item;
      });
      res.sort((a, b) => b.luotdoc - a.luotdoc);
      setData(res);
    };
    getStory();
  }, []);

  console.log(datas);

  return (
    <>
      <div className="row">
        <div className="col-12">
          <Section>
            <SectionHeading>
              <h4 className="section__title">Phổ biến</h4>
            </SectionHeading>
            <SectionBody>
              <div className="row" style={{ marginTop: -24 }}>
                {datas.map((data, index) => (
                  <div key={index} className="col-4 col-md-6 col-sm-12">
                    <StoryRate data={data} />
                  </div>
                ))}
              </div>
            </SectionBody>
          </Section>
        </div>
      </div>
    </>
  );
}

export default StoryTopRate;
