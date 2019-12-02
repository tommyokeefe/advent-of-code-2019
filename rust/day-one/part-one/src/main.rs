use std::fs::File;
use std::io::Read;

fn main() {
    let mut file = File::open("fuel-requirements.txt").expect("file doesn't exist");
    let mut contents = String::new();
    file.read_to_string(&mut contents).expect("bad read");
    let total: i32 = contents.lines()
        .map(|n| (n.parse::<i32>().unwrap_or(0) / 3) - 2)
        .sum();

    println!("total is: {}", total.to_string());
}
