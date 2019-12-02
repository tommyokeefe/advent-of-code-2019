use std::cmp;
use std::fs::File;
use std::io::Read;

pub struct Fuel;

fn main() {
    let mut file = File::open("fuel-requirements.txt").expect("file doesn't exist");
    let mut contents = String::new();
    file.read_to_string(&mut contents).expect("bad read");
    let total: i32 = contents.lines()
        .map(|n| Fuel::calculate_fuel(n.parse::<i32>().unwrap_or(0)))
        .sum();

    println!("total is: {}", total.to_string());
}

impl Fuel {
	fn calculate_fuel(i: i32) -> i32 {
		let f = cmp::max((i / 3) - 2, 0);
		f + if f > 0 { Fuel::calculate_fuel(f) } else { 0 }
	}
}
