import Logger from '@ioc:Adonis/Core/Logger'
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Posts extends BaseSchema {
  protected tableName = 'posts'

  public async up() {
    if (!(await this.schema.hasTable(this.tableName)))
      this.schema.createTable(this.tableName, (table) => {
        table.increments('id')

        table.text('text')
        table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
        table.string('image_url')
        table.boolean('is_fixed').defaultTo(false)
        table.boolean('is_activated').defaultTo(true)
        table.boolean('is_deleted').defaultTo(false)

        table.timestamp('created_at', { useTz: true })
        table.timestamp('updated_at', { useTz: true })
        table.timestamp('deleted_at', { useTz: true })
      })
    else Logger.info('Posts migration already running')
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
