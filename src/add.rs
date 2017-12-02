#[no_mangle]
pub fn add(x: i32, y: i32) -> i32 {
    x + y
}

#[no_mangle]
pub fn add_one(x: i32) -> i32 {
    add(x, 1)
}