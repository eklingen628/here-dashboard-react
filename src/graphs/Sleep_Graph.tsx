export default function Sleep_Graph() {
  return (
    <>


        <div className="row">
          <div className="col-lg-12 col-md-12 mt-4 mb-4">
            <div className="card ">
              <div className="card-body">
                {/* <h6 className="mb-0 "> Sleep State for User <?php echo $_GET['uid']; ?> */}
                <h6>
                  Sleep State for User
                  {/* <button className="btn btn-outline-dark rounded-circle p-0 mb-0" type="button" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Prev" onclick="prev_date();">
                            <i className="material-symbols-rounded p-2 mt-0">skip_previous</i>
                            </button>
                            <button className="btn btn-outline-dark rounded-circle p-0 mb-0" type="button" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Next" onclick="next_date();">
                            <i className="material-symbols-rounded p-2 mt-0">skip_next</i>
                            </button> */}
                </h6>

                <div className="pe-2">
                  <div className="chart">
                    <canvas
                      id="chart-sleep"
                      className="chart-canvas"
                      height="200"
                    ></canvas>
                  </div>
                </div>
                <hr className="dark horizontal" />
                <div className="d-flex ">
                  <i className="material-symbols-rounded text-sm my-auto me-1">
                    schedule
                  </i>
                  <p className="mb-0 text-sm" id="sleep_state_update">
                    {" "}
                    updated 4 min ago{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>


    </>
  );
}
