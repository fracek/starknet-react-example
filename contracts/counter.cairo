%lang starknet
%builtins pedersen range_check

from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.math import assert_nn, assert_not_zero
from starkware.starknet.common.syscalls import get_caller_address

#
# Storage Variables
#

# Current counter value.
@storage_var
func _counter() -> (count : felt):
end

# Account that incremented the contract last.
@storage_var
func _last_caller() -> (address : felt):
end

#
# External Functions
#

# Increment internal counter by `amount`, returning the previous and new counter values.
@external
func incrementCounter{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        amount : felt) -> (prev_count : felt, new_count : felt):
    let (caller) = get_caller_address()

    assert_not_zero(caller)
    assert_nn(amount)

    # let counter overflow.
    let (prev_count) = _counter.read()
    let new_count = prev_count + amount
    _counter.write(new_count)
    _last_caller.write(caller)

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

# Return the last caller.
@view
func lastCaller{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}() -> (address : felt):
    let (caller) = _last_caller.read()
    return (address=caller)
end
