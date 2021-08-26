import Chart from './Chart'

const Overview = (opdrachtList, averageM) => {
    return(
        <div>
            <h3>Overview User-Story</h3>
            <Chart opdrachtList={opdrachtList} averageM={averageM} />
        </div>
    )
}

export default Overview