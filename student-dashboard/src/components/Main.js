import Overview from "./Overview"

const Main = (opdrachtList, averageM) => {
    return(
        <div className="main">
            <Overview opdrachtList={opdrachtList} averageM={averageM} />
        </div>
    )
}

export default Main