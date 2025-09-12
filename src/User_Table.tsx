export default function User_Table() {
  return (
    <>

        <div className="container-fluid py-2"></div>
        <div className="row">
          <div className="ms-3">
            <h3 className="mb-0 h4 font-weight-bolder">Dashboard</h3>
            <p className="mb-4">
              Check the sales, value and bounce rate by country.
            </p>
          </div>

          <div className="row mb-4">
              <div className="col-lg-12 col-md-12 mb-md-0 mb-4">
                <div className="card">
                  <div className="card-header pb-0">
                    <div className="row">
                      <div className="col-lg-12 col-7">
                        <h6>User Time Gap Summary</h6>
                        <p className="text-sm mb-0">
                          <i
                            className="fa fa-check text-info"
                            aria-hidden="true"
                          ></i>
                          <span className="font-weight-bold ms-1">
                            Time Gap
                          </span>{" "}
                          is the amount of time data is unreported for a
                          particular user
                        </p>
                        <p className="text-sm mb-0">
                          Click on an ID for detailed information about a
                          particular user
                        </p>
                      </div>
                      <div className="col-lg-6 col-5 my-auto text-end">
                        <div className="dropdown float-lg-end pe-4">
                          <a
                            className="cursor-pointer"
                            id="dropdownTable"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i className="fa fa-ellipsis-v text-secondary"></i>
                          </a>
                          <ul
                            className="dropdown-menu px-2 py-3 ms-sm-n4 ms-n5"
                            aria-labelledby="dropdownTable"
                          >
                            <li>
                              <a
                                className="dropdown-item border-radius-md"
                                href="javascript:;"
                              >
                                Action
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item border-radius-md"
                                href="javascript:;"
                              >
                                Another action
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item border-radius-md"
                                href="javascript:;"
                              >
                                Something else here
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body px-0 pb-2">
                    <div className="table-responsive">
                      <table className="table align-items-center mb-0">
                        <thead>
                          <tr>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              ID
                            </th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                              Last Sync
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Max Time Gap
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Total Time Gap
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Morning (6AM-noon)
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Afternoon (noon-4PM)
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Evening (4PM-10PM)
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Night (10PM-6AM)
                            </th>
                          </tr>
                        </thead>
                        <tbody></tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>



          {/* <?php
            if(isset($_GET['uid']) && !empty($_GET['uid'])) {
            ?> */}
          <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div className="card">
              <div className="card-header p-2 ps-3">
                <div className="d-flex justify-content-between">
                  <div>
                    <p className="text-sm mb-0 text-capitalize">Total Steps</p>
                    {/* <h4 className="mb-0"><?php echo $total_steps; ?></h4> */}
                  </div>
                  <div className="icon icon-md icon-shape bg-gradient-dark shadow-dark shadow text-center border-radius-lg">
                    <i className="material-symbols-rounded opacity-10">
                      weekend
                    </i>
                  </div>
                </div>
              </div>
              <hr className="dark horizontal my-0" />
              <div className="card-footer p-2 ps-3">
                {/* <p className="mb-0 text-sm"><?php echo $total_steps_date; ?></p> */}
              </div>
            </div>
          </div>
        </div>

    </>
  );
}
