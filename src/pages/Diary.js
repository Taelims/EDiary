import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { DiaryStateContext } from "../App";
import MyHeader from "../components/MyHeader";
import { getStringDate } from "../util/date";
import MyButton from "../components/MyButton";
import { emotionList } from "../util/emotion";

const Diary = () => {
  const { id } = useParams();

  const diaryList = useContext(DiaryStateContext);
  const naviagate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정일기장 - ${id}번 일기`;
  });

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );

      if (targetDiary) {
        setData(targetDiary);
      } else {
      }
    }
  }, [id, diaryList]);

  if (!data) {
    return <div className="DiaryPage">로딩중입니다...</div>;
  } else {
    const emotionData = emotionList.find(
      (it) => parseInt(it.emotion_id) === parseInt(data.emotion)
    );
    return (
      <div className="DiaryPage">
        <MyHeader
          headtext={`${getStringDate(new Date(data.date))} 기록`}
          leftchild={
            <MyButton text={"< 뒤로가기"} onClick={() => naviagate(-1)} />
          }
          rightchild={
            <MyButton
              text={"수정하기"}
              onClick={() => naviagate(`/edit/${data.id}`)}
            />
          }
        />
        <article>
          <section>
            <h4>오늘의 감정</h4>
            <div
              className={[
                "diary_img_wrapper",
                `diary_img_wrapper_${data.emotion}`,
              ].join(" ")}
            >
              <img src={emotionData.emotion_img} />
              <div className="emotion_descript">
                {emotionData.emotion_descript}
              </div>
            </div>
          </section>
          <section>
            <h4>오늘의 일기</h4>
            <div className="diary_content_wrapper">
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
};

export default Diary;
