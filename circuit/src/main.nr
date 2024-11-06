use dep::std;

fn main(
    wallet_address: pub Field,
    hash: pub Field,
    credit_score: pub Field,
    current_year: pub Field,
    current_month : pub Field,
    current_day : pub Field,
    issued_year: Field,
    issued_month : Field,
    issued_day : Field,
) -> pub Field {

    check_claim(
        issued_year,
        issued_month,
        issued_day,
        current_year,
        current_month,
        current_day,
    );

    let h1 = std::hash::pedersen_hash([wallet_address, credit_score, current_year, current_month, current_day]);
    assert(h1 == hash);

    h1
}

fn check_claim(
    required_year: Field,
    required_month: Field,
    required_day: Field,
    current_year: Field,
    current_month: Field,
    current_day: Field,
) {
    assert(required_year as u16 == current_year as u16);
    assert(required_month as u8 >= current_month as u8);
    assert(required_day as u8 >= current_day as u8);
}

#[test]
fn test_main() {

    let current_day = 1;
    let current_month = 2;
    let current_year = 2001;
    let issued_day = 1;
    let issued_month = 2;
    let issued_year = 2001;

    let credit_score = 500;
    let wallet_address = 0x563acdac;

    let hash = std::hash::pedersen_hash([wallet_address, credit_score, current_year, current_month, current_day]);

    let h1 = main(wallet_address,hash,credit_score,current_year,current_month,current_day,issued_year,issued_month,issued_day);

    assert(hash == h1);

    std::println("True");
}
