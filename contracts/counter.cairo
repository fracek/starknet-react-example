%lang starknet
%builtins pedersen range_check

from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.math import assert_nn

#
# Storage Variables
#

# Current counter value.
@storage_var
func _counter() -> (count : felt):
end

#
# External Functions
#

# Increment internal counter by `amount`, returning the previous and new counter values.
@external
func incrementCounter{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        amount : felt) -> (prev_count : felt, new_count : felt):
    assert_nn(amount)

    # let counter overflow.
    let (prev_count) = _counter.read()
    let new_count = prev_count + amount
    _counter.write(new_count)

    return (prev_count=prev_count, new_count=new_count)
end

#
# View Functions
#

# Return the counter value.
@view
func counter{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}() -> (count : felt):
    let (count) = _counter.read()
    return (count=count)
end
