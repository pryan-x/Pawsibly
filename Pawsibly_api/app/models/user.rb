class User < ApplicationRecord
    has_secure_password
    has_one :breed
    # , foreign_key: :user_id
end
