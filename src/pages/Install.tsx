import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Footer from "../components/Footer";
import { InstallPropsType } from "../types";
import styles from "./Install.module.scss";

const Install: React.FC<InstallPropsType> = ({ deferredPrompt }) => {
  const onInstallClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    console.log(deferredPrompt);

    if (!deferredPrompt) {
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
  };

  return (
    <div className={styles.container}>
      <section className={styles["header-wrapper"]}>
        <Link to="/" className={styles["btn--back"]}>
          {`<`} 웹으로 계속하기
        </Link>
        <h2 className={styles.header}>웹 애플리케이션 설치</h2>
      </section>
      <section className={styles.main}>
        <section>
          Palette Vault는{" "}
          <a
            className={styles.link}
            href="https://ko.wikipedia.org/wiki/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%A0%88%EC%8B%9C%EB%B8%8C_%EC%9B%B9_%EC%95%A0%ED%94%8C%EB%A6%AC%EC%BC%80%EC%9D%B4%EC%85%98"
            target="_blank"
            rel="noreferrer"
          >
            프로그레시브 웹 애플리케이션
          </a>
          을 목표로 개발 진행 중이며 데스크톱과 모바일 환경에서 설치하여 사용할
          수 있습니다.
          <br />
          <br />
          아래 튜토리얼을 따라 설치를 진행하거나{" "}
          <Link to="/" className={styles.link}>
            웹으로 계속하기
          </Link>
          를 클릭하여 건너뛸 수 있습니다.
        </section>
        <section className={styles.tutorial}>
          <h3>튜토리얼</h3>
          <Button text="설치" onClick={onInstallClick} classes={["Install"]} />
          <div className={styles.or}>혹은</div>
          <section>
            <h4>iOS safari</h4>
            <ol>
              <li>1. 공유 버튼 클릭</li>
              <li>2. 홈 화면에 추가 클릭</li>
            </ol>
          </section>
          <section>
            <h4>Android or Desktop</h4>
            <a
              className={styles.link}
              href="https://support.google.com/chrome/answer/9658361?hl=ko&co=GENIE.Platform%3DAndroid&oco=0"
              target="_blank"
              rel="noreferrer"
            >
              설치 튜토리얼
            </a>
            을 따라 진행
          </section>
        </section>
      </section>

      <Footer />
    </div>
  );
};

export default Install;
