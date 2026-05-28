const ages = [15, 20, 12, 18, 25, 30, 10];

function getAdults(arr) {
  return arr.filter((age) => age >= 18);
}

console.log(getAdults(ages));
