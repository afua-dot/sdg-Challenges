const covid19ImpactEstimator = (data) => {
  let input = {
    region: {
      name: 'Africa',
      avgAge: 19.7,
      avgDailyIncomeInUSD: 5,
      avgDailyIncomePopulation: 0.71
    },
    periodType: 'days',
    timeToElapse: 58,
    reportedCases: 674,
    population: 66622705,
    totalHospitalBeds: 1380614
  };
  input = data;
  const impact = {};
  const severeImpact = {};
  let timeElapsed;
  if (input.periodType.toLowerCase() === 'days') {
    timeElapsed = Math.trunc(input.timeToElapse * 1);
  } else if (input.periodType.toLowerCase() === 'weeks') {
    timeElapsed = Math.trunc(input.timeToElapse * 7);
  } else if (input.periodType.toLowerCase() === 'months') {
    timeElapsed = Math.trunc(input.timeToElapse * 30);
  }
  const factor = Math.trunc(timeElapsed / 3);
  // challenge 1
  impact.currentlyInfected = Math.trunc(input.reportedCases * 10);
  severeImpact.currentlyInfected = Math.trunc(input.reportedCases * 50);
  impact.infectionsByRequestedTime = Math.trunc(
    impact.currentlyInfected * (2 ** factor)
  );
  severeImpact.infectionsByRequestedTime = Math.trunc(
    severeImpact.currentlyInfected * (2 ** factor)
  );
  // challenge 2
  const availableBeds = 0.35 * input.totalHospitalBeds;
  const positiveCasesForImpact = 0.15 * impact.infectionsByRequestedTime;
  impact.severeCasesByRequestedTime = Math.trunc(positiveCasesForImpact);
  const positiveCasesForSevereImpact = 0.15 * severeImpact.infectionsByRequestedTime;
  severeImpact.severeCasesByRequestedTime = Math.trunc(positiveCasesForSevereImpact);
  impact.hospitalBedsByRequestedTime = Math.trunc(
    availableBeds - impact.severeCasesByRequestedTime
  );
  severeImpact.hospitalBedsByRequestedTime = Math.trunc(
    availableBeds - severeImpact.severeCasesByRequestedTime
  );
  // challenge 3
  // cases for ICU
  impact.casesForICUByRequestedTime = Math.trunc(
    0.05 * impact.infectionsByRequestedTime
  );
  severeImpact.casesForICUByRequestedTime = Math.trunc(
    0.05 * severeImpact.infectionsByRequestedTime
  );
  // cases for ventilators
  impact.casesForVentilatorsByRequestedTime = Math.trunc(
    0.02 * impact.infectionsByRequestedTime
  );
  severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(
    0.02 * severeImpact.infectionsByRequestedTime
  );
  // dollars in flight
  const areaIncome = (input.region.avgDailyIncomePopulation * input.region.avgDailyIncomeInUSD);
  impact.dollarsInFlight = Math.trunc(
    (impact.infectionsByRequestedTime * areaIncome) / timeElapsed
  );
  severeImpact.dollarsInFlight = Math.trunc(
    (severeImpact.infectionsByRequestedTime * areaIncome) / timeElapsed
  );
  return {
    data,
    impact,
    severeImpact
  };
};
export default covid19ImpactEstimator;
