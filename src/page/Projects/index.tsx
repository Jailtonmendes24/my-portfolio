import style from "./projects.module.css";

export default function Projects() {
    return (
        <div className={style.container}>
            <h1>Projeto em <span>Desenvolvimento</span></h1>
            <div className={style.categories}>
                <button>Frontend</button>
                <button>Backend</button>
            </div>
            <div className={style.projects}>
                <div className={style['project-item']}>Em Breve</div>
                <div className={style['project-item']}>Em Breve</div>
                <div className={style['project-item']}>Em Breve</div>
                <div className={style['project-item']}>Em Breve</div>
                <div className={style['project-item']}>Em Breve</div>
                <div className={style['project-item']}>Em Breve</div>
                <div className={style['project-item']}>Em Breve</div>
                <div className={style['project-item']}>Em Breve</div>
                {/* <div className={style['project-item']}>Projeto 8</div> */}
                {/* Adicione mais projetos conforme necessário */}
            </div>
        </div>
    );
}
